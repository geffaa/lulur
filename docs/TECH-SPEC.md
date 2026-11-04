# Tech Spec — Lulur

## 1. Arsitektur
Monolit Laravel 12 multi-tenant.
- `{tenant}.lulur.app` → halaman booking publik (Inertia + Vue, SSR untuk SEO dan kecepatan).
- `{tenant}.lulur.app/admin` → admin tenant (Inertia + Vue).
- `admin.lulur.app` → admin platform (P2).
- Worker Horizon: pengingat, kedaluwarsa hold, webhook pembayaran, laporan.
- Resolusi tenant: middleware dari subdomain (custom domain P2) → `app(Tenant::class)`; global scope `tenant_id` di semua model tenant; Postgres RLS (`SET app.tenant_id`) sebagai lapisan kedua.

## 2. Stack & paket
Laravel 12, PostgreSQL 16 (`btree_gist` untuk exclusion constraint), Redis + Horizon, Inertia + Vue 3 (SSR), Pest. `stripe/stripe-php`, adaptor Midtrans/Xendit dari Sukha (`PaymentGateway`), `spatie/laravel-activitylog`, `spatie/icalendar-generator` (.ics), `giggsey/libphonenumber-for-php`. Alasan: stack utama user; pola multi-company/RBAC dari Roster, pembayaran dari Sukha, WhatsApp dari Relay/Simpul.

## 3. Data model
| Tabel | Kolom utama |
|---|---|
| tenants | id, slug, name, currency, default_timezone, plan, branding jsonb, status |
| locations | id, tenant_id, name, timezone, address, opening_hours jsonb |
| rooms | id, tenant_id, location_id, name, room_type (single/couples/facial/wet), capacity, active |
| staff | id, tenant_id, user_id, display_name, gender, level (junior/senior/master), photo, active |
| staff_skills | staff_id, service_id |
| shifts | id, staff_id, location_id, starts_at, ends_at (tstzrange via kolom terhitung) |
| time_off | id, staff_id, period tstzrange, reason |
| services | id, tenant_id, category_id, name, description, buffer_min, room_type, therapists_needed (1/2), requires_form_id, deposit_rule jsonb, active |
| service_variants | id, service_id, duration_min, price, price_by_level jsonb |
| addons | id, tenant_id, name, duration_min, price; addon_service pivot |
| clients | id, tenant_id, name, phone_e164, email, gender_pref, pressure_pref, allergies (encrypted), notes (encrypted), marketing_consent, stripe_customer_id |
| bookings | id, tenant_id, location_id, client_id, code, status (held/confirmed/checked_in/in_service/completed/no_show/cancelled/expired), source (online/walk_in/phone), hold_expires_at, policy_snapshot jsonb, total, deposit_due, deposit_paid |
| booking_items | id, booking_id, service_variant_id, guest_name, starts_at, ends_at |
| booking_resources | id, booking_item_id, staff_id, room_id, period tstzrange — **EXCLUDE USING gist (staff_id WITH =, period WITH &&) WHERE status aktif** dan **EXCLUDE (room_id WITH =, period WITH &&)** untuk ruangan kapasitas 1; ruangan couples kapasitas 1 booking |
| forms / form_versions / form_submissions | template berversi (fields jsonb), submission dengan signature (svg/png terenkripsi), signed_at, expires_at |
| packages / client_packages / package_redemptions | paket sesi, sisa sesi, berlaku sampai |
| gift_cards / gift_card_ledger | kode, saldo, mutasi |
| payments | id, booking_id, gateway, kind (deposit/balance/tip/no_show_fee/refund), amount, status, provider_ref, idempotency_key |
| tips | payment_id, staff_id, amount |
| reminders | id, booking_id, kind, channel, send_at, sent_at, status |
| waitlist_entries | id, tenant_id, client_id, service_id, window tstzrange, status (P2 otomatis) |
| users, memberships(role per tenant), audit_logs | pola Roster |

## 4. API / route
- Publik: `GET /services`, `GET /availability?service_variant=&date=&staff=&guests=2`, `POST /holds`, `POST /bookings/{code}/details`, `POST /bookings/{code}/pay`, `GET /b/{code}?t={signed}` (kelola), `POST /forms/{submission}/sign`.
- Admin: `/admin/calendar`, `/admin/bookings/{id}`, `/admin/clients/{id}`, `/admin/services`, `/admin/staff`, `/admin/rooms`, `/admin/reports`, `/admin/settings/*`.
- Webhook: `/webhooks/stripe`, `/webhooks/midtrans`, `/webhooks/whatsapp` (idempoten).

## 5. Logika inti
**Ketersediaan** (per hari, per cabang):
1. Ambil varian (durasi + buffer), kebutuhan `room_type`, `therapists_needed`, keahlian.
2. Kandidat terapis = punya skill, shift menutupi rentang, tidak cuti, sesuai preferensi gender.
3. Grid langkah 15 menit; untuk tiap start: interval terapis bebas (shift − booking − cuti) dan interval ruangan bebas (jam buka − booking).
4. Slot valid jika ada ≥ N terapis bebas dan ≥ 1 ruangan tipe sesuai bebas pada [start, start+durasi+buffer].
5. Multi-layanan berurutan: rantai item dengan terapis boleh berbeda, ruangan boleh sama/berbeda, celah ≤ 10 menit.
6. Pilihan otomatis: terapis dengan menit terjadwal paling sedikit hari itu; ruangan dengan "fit" paling ketat (jangan pakai suite couples untuk pijat tunggal kecuali tidak ada lagi).
Hasil di-cache per (cabang, tanggal) dan diinvalidasi saat booking/shift berubah. Kebenaran akhir tetap dijaga exclusion constraint saat `INSERT` hold.

**Hold & pembayaran:** hold = booking `held` + resources (lolos constraint) + `hold_expires_at` 10 menit; job `ExpireHolds` tiap menit. Webhook deposit sukses → `confirmed` (idempoten dengan `idempotency_key`).

**Kebijakan:** `policy_snapshot` disalin ke booking saat dibuat (deposit %, jendela batal, denda no-show) sehingga perubahan kebijakan tidak berlaku surut.

**Zona waktu:** simpan UTC; konversi di zona cabang; DST ditangani Carbon; tes untuk transisi DST New York.

## 6. Integrasi pihak ketiga
| Layanan | Pakai | Catatan |
|---|---|---|
| Stripe | Deposit, SetupIntent kartu tersimpan, off-session charge denda no-show, tip | Aturan off-session/SCA perlu verifikasi |
| Midtrans / Xendit | Deposit IDR via QRIS/VA/e-wallet | Adaptor dari Sukha |
| WhatsApp Cloud API | Konfirmasi, pengingat, link formulir | Simulasi di demo; bisa dirutekan lewat Simpul |
| Email (Resend/SMTP) | Konfirmasi + .ics | |
| Google Calendar | Sinkron jadwal terapis | P2 |

## 7. Keamanan
Isolasi tenant (global scope + RLS + tes lintas tenant untuk setiap resource), link kelola booking bertanda tangan & kedaluwarsa, enkripsi kolom sensitif (alergi, catatan, tanda tangan), 2FA untuk owner/manajer, audit untuk denda, refund, impersonasi (P2), perubahan kebijakan.

## 8. Strategi tes
Pest: mesin ketersediaan (tabel kasus + tes properti acak terapis × ruangan × buffer), exclusion constraint dengan transaksi paralel, kedaluwarsa hold, policy snapshot, DST, isolasi tenant. Playwright: booking couples di ponsel, geser booking bentrok di kalender, checkout dengan tip.

## 9. Deploy & lingkungan
Ditunda. Rencana: Forge/VPS dengan wildcard subdomain + SSL wildcard, Postgres terkelola, Horizon. Seeder tiga tenant dengan 6 minggu data fiktif.

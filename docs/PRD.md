# PRD — Lulur (platform booking multi-tenant untuk spa & klinik kecantikan)

Dibuat 2026-10-31. Proyek portfolio Upwork #5 (Notes N-042). Berbeda dari ~/Project/bookwell (booking generik dengan Lovable + Supabase): Lulur dibuat dengan Laravel dan fokus ke bisnis **wellness** (spa, pijat, klinik kecantikan/estetika), dengan kedalaman domain yang tidak ada di tool generik.

## 1. Ringkasan
Lulur adalah platform booking multi-tenant. Setiap bisnis (tenant) punya halaman booking bermerek sendiri, cabang, layanan, terapis, ruangan, paket, dan aturan deposit. Inti produk: **slot hanya muncul jika terapis yang cocok DAN ruangan yang sesuai sama-sama kosong**, termasuk booking berdua (2 terapis + suite couples) dan beberapa layanan berurutan. Di sekitarnya: deposit dan denda no-show, formulir intake/consent yang ditandatangani sebelum datang, paket sesi dan membership, gift card, tip, pengingat WhatsApp/email, dan kalender front-desk.

## 2. Masalah
- Tool generik (Fresha, Vagaro, SuperSaaS) lemah di penjadwalan ruangan dan booking berdua menurut perbandingan pasar ([zenoti](https://www.zenoti.com/thecheckin/best-spa-software-2026), sumber vendor, [captainbook](https://captainbook.io/blog/spa-booking-software-8-platforms-compared-(2026))). Spa sering bentrok ruangan, atau terapis menganggur karena suite couples terpakai.
- Zenoti kuat tetapi mahal untuk spa kecil (estimasi ulasan €500–1.000/bulan, perlu verifikasi). Fresha mengambil komisi klien baru dari marketplace.
- No-show menghabiskan slot 60–120 menit; deposit dan kartu tersimpan jarang diterapkan dengan benar.
- Klinik estetika butuh consent dan pelacakan sesi paket sampai selesai ([pabau](https://pabau.com/?p=131913), [salonist](https://salonist.io/id/industries/aesthetics-clinic-software)); kertas consent di meja resepsionis memperlambat check-in.
- Klien Upwork sering minta "custom booking untuk spa saya" yang menggantikan langganan tool tersebut (contoh lowongan di Notes N-042).

## 3. Tujuan & metrik sukses (demo, data fiktif)
| Tujuan | Metrik |
|---|---|
| Nol bentrok | Tidak mungkin ada dua booking yang memakai terapis atau ruangan sama pada waktu tumpang tindih (constraint database, dites paralel) |
| Booking cepat di ponsel | Klien menyelesaikan booking (layanan → waktu → data + intake → deposit) dalam ≤ 4 langkah, < 2 menit |
| No-show turun | Deposit/kartu tersimpan sesuai aturan tenant; pengingat H-1 dan 2 jam; denda no-show tercatat |
| Front desk efisien | Check-in tanpa kertas: formulir sudah ditandatangani sebelum datang pada ≥ 80% booking demo |
| Multi-tenant aman | Data antar tenant terisolasi (tes otomatis lintas tenant), zona waktu & mata uang per tenant |

## 4. Persona & konteks
| Persona | Konteks |
|---|---|
| **Klien spa** (turis di Bali, pekerja di Jakarta/Philadelphia) | Booking dari Instagram/Google di ponsel, tanpa akun |
| **Resepsionis / front desk** | Kalender seharian di desktop/tablet: walk-in, check-in, pindah jadwal, checkout + tip |
| **Terapis** | Ponsel: jadwal hari ini, catatan klien (tekanan pijat, alergi), selesai sesi |
| **Owner / manajer** | Atur layanan, harga, aturan deposit, laporan utilisasi terapis & ruangan |
| **Admin platform** (pemilik Lulur) | Kelola tenant, paket langganan, dukungan dengan impersonasi yang diaudit (P2) |

## 5. Asumsi
| ID | Asumsi | Risiko |
|---|---|---|
| A1 | Tenant demo: **Tirta Spa** (Ubud & Seminyak, IDR, WITA), **Juniper Massage** (Philadelphia, USD, America/New_York), **Rona Aesthetic** (Jakarta, IDR, WIB) | Rendah |
| A2 | Pembayaran: Stripe (USD, kartu tersimpan untuk denda no-show) + Midtrans/Xendit (IDR, QRIS/VA) di balik interface `PaymentGateway` (dipakai ulang dari Sukha). Mode sandbox | Sedang: biaya & aturan kartu tersimpan perlu verifikasi |
| A3 | Pengingat: email (MVP) + WhatsApp Cloud API (MVP, simulasi di demo; bisa lewat Simpul) + SMS Twilio (P2) | Sedang |
| A4 | Satu database, isolasi dengan `tenant_id` + global scope + Postgres RLS sebagai lapisan kedua; subdomain `{tenant}.lulur.app`, custom domain P2 | Sedang |
| A5 | Bukan sistem medis: tidak menyimpan rekam medis/diagnosis; consent dan foto before/after (P2) disimpan terenkripsi | Sedang: regulasi per negara perlu dicek |

## 6. Scope
**MVP**
- F1 Tenant & cabang: onboarding tenant, cabang (MVP 1–2), zona waktu, mata uang, branding halaman booking, jam buka, hari libur
- F2 Katalog layanan: kategori, varian durasi (60/90/120), add-on, buffer, kebutuhan sumber daya (tipe ruangan, jumlah terapis), keahlian terapis, harga per level terapis
- F3 Terapis & ruangan: jadwal shift, cuti, keahlian, preferensi gender klien; ruangan dengan tipe dan kapasitas
- F4 Mesin ketersediaan: slot = terapis cocok ∩ ruangan cocok kosong; booking berdua; beberapa layanan berurutan; "terapis mana saja" dengan pemerataan beban
- F5 Booking publik: layanan → waktu (terapis opsional) → data + intake/consent → deposit; tahan slot 10 menit; kelola booking via link (reschedule/batal sesuai kebijakan)
- F6 Pembayaran: deposit % atau nominal, kartu tersimpan (Stripe), checkout di front desk dengan tip, redeem paket/gift card, refund, denda no-show/terlambat batal
- F7 Formulir: intake & consent berversi per layanan, tanda tangan digital, kedaluwarsa (mis. 12 bulan), status di kalender
- F8 Kalender front-desk: tampilan per terapis / per ruangan, drag pindah jadwal (validasi bentrok), walk-in, check-in, status, daftar tunggu
- F9 Klien: profil, preferensi (tekanan, area hindari, alergi), riwayat, formulir, paket tersisa, catatan internal
- F10 Paket & gift card: paket sesi (mis. 5× facial), masa berlaku, gift card dengan saldo
- F11 Pengingat & notifikasi: konfirmasi, H-1, 2 jam sebelum, minta ulasan, template per tenant
- F12 Laporan: utilisasi terapis & ruangan, pendapatan, tingkat no-show, rebooking, tip per terapis
- F13 Peran: owner, manajer, front desk, terapis; audit; 2FA (pola dari Roster)

**P2:** admin platform (tenant, langganan, impersonasi teraudit), membership berulang, waitlist otomatis (isi slot batal), multi-cabang penuh + transfer klien, aplikasi terapis PWA lengkap, komisi terapis, foto before/after (estetika), Google Calendar sync, SMS, custom domain, kupon.
**P3:** marketplace antar tenant, POS produk retail + stok, kelas/grup (yoga), multi-bahasa booking (EN/ID/JP).
**Bukan tujuan:** rekam medis/EMR, payroll terapis (pakai Roster), aplikasi native.

## 7. User stories (ringkas)
- Sebagai pasangan turis, kami booking "Couples Ritual" 120 menit; sistem hanya menawarkan jam ketika Teratai Suite dan dua terapis kosong.
- Sebagai klien, saya mengisi formulir kesehatan dan menandatangani consent di ponsel saat booking, jadi check-in hanya 30 detik.
- Sebagai resepsionis, saya menggeser booking ke terapis lain; jika ruangan bentrok, sistem menolak dan menawarkan ruangan pengganti.
- Sebagai owner Juniper Massage, saya menagih denda no-show 50% dari kartu tersimpan sesuai kebijakan yang disetujui klien.
- Sebagai klien klinik, saya melihat sisa 3 dari 5 sesi facial dan booking sesi berikutnya.

## 8. Fitur MVP secara detail (acceptance criteria utama)
### F4 Ketersediaan
- Ketika layanan butuh ruangan tipe "couples suite" dan 2 terapis, maka slot hanya muncul jika ketiganya kosong selama durasi + buffer.
- Ketika klien memilih "terapis mana saja", maka sistem memilih terapis dengan beban hari itu paling rendah yang punya keahlian layanan.
- Ketika dua klien menekan slot yang sama bersamaan, maka hanya satu hold berhasil (exclusion constraint `tstzrange` per terapis dan per ruangan); yang lain diminta memilih ulang.
### F5 Booking publik
- Ketika hold 10 menit habis tanpa pembayaran deposit, maka slot dilepas dan booking kedaluwarsa.
- Ketika klien membatalkan di luar jendela kebijakan (mis. < 24 jam), maka halaman kelola booking menjelaskan deposit tidak dikembalikan sebelum klien mengonfirmasi.
### F6 Pembayaran
- Ketika tenant memakai "kartu tersimpan" (Stripe), maka kartu disimpan dengan persetujuan kebijakan eksplisit; denda no-show hanya bisa ditagih oleh manajer dan tercatat di audit.
- Ketika checkout dengan tip, maka tip dialokasikan ke terapis yang mengerjakan (dibagi rata untuk booking berdua kecuali diubah).
### F7 Formulir
- Ketika layanan mewajibkan consent dan klien belum menandatangani versi terbaru, maka booking berstatus "Form missing" di kalender dan pengingat menyertakan link formulir.
### F8 Kalender
- Ketika booking digeser ke terapis/ruangan/jam yang bentrok, maka pemindahan ditolak dengan alasan yang jelas dan saran alternatif.
### F11 Pengingat
- Ketika pengingat jatuh di jam tenang tenant, maka ditunda ke jam buka; klien yang membalas STOP tidak menerima WhatsApp lagi.
### F13 Multi-tenant
- Ketika pengguna tenant A memanggil API dengan id milik tenant B, maka respons 404 (bukan 403) dan tercatat; tes otomatis mencakup setiap resource.

## 9. User flow
Lihat [IA.md](IA.md) bagian alur end-to-end.

## 10. Kebutuhan non-fungsional
- Perhitungan slot < 300 ms untuk 1 hari × 8 terapis × 6 ruangan.
- Semua waktu disimpan UTC, ditampilkan di zona tenant/cabang; DST untuk tenant AS.
- WCAG AA; kontrol form custom; halaman booking cepat di 4G (LCP < 2,5 s).
- Data formulir terenkripsi at-rest; akses tercatat.

## 11. Risiko & pertanyaan terbuka
| Risiko | Mitigasi |
|---|---|
| Aturan kartu tersimpan & denda no-show berbeda per negara/gateway | Kebijakan per tenant, persetujuan eksplisit, perlu verifikasi |
| Regulasi data kesehatan (consent/foto) | Tidak menyimpan diagnosis; enkripsi; P2 foto dengan retensi |
| Kompleksitas mesin ketersediaan | Tes berbasis properti untuk kombinasi terapis × ruangan × buffer |
| Tumpang tindih dengan Bookwell | Bookwell = generik + Lovable; Lulur = vertikal wellness + Laravel |

## 12. Distribusi & monetisasi
Portfolio Upwork untuk lowongan custom booking spa/klinik/massage dan "SaaS architect". Demo: tiga tenant dengan zona waktu & mata uang berbeda + video 2 menit. Bila dijual: langganan per cabang (P2).

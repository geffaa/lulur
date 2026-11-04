# Information architecture — Lulur (sampai fase akhir)

## 1. Peran dan permukaan
| Peran | Permukaan | Pekerjaan |
|---|---|---|
| Klien | Halaman booking tenant (ponsel dulu) | Pilih layanan, waktu, isi formulir, bayar deposit, kelola booking |
| Front desk | Admin tenant di desktop/tablet, seharian | Kalender, walk-in, check-in, checkout + tip |
| Terapis | Ponsel (web responsif → PWA P2) | Jadwal hari ini, catatan klien, selesai sesi |
| Manajer / owner | Admin tenant desktop | Katalog, tim, ruangan, kebijakan, laporan |
| Admin platform | Admin platform (P2) | Tenant, langganan, dukungan |

## 2. Peta modul akhir — admin tenant
| Modul | Fase | Isi |
|---|---|---|
| Calendar | MVP | Hari/minggu, per terapis atau per ruangan, walk-in, waitlist (P2) |
| Bookings | MVP | Daftar & pencarian, detail, reschedule, batal, no-show |
| Clients | MVP | Profil, preferensi, formulir, paket, riwayat; foto (P2) |
| Sales | MVP → P2 | Checkout, pembayaran, tip, refund, gift card; membership & POS (P2–P3) |
| Catalog | MVP | Layanan, varian, add-on, paket, formulir |
| Team | MVP → P2 | Terapis, keahlian, shift, cuti; komisi & tukar shift (P2) |
| Rooms | MVP | Ruangan, tipe, kapasitas, blokir perawatan |
| Marketing | MVP → P2 | Template pengingat, ulasan; kampanye & kupon (P2) |
| Reports | MVP | Utilisasi, pendapatan, no-show, rebooking, tip |
| Settings | MVP | Bisnis, cabang, kebijakan booking (deposit, batal, no-show), halaman booking, pembayaran, staf & peran, integrasi, audit |

Admin platform (P2): Tenants · Plans & billing · Usage · Support (impersonasi teraudit) · Feature flags.
Halaman booking publik: Layanan → Waktu → Detail + formulir → Deposit → Konfirmasi · Kelola booking · Gift card · Akun klien (P2).
Terapis: Hari ini · Klien · Tip saya (P2) · Jadwal (P2).

## 3. Alur end-to-end
1. **Onboarding tenant (MVP):** daftar → nama, subdomain, zona waktu, mata uang → cabang & jam buka → ruangan → terapis & keahlian → layanan dari templat spa/klinik → kebijakan deposit → bagikan link booking.
2. **Booking couples (MVP):** Instagram → halaman Tirta Spa → "Couples Ritual 120" untuk 2 → slot yang memenuhi Teratai Suite + 2 terapis → data + formulir kesehatan (2 tamu) → deposit 30% QRIS → konfirmasi WhatsApp + .ics → pengingat H-1 dan 2 jam.
3. **Hari kerja front desk (MVP):** buka Calendar → walk-in diselipkan ke celah → klien datang, formulir sudah lengkap → check-in → selesai → checkout: sisa tagihan + tip → minta ulasan otomatis.
4. **No-show (MVP):** klien tidak datang 15 menit → tandai no-show → manajer menagih denda dari kartu tersimpan (Juniper) atau deposit hangus (Tirta) → audit.
5. **Paket klinik (MVP):** klien membeli 5× facial → tiap kunjungan redeem 1 → sisa terlihat di profil & halaman kelola → pengingat saat sisa 1 atau mendekati kedaluwarsa.
6. **Reschedule (MVP):** link kelola → slot baru dengan aturan yang sama → kebijakan snapshot dicek → terkonfirmasi.
7. **Slot batal terisi (P2):** pembatalan → waitlist yang cocok ditawari lewat WhatsApp → klien pertama yang menerima mendapat slot.
8. **Tenant baru di platform (P2):** admin platform melihat tenant baru → paket langganan → dukungan dengan impersonasi teraudit.

## 4. Keputusan navigasi
Front desk memakai **kalender seharian**, dan kalender butuh lebar sebanyak mungkin: 6–8 kolom terapis atau ruangan. Pengguna ini bukan power user keyboard (berbeda dari rep Relay); mereka butuh label yang jelas. Modul admin di fase akhir ada 10.

| Pola | Untuk Lulur |
|---|---|
| Sidebar lebar berlabel (Roster/Sukha) | Memakan ±250px dari kalender; kolom terapis menjadi sempit |
| Rail ikon gelap + panel konteks (Relay) | Ikon tanpa label menyulitkan staf front desk yang berganti-ganti; panel konteks memakan lebar kalender |
| Navigasi atas (Simpul) | 10 modul + pemilih cabang + tanggal terlalu padat di satu baris; header kalender butuh ruang vertikal |
| **Rail terang 76px dengan ikon + label di bawahnya** | Selalu terlihat, bisa dibaca tanpa hafalan, hanya 76px; kalender tetap lebar |

**Keputusan:** rail terang 76px (ikon + label kecil), logo tenant di atas, Settings dan avatar di bawah. Pemilih cabang dan tanggal ada di header halaman Calendar, bukan di navigasi global. Detail booking terbuka sebagai panel kanan di atas kalender agar konteks hari itu tidak hilang. **Ponsel:** terapis memakai bottom tab (Today · Clients · Tips); front desk di tablet memakai rail yang sama. Halaman booking publik: header tenant + langkah bernomor; checkout fokus tanpa navigasi.

Pembeda visual: rail terang berlabel, aksen rosewood, Instrument Sans + Literata di halaman booking, foto spa nyata.

# Screens — Lulur

Bahasa UI: Inggris (klien Upwork global; tenant demo Bali melayani turis). Data fiktif.

## Halaman booking publik (tenant Tirta Spa)
| ID | Layar | Mode | Fitur | Mockup? |
|---|---|---|---|---|
| B01 | Pilih layanan (menu, varian durasi, untuk 1/2 orang, add-on) | Persuade/Operate | F2, F5 | **ya** (book-service.html) |
| B02 | Pilih waktu (terapis opsional, tanggal, slot) | Operate | F4, F5 | **ya** (book-time.html) |
| B03 | Detail + formulir + deposit | Operate | F5, F6, F7 | **ya** (book-checkout.html) |
| B04 | Konfirmasi + .ics | Operate | F5 | tidak |
| B05 | Kelola booking (reschedule/batal/formulir/paket) | Operate | F5, F10 | tidak |

## Admin tenant
| ID | Layar | Fitur | Mockup? |
|---|---|---|---|
| A01 | Calendar per terapis / per ruangan + panel detail booking | F8, F6, F7 | **ya** (admin-calendar.html) |
| A02 | Client profile | F9, F10, F7 | **ya** (admin-client.html) |
| A03 | Service editor (varian, sumber daya, keahlian, deposit, formulir) | F2, F3 | **ya** (admin-service.html) |
| A04 | Reports: utilisasi terapis & ruangan | F12 | **ya** (admin-reports.html) |
| A05 | Bookings list | F8 | tidak |
| A06 | Team & shifts | F3 | tidak |
| A07 | Rooms | F3 | tidak |
| A08 | Settings: kebijakan booking | F6 | tidak |

## Lainnya
| ID | Layar | Mockup? |
|---|---|---|
| T01 | Terapis: Today (ponsel) | **ya** (therapist.html) |
| P01 | Admin platform: tenants (P2) | **ya** (platform.html) |
| — | Components | **ya** (components.html) |

## Catatan layar mockup
- **A01 Calendar:** header (cabang Ubud, tanggal, toggle Therapists/Rooms, New booking); kolom 6 terapis 09:00–21:00 dengan blok booking berwarna status (confirmed, checked in, in service, completed, no-show, deposit pending, form missing); nama ruangan di setiap blok; booking couples terlihat di 2 kolom dengan penanda tertaut; garis waktu sekarang; panel kanan detail booking terpilih: klien, item, ruangan, terapis, formulir, deposit, aksi check-in/checkout.
- **B02 Waktu:** pilih terapis (Any, atau terapis dengan foto/inisial, preferensi gender), strip tanggal 14 hari, slot per pagi/siang/sore; slot tidak tersedia disembunyikan dengan penjelasan "Teratai Suite fully booked" untuk couples.
- **B03 Checkout:** kontak, formulir kesehatan (custom checkbox/radio), tanda tangan consent, kebijakan batal dengan checkbox persetujuan, deposit 30% QRIS/kartu, ringkasan sticky.

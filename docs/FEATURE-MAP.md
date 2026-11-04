# Feature map — Lulur (lengkap, bertahap)

Dibuat 2026-10-31. Sumber riset (mayoritas sekunder/vendor; klaim harga dan fitur pesaing perlu verifikasi):
- **Pasar spa:** day spa umumnya memakai Mindbody, Fresha, Vagaro; rantai besar memakai Zenoti. Kriteria penting untuk spa: booking multi-layanan berurutan, penugasan ruangan/suite, booking berdua/grup, membership & seri. Kebutuhan umum: **ruangan dan terapis harus kosong bersamaan**. Tabel vendor Zenoti menilai Fresha "tidak" dan Vagaro "dasar" untuk multi-ruangan & couples ([zenoti](https://www.zenoti.com/thecheckin/best-spa-software-2026), [captainbook](https://captainbook.io/blog/spa-booking-software-8-platforms-compared-(2026)), [happoin](https://happoin.com/en/spa-booking-software)).
- **Harga pesaing (ulasan, perlu verifikasi):** Fresha tanpa biaya bulanan tetapi komisi ±20% klien baru dari marketplace; Vagaro ±$30/bulan; Zenoti ±€500–1.000/bulan.
- **Klinik estetika:** consent e-sign sebelum janji, foto before/after terikat ke riwayat perawatan, pelacakan paket/kursus sampai selesai ([pabau](https://pabau.com/?p=131913), [zenoti aesthetic](https://www.zenoti.com/en-uk/medical-spa-software/aesthetic-software), [salonist](https://salonist.io/id/industries/aesthetics-clinic-software), [yocale](https://yocale.com/industries/skincare-cosmetic-laser-clinic)).
- **Kesenjangan riset:** tip, formulir intake, dan kebijakan no-show pesaing tidak terkonfirmasi dari sumber; dirancang dari praktik umum.

Legenda: **MVP** = M1–M6 · **P2** = platform & pertumbuhan · **P3** = nanti.

| Area | Fitur | Fase | Catatan |
|---|---|---|---|
| Multi-tenant | Tenant, subdomain, branding, mata uang & zona waktu | MVP | |
| | Cabang (1–2 di MVP), multi-cabang penuh + transfer klien | MVP → P2 | |
| | Admin platform: tenant, paket langganan, impersonasi teraudit, feature flag | P2 | Bukti arsitektur SaaS |
| | Custom domain per tenant | P2 | |
| Katalog | Kategori, varian durasi, add-on, buffer, harga per level terapis | MVP | |
| | Kebutuhan sumber daya: tipe ruangan, jumlah terapis, peralatan | MVP (ruangan, terapis) → P2 (peralatan) | |
| Ketersediaan | **Terapis ∩ ruangan**, couples, multi-layanan berurutan | MVP | Pembeda utama |
| | Terapis mana saja dengan pemerataan beban, preferensi gender | MVP | |
| | Waitlist otomatis mengisi slot batal | P2 | |
| | Kelas/grup (yoga, sound bath) | P3 | |
| Booking publik | 4 langkah, tamu, hold 10 menit, kelola via link, .ics | MVP | |
| | Akun klien: riwayat, paket, kartu tersimpan | P2 | |
| | Multi-bahasa (EN/ID/JP) | P3 | Turis Bali |
| Pembayaran | Deposit %, QRIS/VA (IDR), kartu (USD), refund | MVP | |
| | Kartu tersimpan + denda no-show/terlambat batal | MVP | Persetujuan eksplisit |
| | Checkout front desk + tip per terapis | MVP | |
| | Gift card, paket sesi | MVP | |
| | Membership berulang (kredit bulanan) | P2 | |
| | POS produk retail + stok | P3 | |
| Formulir | Intake & consent berversi, e-sign, kedaluwarsa | MVP | |
| | Foto before/after terenkripsi (estetika) | P2 | |
| Front desk | Kalender per terapis / per ruangan, drag dengan validasi, walk-in, check-in | MVP | |
| | Tampilan tablet resepsionis, mode antrian walk-in | P2 | |
| Terapis | Jadwal hari ini, catatan klien, selesai sesi (web responsif) | MVP | |
| | PWA penuh: tip saya, cuti, tukar shift | P2 | |
| | Komisi | P2 | Payroll di sistem terpisah |
| Klien | Profil, preferensi, alergi (terenkripsi), riwayat, formulir, paket | MVP | |
| Komunikasi | Konfirmasi, pengingat H-1 & 2 jam, link formulir, minta ulasan | MVP | WhatsApp + email |
| | SMS, kampanye win-back, kupon | P2 | Otomasi eksternal |
| Laporan | Utilisasi terapis & ruangan, pendapatan, no-show, rebooking, tip | MVP | |
| Integrasi | Google Calendar terapis, webhook keluar | P2 | |

## Dampak ke MVP
MVP ±3 minggu paruh waktu: mesin ketersediaan terapis × ruangan, kartu tersimpan, dan formulir adalah inti pembeda.

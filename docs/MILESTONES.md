# Milestones — Lulur (MVP ±3 minggu paruh waktu)

> Status 2026-11-04: M1–M6 implemented (see ../BREAKDOWN.md for what is simulated). P2 not started. Checkboxes below were ticked after the audit; items marked simulated in BREAKDOWN.md are only done against the sandbox.

## M1 — Fondasi multi-tenant (±3 hari)
- [x] Laravel 12 + Postgres (btree_gist) + Redis/Horizon + Inertia/Vue SSR
- [x] tenants, locations, memberships, peran; middleware subdomain; global scope + RLS; 2FA
- [x] Tes isolasi lintas tenant untuk setiap resource
- **Verifikasi:** user tenant A mendapat 404 untuk id tenant B di semua route.

## M2 — Katalog, tim, ruangan (±2 hari)
- [x] services, variants, addons, staff, skills, shifts, time_off, rooms + CRUD admin (A03, A06, A07)
- [ ] Templat layanan spa & klinik untuk onboarding — not verified
- **Verifikasi:** seeder tiga tenant tampil lengkap.

## M3 — Mesin ketersediaan & hold (±4 hari)
- [x] Algoritme terapis ∩ ruangan, couples, multi-layanan berurutan, auto-assign
- [x] booking_resources + exclusion constraint; hold 10 menit + ExpireHolds
- [x] Tes tabel + tes properti + tes paralel; DST New York
- **Verifikasi:** 100 hold paralel pada slot sama → tepat 1 berhasil.

## M4 — Booking publik, formulir, pembayaran (±4 hari)
- [x] B01–B05; formulir berversi + e-sign; policy snapshot
- [ ] PaymentGateway: Stripe (deposit, SetupIntent, off-session no-show) + Midtrans (QRIS/VA); webhook idempoten — sandbox gateway only; Stripe/Midtrans adapters not written; idempotent webhook handling done
- [~] Email + WhatsApp (simulasi) konfirmasi, .ics, pengingat — simulated (log); .ics done
- **Verifikasi:** Playwright booking couples di 390px sampai konfirmasi. — driven manually with Playwright scripts, not committed as a test

## M5 — Front desk & klien (±4 hari)
- [x] Calendar (A01) per terapis/ruangan, drag dengan validasi, walk-in, check-in, checkout + tip, no-show + denda
- [x] Client profile (A02), paket & gift card, redeem
- [x] Terapis Today (T01) responsif
- **Verifikasi:** geser ke slot bentrok ditolak dengan alasan; tip teralokasi ke terapis.

## M6 — Laporan & rilis demo (±2 hari)
- [x] Reports (A04): utilisasi, pendapatan, no-show, rebooking, tip
- [~] README and case study done; video and hosted demo not done (three seeded tenants exist locally)
- **Verifikasi:** angka laporan cocok dengan seeder.

## P2 (±2–3 minggu)
Admin platform + langganan + impersonasi, membership berulang, waitlist otomatis, multi-cabang penuh, PWA terapis, komisi, foto before/after, Google Calendar, SMS, custom domain.

## Definisi selesai
Repo + README, demo live, studi kasus + video.

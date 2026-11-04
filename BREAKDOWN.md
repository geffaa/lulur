# Lulur — multi-tenant booking for spas and aesthetic clinics (summary)

One platform serves many wellness businesses. Each has its own branded booking page, locations, services, therapists, rooms, packages and deposit rules.

**Core of the product:** a slot appears only when a suitable therapist **and** a suitable room are free together, including couples bookings. Around it: deposits and no-show fees, consent forms signed before arrival, packages, gift cards, tips, reminders and a front-desk calendar.

Laravel + PostgreSQL + Inertia/Vue (PostgreSQL was chosen for its exclusion constraints).

## Status (2026-11-04): MVP built, demo not deployed
| Milestone | State |
|---|---|
| M1 multi-tenant foundation (subdomain, global scope + RLS, roles, 2FA) | Done; tenant isolation tested |
| M2 catalog, team, rooms | Done |
| M3 availability engine, holds | Done; 10-process race test passes (exactly one booking) |
| M4 public booking, forms, payments, reminders | Done; IDR payments via Midtrans sandbox, USD via simulation; WhatsApp/email simulated |
| M5 front desk and clients | Done (calendar, checkout + tip, no-show fee, packages, gift cards, therapist Today) |
| M6 reports, README, case study | Done; demo video recorded, no hosted demo |

39 Pest tests (121 assertions) and 14 Playwright browser tests (`npm run e2e`), all passing. UI checked in a browser at 1440 and 390 px (zero native form controls, zero horizontal scroll).

## Hand-off notes
- **Payments:** Midtrans Snap (sandbox) is implemented for IDR: transaction creation, webhook signature check + amount check, status reconciliation on return; webhook routes no longer go through tenant resolution. Verified live with a real sandbox payment; a real webhook delivery is untested (needs a public URL). **Not real yet:** Stripe, production Midtrans activation, WhatsApp Cloud API, an email provider.
- **Browser tests exist** (e2e/, own database). Not covered: calendar drag-and-drop and real payment providers.
- **Scheduler required:** `lulur:expire-holds` and `lulur:send-reminders` run every minute via `schedule:work`; without it holds never expire.
- **Demo data is date-relative.** Re-seed on a new day.
- **Rule versioning is lighter than originally planned:** per-booking policy snapshot and versioned forms only; no effective-dated rule packs.
- **Fixed during the audit (2026-11-03/04):** two date-frozen DST tests; the race test ran sequentially; catalog and team pages returned 500; the Add shift and Time off forms could never save; time-off rows crashed availability (missing cast); WhatsApp STOP never stopped reminders; the booking time step crashed when a part of the day had no slots; the desktop summary column rendered below the content (Vue 2 slot syntax); "hold expires in 0 min"; default dates used UTC instead of the spa's timezone; two CSS class collisions broke the time step and in-service calendar blocks; native selects and date inputs were replaced with custom controls.
- **Found by the browser tests (2026-11-04):** checkout never saved the booker's details: the "Your name" field was bound to the first guest while the request sent an empty contact name, the server rejected it silently, and pay raced ahead of the details request (router.post returns void, not a Promise). Consent signatures and guest names were therefore never stored. Also: the signature pad shipped with a pre-drawn squiggle that looked signed and only a small part of the pad was drawable; a couple's second guest was recorded as "signed" without a signature; no page showed flash messages or validation errors (added a toast); the seeder could fail on some weekdays.
- Open decisions are listed in the audit summary given to the owner.

## Documents
[docs/PRD.md](docs/PRD.md) · [docs/TECH-SPEC.md](docs/TECH-SPEC.md) · [docs/FEATURE-MAP.md](docs/FEATURE-MAP.md) · [docs/IA.md](docs/IA.md) · [docs/SCREENS.md](docs/SCREENS.md) · [docs/MILESTONES.md](docs/MILESTONES.md) · [docs/CASE-STUDY.md](docs/CASE-STUDY.md) · [PRODUCT.md](PRODUCT.md) · [DESIGN.md](DESIGN.md) · [mockups/](mockups/index.html)

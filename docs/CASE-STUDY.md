# Case study — Lulur: booking where the therapist and the room must both be free

**Problem.** Generic booking tools treat a spa like a hair salon: one person, one slot. In a spa the scarce resource is often the *room*: a couples suite sits idle because nobody can be matched to it, or two clients get the same room because the calendar only looked at therapists. Deposits, consent forms and package sessions are usually bolted on.

**What I built.** A multi-tenant booking platform (Laravel, PostgreSQL, Vue) with a mobile-first booking page and a front-desk app. A slot is offered only when a therapist with the right skill, a shift covering the time, no time off, and a room of the right type are all free for the treatment plus its buffer. Couples bookings need two therapists and the suite at once.

## The decision that matters: let the database refuse a double booking

Application code that checks availability and then inserts has a race: two clients choose the same slot in the same moment and both pass the check. Instead of locks in PHP, every therapist and room of a booking is a row in `booking_resources` with a time range, and PostgreSQL exclusion constraints reject any overlap for the same tenant and resource. The engine decides what to *show*; the constraint decides what can be *stored*.

**Proof.** A test starts 10 separate OS processes that try to hold the same slot at the same moment; exactly one booking is created. (While auditing the project I found this test had been joining its workers with `;`, which ran them one after another and proved nothing. It now runs them concurrently and passes.)

## Other things that were hard

- **Time.** Everything is stored in UTC and shown in the location's zone; a test books across the US daylight-saving change, and the default "today" on every page is the spa's date, not the server's.
- **Idempotent payments.** A payment is confirmed by its idempotency key under a row lock; a test replays the same webhook and checks the deposit is not counted twice.
- **Consent as data.** Forms are versioned; a signature belongs to the version that was signed; the calendar flags bookings whose form is missing, and the confirmation page lets the second guest of a couples booking sign from a link.
- **Policies are snapshots.** The deposit and cancellation rules in force when a booking is made are copied onto it, so a later change does not rewrite history.
- **Tenant isolation in two layers.** A global scope on every model plus PostgreSQL row-level security; a test checks cross-tenant access across resources.

## Mobile booking UI

The booking page is a normal web page designed for a phone first: party size (just me / for two) is the first decision and sits on top as a full-width toggle; categories are a single swipeable row; the summary becomes a sticky bottom bar. All form controls (listboxes, date picker, checkboxes, segmented controls) are custom components with keyboard support; a scan of every page found no native browser form controls.

## What the browser tests caught

Writing the end-to-end test for the booking flow exposed a bug that unit tests and screenshots had missed: the checkout page never saved the booker's details. The name field was bound to the first guest while the request sent a different (empty) field; the server rejected it, nothing showed the error, and the payment request ran in parallel anyway. The booking was confirmed, but the client, guest names and signed consent were never stored. The fix waits for the details request, stops on errors with a visible message, and the test now asserts that the stored guest name appears on the confirmation page.

## What I verified, and how

| Check | Result |
|---|---|
| Automated tests | 39 Pest tests (121 assertions) on a real PostgreSQL database, plus 14 Playwright browser tests (7 flows at desktop and phone size), all passing |
| Concurrency | 10 parallel processes, exactly 1 booking, repeated 3 times |
| Browser, 1440 px and 390 px | Every admin and booking page loaded; no horizontal scroll; no native form controls; no console errors apart from external requests blocked in my sandbox |
| End-to-end, desktop and 390 px phone | Couples Ritual: treatment, time, details, health questions, drawn signature, sandbox deposit, confirmation; the stored guest name and signature are asserted |

## What is simulated (and I say so)

Indonesian (IDR) payments go through the Midtrans sandbox: I made a real sandbox payment with a test card and the booking confirmed on return. Webhook signature and amount checks are tested, but I have not received a real Midtrans webhook (it needs a public URL). USD tenants use a built-in simulation; Stripe, production Midtrans activation, WhatsApp Cloud API and an email provider are not connected (messages are written to the log). There is no hosted demo yet. Calendar drag-and-drop is not covered by tests.

## What I would do next for a real client

1. Activate Midtrans for production (the client's own merchant account), expose the webhook URL, and add Stripe for USD tenants.
2. Connect WhatsApp Cloud API with approved templates, and an email provider.
3. Add a Playwright suite for the booking flow and the calendar.
4. Deploy with wildcard subdomains and Horizon workers.

*Stack: Laravel 12, PostgreSQL (exclusion constraints, RLS), Redis, Inertia + Vue 3, Vite, Pest. Demo data is fictional; photos are credited in `public/img/credits.json`.*

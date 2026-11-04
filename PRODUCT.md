<!-- impeccable:product-schema v1 -->
# Lulur

## What it is
A multi-tenant booking platform for wellness businesses: day spas, massage studios and aesthetic clinics. Each business gets its own branded booking page, locations, services, therapists, rooms, packages and deposit rules. Slots only appear when a qualified therapist and a suitable room are both free, including couples bookings and back-to-back services. Around that: deposits and no-show fees, intake and consent forms signed before the visit, packages and gift cards, tips, WhatsApp and email reminders, and a front-desk calendar.

## Who it is for
- Clients booking on a phone, often tourists or busy professionals, without an account.
- Front-desk staff who live in the calendar all day.
- Therapists checking today's schedule and client notes on a phone.
- Owners and managers setting services, prices, policies and reading utilisation.
- The platform operator managing tenants (phase 2).

## Jobs to be done
- Book a treatment, including for two people, in under two minutes.
- Never double-book a therapist or a room.
- Reduce no-shows with deposits, saved cards and reminders.
- Check clients in without paper forms.
- Track package sessions and tips.

## Context of use
Booking pages on phones over mobile data; admin on a desktop or tablet at reception; therapist view on a phone between sessions. Demo tenants are fictional: a Bali spa (IDR), a Philadelphia massage studio (USD) and a Jakarta aesthetic clinic (IDR). Assumption: English UI for both.

## Platform
web

## Constraints
- Laravel + PostgreSQL (exclusion constraints) + Redis/Horizon, Inertia + Vue 3 with SSR for booking pages.
- Payments via Stripe (USD, saved cards) and Midtrans/Xendit (IDR) in sandbox; WhatsApp simulated in the demo.
- Not a medical records system. WCAG AA; custom form controls only.

## Success looks like
Zero double bookings under concurrency, mobile booking in four steps, forms completed before arrival for most visits, and strict tenant isolation.

<script setup>
import { computed, ref } from 'vue'
import { router, usePage } from '@inertiajs/vue3'
import BookingLayout from '@/Layouts/BookingLayout.vue'
import Icon from '@/Components/Icon.vue'
import Money from '@/Components/Money.vue'

const props = defineProps({
    booking: Object, form: Object, policy: Object, currency: String, payment_methods: Array,
    tenant: Object, location: Object,
})

const guestsCount = props.booking.guests
const guests = ref(Array.from({ length: guestsCount }, (_, i) => ({
    name: i === 0 ? '' : '',
    answers: {},
    pressure: 'medium',
    allergies_note: '',
    avoid: '',
    note: '',
    signed: false,
    signature: '',
})))
const activeGuest = ref(0)
const payError = ref(null)

const contact = ref({ name: '', phone: '', email: '', marketing_consent: false })
const method = ref(props.payment_methods[0].id)
const agreePolicy = ref(false)
const saving = ref(false)
const paying = ref(false)

// segmented yes/no fields from the form definition
const boolFields = computed(() => (props.form?.fields ?? []).filter((f) => f.type === 'bool_seg'))
const segFields = computed(() => (props.form?.fields ?? []).filter((f) => f.type === 'segment'))
const textFields = computed(() => (props.form?.fields ?? []).filter((f) => f.type === 'textarea'))

// nut-allergy style flag: first bool question answered yes → warn note
const warnNote = computed(() => {
    const f = boolFields.value.find((f) => /allerg/i.test(f.label))
    if (f && guests.value[activeGuest.value]?.answers[f.id]) {
        return 'Allergy noted: your therapist will adapt oils and products used during the treatment.'
    }
    return null
})

const total = props.booking.total
const depositDue = props.booking.deposit_due

async function saveDetails() {
    saving.value = true
    const payload = {
        name: contact.value.name || guests.value[0]?.name || '', // the "Your name" field is bound to the first guest
        phone: contact.value.phone,
        email: contact.value.email,
        marketing_consent: contact.value.marketing_consent,
        guests: guests.value.map((g, i) => ({
            name: g.name || (guestsCount > 1 ? `Guest ${i + 1}` : contact.value.name),
            pressure: g.pressure,
            allergies_note: g.allergies_note || null,
            avoid: g.avoid || null,
            note: g.note || null,
            answers: g.answers,
            signature: g.signature || null,
        })),
    }
    // router.post returns void, not a Promise: wait for the visit to finish, and report whether it was accepted
    const ok = await new Promise((resolve) => {
        let accepted = true
        router.post(`/book/${props.booking.code}/details`, payload, {
            preserveScroll: true,
            onError: () => { accepted = false },
            onFinish: () => resolve(accepted),
        })
    })
    saving.value = false
    return ok
}

async function pay() {
    if (!agreePolicy.value) return
    paying.value = true
    if (!(await saveDetails())) { paying.value = false; return } // details rejected: stay here, the toast shows why
    const res = await fetch(`/book/${props.booking.code}/pay`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': document.querySelector('meta[name=csrf-token]')?.content ?? '' },
        body: JSON.stringify({ method: method.value }),
    })
    const json = await res.json().catch(() => ({}))
    if (json.redirect) window.location = json.redirect
    else payError.value = json.message ?? 'Payment could not be started. Please try again.'
    paying.value = false
}

// signature pad → svg path
function initPad(el, gi) {
    if (!el || el.dataset.init) return
    el.dataset.init = 1
    const svg = el.querySelector('svg')
    const path = svg.querySelector('path')
    let drawing = false
    let d = ''
    const pt = (e) => {
        const r = svg.getBoundingClientRect()
        const x = ((e.touches ? e.touches[0].clientX : e.clientX) - r.left) / r.width * 300
        const y = ((e.touches ? e.touches[0].clientY : e.clientY) - r.top) / r.height * 80
        return `${x.toFixed(1)} ${y.toFixed(1)}`
    }
    const start = (e) => { drawing = true; d = `M${pt(e)}`; e.preventDefault() }
    const move = (e) => {
        if (!drawing) return
        d += ` L${pt(e)}`
        path.setAttribute('d', d)
        e.preventDefault()
    }
    const stop = () => {
        if (!drawing) return
        drawing = false
        if (d.length > 20) {
            guests.value[gi].signature = d
            guests.value[gi].signed = true
        }
    }
    svg.addEventListener('pointerdown', start)
    svg.addEventListener('pointermove', move)
    window.addEventListener('pointerup', stop)
}

const holdMins = computed(() => Math.max(0, Math.ceil((props.booking.hold_seconds_left ?? 0) / 60)))
</script>

<template>
    <BookingLayout :step="3" :brand="tenant" :location="location">
        <div>
            <h1>Almost done</h1>
            <p class="lead">{{ booking.when }}–{{ booking.end }} · hold expires in {{ holdMins }} min</p>

            <section class="sec card">
                <h2><span class="n">1</span>Contact</h2>
                <div class="row2">
                    <div class="field">
                        <label :for="`gname-${activeGuest}`">{{ guestsCount > 1 ? 'First guest' : 'Full name' }}</label>
                        <div class="input" :class="{ focus: true }">
                            <input :id="`gname-${activeGuest}`" v-model="guests[activeGuest].name" placeholder="Your name" style="border:0;outline:0;background:none;width:100%;font:inherit">
                        </div>
                    </div>
                    <div v-if="guestsCount > 1" class="field">
                        <label>Second guest</label>
                        <div class="input">
                            <input v-if="guestsCount > 1 && activeGuest === 1" v-model="guests[1].name" placeholder="Second guest" style="border:0;outline:0;background:none;width:100%;font:inherit">
                            <span v-else class="phd">{{ guests[0].name || 'First guest' }}'s partner</span>
                        </div>
                    </div>
                    <div class="field">
                        <label>WhatsApp</label>
                        <div class="input"><input v-model="contact.phone" placeholder="+44 7700 900 418" style="border:0;outline:0;background:none;width:100%;font:inherit"></div>
                        <span class="hint">Confirmation and reminders arrive here</span>
                    </div>
                    <div class="field">
                        <label>Email</label>
                        <div class="input"><input v-model="contact.email" type="email" placeholder="you@example.com" style="border:0;outline:0;background:none;width:100%;font:inherit"></div>
                    </div>
                </div>
            </section>

            <section v-if="form" class="sec card">
                <h2><span class="n">2</span>Health &amp; preferences <span class="muted small">{{ form.name }} v{{ form.version }}</span></h2>
                <div v-if="guestsCount > 1" class="gtabs" role="tablist">
                    <button v-for="(g, i) in guests" :key="i" class="chip" role="tab" :aria-selected="String(activeGuest === i)"
                        :class="{ on: activeGuest === i }" @click="activeGuest = i">
                        {{ g.name || (i === 0 ? 'Guest 1' : 'Guest 2') }}
                        <Icon v-if="!g.signed" xs name="circle-alert" />
                    </button>
                </div>
                <div class="health">
                    <div v-for="f in boolFields" :key="f.id" class="q">
                        <span>{{ f.label }}</span>
                        <span class="seg" role="radiogroup" :aria-label="f.label">
                            <button :aria-pressed="String(guests[activeGuest].answers[f.id] === false)" @click="guests[activeGuest].answers[f.id] = false">No</button>
                            <button :aria-pressed="String(guests[activeGuest].answers[f.id] === true)" @click="guests[activeGuest].answers[f.id] = true">Yes</button>
                        </span>
                    </div>
                </div>
                <div class="field">
                    <label>Pressure</label>
                    <div class="seg" role="radiogroup" aria-label="Pressure" style="width:max-content">
                        <button v-for="p in ['light', 'medium', 'firm']" :key="p" :aria-pressed="String(guests[activeGuest].pressure === p)"
                            @click="guests[activeGuest].pressure = p">{{ p[0].toUpperCase() + p.slice(1) }}</button>
                    </div>
                </div>
                <div class="field">
                    <label>Anything we should know?</label>
                    <div class="input area">
                        <textarea v-model="guests[activeGuest].note" rows="2" placeholder="Injuries, sensitivities, requests…" style="border:0;outline:0;background:none;width:100%;font:inherit;resize:vertical" />
                    </div>
                </div>
                <div v-if="warnNote" class="note warn"><Icon sm name="triangle-alert" /><span>{{ warnNote }}</span></div>
            </section>

            <section class="sec card">
                <h2><span class="n">3</span>Consent</h2>
                <p v-if="form" style="font-size:14px;color:var(--text-2)">
                    I confirm the information above is correct and agree to the {{ form.name }} (v{{ form.version }}<template v-if="form.updated">, updated {{ form.updated }}</template>).
                </p>
                <div :ref="(el) => initPad(el, activeGuest)" class="sig" :key="activeGuest">
                    <svg viewBox="0 0 300 80" preserveAspectRatio="none" aria-hidden="true"><path vector-effect="non-scaling-stroke" d="" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" /></svg>
                    <span v-if="!guests[activeGuest].signature" class="sighint">Draw your signature here</span>
                    <span class="x">Sign here · {{ guests[activeGuest].name || contact.name || 'your name' }}</span>
                </div>
                <span v-if="guestsCount > 1" class="muted small">The second guest signs the same form from the link in your confirmation, or at the spa.</span>
            </section>

            <section class="sec card">
                <h2><span class="n">4</span>Deposit</h2>
                <ul class="policy">
                    <li><Icon xs name="check" />{{ depositDue ? `Pay ${policy.deposit_percent}% now, the rest at the spa` : 'No deposit — your card on file covers no-shows per policy' }}</li>
                    <li><Icon xs name="check" />Free cancellation or reschedule until {{ policy.cancel_deadline }}</li>
                    <li><Icon xs name="check" />Later cancellations or no-shows {{ depositDue ? 'keep the deposit' : 'are charged ' + policy.no_show_fee_percent + '% from the saved card' }}</li>
                </ul>
                <div role="radiogroup" aria-label="Payment method">
                    <div v-for="m in payment_methods" :key="m.id" class="opt" role="radio" :aria-checked="String(method === m.id)" @click="method = m.id">
                        <span class="rdo" aria-hidden="true"><span class="o" /></span>
                        <span class="t"><b>{{ m.label }}</b><small>{{ m.hint }}</small></span>
                        <span v-if="depositDue" class="r"><Money :amount="depositDue" :currency="currency" /></span>
                    </div>
                </div>
                <span class="cbx" role="checkbox" :aria-checked="String(agreePolicy)" tabindex="0"
                    @click="agreePolicy = !agreePolicy" @keydown.space.prevent="agreePolicy = !agreePolicy">
                    <span class="box"><Icon v-if="agreePolicy" name="check" /></span>
                    I agree to the cancellation policy
                </span>
            </section>
        </div>

        <template #aside>
          <aside class="summary card" aria-label="Your booking">
              <h2>Your booking</h2>
              <div class="it">
                  <img :src="booking.service.photo" alt="">
                  <span class="t2"><b>{{ booking.service.name }} · {{ booking.service.duration }} min</b>
                      <small>{{ booking.guests > 1 ? '2 guests' : '1 guest' }}</small></span>
              </div>
              <div v-for="(a, i) in booking.addons" :key="i" class="row"><span>{{ a.name }}</span><span><Money :amount="a.price" :currency="currency" /></span></div>
              <div class="row"><span>When</span><span>{{ booking.when }}–{{ booking.end }}</span></div>
              <div class="row tot"><span style="color:var(--text)">Total</span><span><Money :amount="total" :currency="currency" /></span></div>
              <div class="dep">
                  <span>Pay now ({{ policy.deposit_percent }}% deposit)</span>
                  <b><Money :amount="depositDue" :currency="currency" /></b>
                  <span class="muted small">Balance <Money :amount="total - depositDue" :currency="currency" /> at the spa · free cancellation until 24 h before</span>
              </div>
              <p v-if="payError" class="note warn" role="alert"><Icon sm name="circle-alert" /><span>{{ payError }}</span></p>
              <button class="btn primary block" :disabled="!agreePolicy || paying" @click="pay">
                  {{ depositDue ? `Pay deposit ` : 'Confirm booking' }}<template v-if="depositDue"><Money :amount="depositDue" :currency="currency" /></template>
              </button>
          </aside>
        </template>

        <template #mbar>
          <div class="mbar">
              <span class="t"><b><Money :amount="total" :currency="currency" /></b><small>Deposit <Money :amount="depositDue" :currency="currency" /> today</small></span>
              <button class="btn primary" :disabled="!agreePolicy || paying" @click="pay">
                  {{ depositDue ? 'Pay deposit' : 'Confirm' }} <template v-if="depositDue"><Money :amount="depositDue" :currency="currency" /></template>
              </button>
          </div>
        </template>
    </BookingLayout>
</template>

<script setup>
import { ref } from 'vue'
import { router, usePage } from '@inertiajs/vue3'
import Icon from '@/Components/Icon.vue'
import Money from '@/Components/Money.vue'
import IconSprite from '@/Components/IconSprite.vue'

const props = defineProps({
    welcome: Boolean, booking: Object, policy: Object, currency: String, brand: Object,
})

const page = usePage()
const token = new URLSearchParams(window.location.search).get('t')
const activeRescheduleDay = ref(null)
const reschedule = ref(false)
const days = ref([])
const slots = ref({})
const chosen = ref(null)
const cancelConfirm = ref(false)

async function loadReschedule() {
    reschedule.value = true
    const q = new URLSearchParams({ service_variant: props.booking.service.variant_id, from: props.booking.date })
    const j = await (await fetch(`/availability/summary?${q}`)).json()
    days.value = j.days.map((d) => {
        const date = new Date(d.date + 'T00:00:00')
        return {
            date: d.date,
            dow: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()],
            num: date.getDate(),
            level: d.count === 0 ? 'none' : d.count <= 4 ? 'low' : '',
            disabled: d.count === 0,
        }
    })
}
async function pickDay(d) {
    if (d.disabled) return
    activeRescheduleDay.value = d
    const q = new URLSearchParams({ service_variant: props.booking.service.variant_id, date: d.date })
    const j = await (await fetch(`/availability?${q}`)).json()
    slots.value = j.slots
    chosen.value = null
}
async function doReschedule() {
    await router.post(`/b/${props.booking.code}/reschedule`, { start: `${chosen.value.date} ${chosen.value.time}`, t: token }, {
        onSuccess: () => { reschedule.value = false },
    })
}
function doCancel() {
    router.post(`/b/${props.booking.code}/cancel`, { t: token })
}
async function signFor(name) {
    const path = document.querySelector('.sig svg path')
    await router.post(`/b/${props.booking.code}/sign`, {
        guest_name: name,
        signature: path?.getAttribute('d') || '',
        t: token,
    })
}
// signature pad → svg path
function initPad(el) {
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
    svg.addEventListener('pointerdown', (e) => { drawing = true; d = `M${pt(e)}`; e.preventDefault() })
    svg.addEventListener('pointermove', (e) => {
        if (!drawing) return
        d += ` L${pt(e)}`
        path.setAttribute('d', d)
        e.preventDefault()
    })
    window.addEventListener('pointerup', () => { drawing = false })
}
</script>

<template>
    <div class="book">
        <IconSprite />
        <header class="bhdr">
            <div class="w">
                <a class="blogo" href="/"><i>{{ brand.logo_letter }}</i>{{ brand.name }}</a>
                <div class="r"><a class="btn ghost" href="/">Book another visit</a></div>
            </div>
        </header>
        <main class="bw" style="grid-template-columns:minmax(0,1fr)">
            <div>
                <div v-if="welcome && booking.status === 'confirmed'" class="card" style="padding:24px;display:grid;gap:12px">
                    <span class="badge ok" style="width:max-content"><Icon name="check" />Confirmed</span>
                    <h1 style="font:600 30px/1.15 var(--serif)">You're booked{{ booking.guest_names[0] ? ', ' + booking.guest_names[0] : '' }}!</h1>
                    <p class="muted">{{ booking.service.name }} · {{ booking.when }}–{{ booking.end }} · {{ booking.room }}</p>
                    <div style="display:flex;gap:8px;flex-wrap:wrap">
                        <a class="btn" :href="`/b/${booking.code}/ics?t=${token}`"><Icon sm name="download" />Add to calendar (.ics)</a>
                        <a class="btn" href="#manage">Manage booking</a>
                    </div>
                    <div class="note brand"><Icon sm name="info" /><span>A WhatsApp confirmation is on its way, with reminders the day before and 2 hours before.<template v-if="booking.unsigned_guests?.length"> {{ booking.unsigned_guests.join(', ') }} can sign the consent form below.</template></span></div>
                </div>

                <div v-if="booking.status === 'cancelled'" class="note warn" style="margin-top:16px"><Icon sm name="triangle-alert" /><span>This booking was cancelled. {{ policy.deposit_kept ? 'The deposit is kept per the cancellation policy.' : 'Your deposit will be refunded.' }}</span></div>

                <section id="manage" class="sec card" style="margin-top:16px">
                    <h2 style="display:flex;align-items:center;gap:8px">{{ booking.service.name }} · {{ booking.service.duration }} min
                        <span class="badge" style="margin-left:auto">{{ booking.status_label }}</span>
                    </h2>
                    <div style="display:grid;grid-template-columns:130px 1fr;gap:10px;font-size:14px">
                        <span class="muted">When</span><b>{{ booking.when }}–{{ booking.end }}</b>
                        <span class="muted">Room</span><b>{{ booking.room || '—' }}</b>
                        <span class="muted">Therapists</span><b>{{ booking.therapists.join(' · ') || 'Any' }}</b>
                        <span class="muted">Guests</span><b>{{ booking.guest_names.join(' & ') || '—' }}</b>
                        <span class="muted">Total</span><b><Money :amount="booking.total" :currency="currency" /></b>
                        <template v-if="booking.deposit_paid">
                            <span class="muted">Deposit paid</span><b style="color:var(--ok)"><Money :amount="-booking.deposit_paid" :currency="currency" /></b>
                        </template>
                        <span class="muted">{{ booking.deposit_paid ? 'Balance at the spa' : 'Paid today' }}</span>
                        <b><Money :amount="booking.deposit_paid ? booking.balance : booking.total" :currency="currency" /></b>
                        <template v-if="booking.package_left !== null && booking.package_left !== undefined">
                            <span class="muted">Package</span><b>{{ booking.package_left }} sessions left</b>
                        </template>
                    </div>
                    <div v-if="booking.form_missing" class="note warn"><Icon sm name="file-warning" /><span>Consent form missing — please sign below before your visit (takes 30 seconds).</span></div>
                    <div v-if="['held', 'confirmed'].includes(booking.status)" style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">
                        <button class="btn" @click="reschedule = true; loadReschedule()"><Icon sm name="calendar-clock" />Reschedule</button>
                        <button v-if="!cancelConfirm" class="btn" @click="cancelConfirm = true"><Icon sm name="x" />Cancel booking</button>
                        <template v-else>
                            <span class="note warn" style="padding:8px 12px">{{ policy.inside_window ? `Free cancellation until ${policy.cancel_deadline}. Deposit refunded.` : `You are past the free window (${policy.cancel_deadline}) — the deposit is kept.` }}</span>
                            <button class="btn" @click="cancelConfirm = false">Keep booking</button>
                            <button class="btn primary" @click="doCancel">Confirm cancellation</button>
                        </template>
                    </div>
                </section>

                <section v-if="reschedule" class="sec card">
                    <h2>Pick a new time</h2>
                    <div class="days" role="radiogroup">
                        <span v-for="d in days" :key="d.date" class="day" role="radio" aria-checked="false"
                            :aria-disabled="String(d.disabled)" @click="pickDay(d)">{{ d.dow }}<b>{{ d.num }}</b><i :class="d.level" /></span>
                    </div>
                    <template v-for="(list, part) in slots" :key="part">
                        <h3 v-if="list.length" class="muted small strong" style="margin-top:14px">{{ part[0].toUpperCase() + part.slice(1) }}</h3>
                        <div v-if="list.length" class="sg">
                            <button v-for="t in list" :key="t" class="sl" @click="chosen = { date: activeRescheduleDay.date, time: t }">{{ t }}</button>
                        </div>
                    </template>
                    <div style="display:flex;gap:8px;margin-top:14px">
                        <button class="btn" @click="reschedule = false">Back</button>
                        <button class="btn primary" :disabled="!chosen" @click="doReschedule">Move booking</button>
                    </div>
                </section>

                <section v-if="booking.unsigned_guests?.length" class="sec card">
                    <h2>Sign the consent form</h2>
                    <p class="muted small">For {{ booking.unsigned_guests.join(' and ') }} — draw your signature below.</p>
                    <div v-for="name in booking.unsigned_guests" :key="name" style="display:grid;gap:8px;margin-top:10px">
                        <div :ref="initPad" class="sig">
                            <svg viewBox="0 0 300 80"><path d="" fill="none" stroke="currentColor" stroke-width="2.4" /></svg>
                            <span class="x">{{ name }}</span>
                        </div>
                        <button class="btn sm" style="width:max-content" @click="signFor(name)">Submit signature for {{ name }}</button>
                    </div>
                </section>

                <p class="synthetic">Manage link is signed and expires with the visit. Fictional demo data.</p>
            </div>
        </main>
    </div>
</template>

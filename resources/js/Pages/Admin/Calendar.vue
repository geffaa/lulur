<script setup>
import { computed, ref } from 'vue'
import { Link, router, usePage } from '@inertiajs/vue3'
import AdminLayout from '@/Layouts/AdminLayout.vue'
import Icon from '@/Components/Icon.vue'
import Money from '@/Components/Money.vue'

const props = defineProps({
    date: String, group: String, locations: Array, location: Object,
    columns: Array, bookings: Array, selected: Object, now: String,
    calendarStart: String, calendarEnd: String, pxPerHour: Number,
})

const page = usePage()
const day = ref(props.date)
const group = ref(props.group)
const loc = ref(props.location.slug)
const sel = ref(props.selected)
const flash = computed(() => page.props.flash)

function navigate() {
    router.get(route('admin.calendar'), { date: day.value, group: group.value, location: loc.value }, { preserveState: true })
}
function shiftDate(n) {
    const d = new Date(day.value + 'T00:00:00')
    d.setDate(d.getDate() + n)
    day.value = d.toISOString().slice(0, 10)
    navigate()
}
function today() { day.value = new Date().toISOString().slice(0, 10); navigate() }
function dateLabel() {
    const d = new Date(day.value + 'T00:00:00')
    return d.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })
}

// ---- geometry (all wall-clock math in the location's timezone) ----
const startHour = parseInt(props.calendarStart)
const endHour = parseInt(props.calendarEnd)
const PXH = props.pxPerHour
const colH = (endHour - startHour) * PXH
const tz = props.location.timezone
const minutesInTz = (iso) => {
    const parts = new Intl.DateTimeFormat('en-GB', { timeZone: tz, hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date(iso))
    const h = parseInt(parts.find((p) => p.type === 'hour').value)
    const m = parseInt(parts.find((p) => p.type === 'minute').value)
    return (h % 24) * 60 + m
}
const top = (iso) => Math.max(0, (minutesInTz(iso) - startHour * 60) / 60 * PXH)
const height = (isoStart, isoEnd) => Math.max(28, (minutesInTz(isoEnd) - minutesInTz(isoStart)) / 60 * PXH)
const timeMarks = computed(() => {
    const out = []
    for (let h = startHour + 1; h <= endHour; h++) out.push({ label: `${String(h).padStart(2, '0')}:00`, top: (h - startHour) * PXH })
    return out
})
const nowTop = computed(() => (minutesInTz(props.now) - startHour * 60) / 60 * PXH)
const nowLabel = computed(() => {
    const parts = new Intl.DateTimeFormat('en-GB', { timeZone: tz, hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date(props.now))
    return `${parts.find((p) => p.type === 'hour').value}:${parts.find((p) => p.type === 'minute').value}`
})
const dayFormatter = new Intl.DateTimeFormat('en-GB', { timeZone: tz, hour: '2-digit', minute: '2-digit', hour12: false })
const rangeLabel = (isoS, isoE) => `${dayFormatter.format(new Date(isoS))}–${dayFormatter.format(new Date(isoE))}`
const hoursLabel = (min) => `${Math.floor(min / 60)} h ${String(min % 60).padStart(2, '0')}`

// column assignment
const bookingsFor = (col) => props.bookings.filter((b) => group.value === 'rooms'
    ? b.room_id === col.id
    : b.staff_ids.includes(col.id))

function open(b) {
    fetch(route('admin.calendar.panel', b.id)).then((r) => r.json()).then((j) => { sel.value = j })
}
function close() { sel.value = null }

// ---- panel actions ----
function act(action) {
    router.post(route('admin.bookings.status', sel.value.id), { action }, {
        preserveScroll: true,
        onSuccess: () => { close(); navigate() },
    })
}
function checkout() {
    const tip = tipMode.value === 'p10' ? Math.round(sel.value.total * 0.1)
        : tipMode.value === 'p5' ? Math.round(sel.value.total * 0.05)
        : tipMode.value === 'custom' ? customTip.value : 0
    router.post(route('admin.bookings.checkout', sel.value.id), { tip, tip_mode: tipMode.value }, {
        preserveScroll: true,
        onSuccess: () => { close(); navigate() },
    })
}
const tipMode = ref('p10')
const customTip = ref(0)

const fmt = (m, c) => (c === 'IDR' ? 'Rp ' + Math.abs(m).toLocaleString('id-ID') : '$' + (Math.abs(m) / 100).toFixed(2))

// drag to reschedule
const dragging = ref(null)
function dragStart(b, e) {
    if (!['confirmed', 'held', 'checked_in'].includes(b.status)) return
    dragging.value = { booking: b, grabOffsetMin: 0 }
}
function dragEnd(col, e) {
    if (!dragging.value) return
    const rect = e.currentTarget.getBoundingClientRect()
    const minutes = ((e.clientY - rect.top) / PXH) * 60
    const totalMin = startHour * 60 + minutes
    const hh = String(Math.floor(totalMin / 60)).padStart(2, '0')
    const mm = String(Math.round(totalMin % 60 / 15) * 15).padStart(2, '0')
    const start = `${day.value} ${hh}:${mm === '60' ? '45' : mm}`
    const b = dragging.value.booking
    const staffIds = group.value === 'therapists' ? [col.id] : undefined
    const roomId = group.value === 'rooms' ? col.id : undefined
    dragging.value = null
    router.post(route('admin.bookings.move', b.id), { start, staff_ids: staffIds, room_id: roomId }, {
        preserveScroll: true,
        onError: (errs) => alert(errs.message ?? 'Cannot move this booking.'),
        onSuccess: () => navigate(),
    })
}
</script>

<template>
    <AdminLayout>
        <div class="calwrap" :class="{ noside: !sel }">
            <div class="cal-main">
                <div class="ctop">
                    <h1>Calendar</h1>
                    <button class="trigger inline" aria-haspopup="listbox"><Icon sm name="map-pin" />{{ location.name }}<Icon sm name="chevron-down" /></button>
                    <span class="date">
                        <button class="ib" aria-label="Previous day" @click="shiftDate(-1)"><Icon sm name="chevron-left" /></button>
                        <b>{{ dateLabel() }}</b>
                        <button class="ib" aria-label="Next day" @click="shiftDate(1)"><Icon sm name="chevron-right" /></button>
                    </span>
                    <button class="btn sm" @click="today">Today</button>
                    <div class="r">
                        <div class="seg" role="group" aria-label="Group by">
                            <button :aria-pressed="String(group === 'therapists')" @click="group = 'therapists'; navigate()">Therapists</button>
                            <button :aria-pressed="String(group === 'rooms')" @click="group = 'rooms'; navigate()">Rooms</button>
                        </div>
                        <button class="btn primary" @click="router.get(route('admin.bookings'))"><Icon sm name="plus" />New booking</button>
                    </div>
                </div>
                <div class="legend">
                    <span><i style="background:var(--c-conf-bg);border-color:var(--c-conf-bd)"></i>Confirmed</span>
                    <span><i style="background:var(--c-in-bg);border-color:var(--c-in-bd)"></i>Checked in</span>
                    <span><i style="background:var(--c-svc-bg);border-color:var(--c-svc-bd)"></i>In service</span>
                    <span><i style="background:var(--c-done-bg);border-color:var(--c-done-bd)"></i>Completed</span>
                    <span><i style="background:var(--c-dep-bg);border-color:var(--c-dep-bd)"></i>Deposit pending</span>
                    <span><i style="background:var(--c-ns-bg);border-color:var(--c-ns-bd)"></i>No-show</span>
                    <span><Icon xs name="file-warning" />Form missing</span>
                    <span><Icon xs name="ticket" />Package</span>
                    <span><Icon xs name="link-2" />Linked couples booking</span>
                </div>
                <div class="grid-scroll">
                    <div class="cgrid" :style="{ minWidth: 56 + columns.length * 132 + 'px', gridTemplateColumns: `56px repeat(${columns.length}, minmax(132px, 1fr))` }">
                        <div class="corner" />
                        <div v-for="col in columns" :key="col.id" class="chead">
                            <template v-if="group === 'therapists'">
                                <span class="av sm" :class="'av-' + col.hue" aria-hidden="true">{{ col.initials }}</span>
                                <span class="t2"><b>{{ col.name }}</b>
                                    <span class="load">{{ col.specialty ?? (col.level[0].toUpperCase() + col.level.slice(1)) }} · {{ hoursLabel(col.booked_minutes) }}</span></span>
                            </template>
                            <template v-else>
                                <span class="av sm" style="background:var(--hover);color:var(--text-2)"><Icon xs name="door-closed" /></span>
                                <span class="t2"><b>{{ col.name }}</b><span class="load">{{ col.room_type }} · cap {{ col.capacity }}</span></span>
                            </template>
                        </div>

                        <div class="times" :style="{ height: colH + 'px' }">
                            <span v-for="t in timeMarks" :key="t.label" :style="{ top: t.top + 'px' }">{{ t.label }}</span>
                        </div>
                        <div v-for="col in columns" :key="'c' + col.id" class="col" :style="{ height: colH + 'px' }"
                            @dragover.prevent
                            @drop.prevent="dragEnd(col, $event)">
                            <div v-if="group === 'therapists' && col.shift_start" class="off" :style="{ top: 0, height: top(day + 'T' + col.shift_start) + 'px' }" :title="`Shift starts ${col.shift_start}`" />
                            <template v-for="b in bookingsFor(col)" :key="b.id">
                                <div v-if="group === 'therapists' || b.room_id === col.id" class="bk" :class="[b.status === 'held' ? 'dep' : b.status === 'confirmed' ? 'conf' : b.status === 'checked_in' ? 'in' : b.status === 'in_service' ? 'inserv' : b.status === 'no_show' ? 'ns' : 'done', { sel: sel?.id === b.id }]"
                                    :style="{ top: top(b.start) + 'px', height: height(b.start, b.end) + 'px' }"
                                    :title="b.status_label" draggable="true" @dragstart="dragStart(b, $event)" @click="open(b)">
                                    <span v-if="b.form_missing" class="flag" title="Consent form missing" style="color:var(--warn)"><Icon name="file-warning" /></span>
                                    <span v-else-if="b.walk_in" class="flag" title="Walk-in" style="color:var(--text-3)"><Icon name="footprints" /></span>
                                    <span v-else-if="b.package" class="flag" title="Package session" style="color:var(--gold-text)"><Icon name="ticket" /></span>
                                    <b>{{ b.client }}</b>
                                    <span class="s">{{ b.service }} {{ b.duration }}</span>
                                    <span class="m"><Icon xs :name="b.status === 'held' ? 'hourglass' : b.status === 'in_service' ? 'sparkles' : b.status === 'no_show' ? 'user-x' : b.status === 'checked_in' ? 'door-open' : 'check'" />{{ rangeLabel(b.start, b.end) }}<span class="sr">, {{ b.status_label }}</span></span>
                                    <span v-if="b.couples && group === 'therapists'" class="link"><Icon xs name="link-2" />with {{ b.staff_names.filter(n => n !== col.name).join(', ') }}</span>
                                    <span class="m"><Icon xs name="door-closed" />{{ b.room }}</span>
                                </div>
                            </template>
                            <div v-if="new Date().toISOString().slice(0, 10) === day.value" class="now" :style="{ top: nowTop + 'px' }" />
                            <div v-if="new Date().toISOString().slice(0, 10) === day.value" class="nowlab" :style="{ top: nowTop + 'px' }">{{ nowLabel }}</div>
                        </div>
                    </div>
                </div>
            </div>

            <aside v-if="sel" class="panel" aria-label="Booking details">
                <div class="panel-h">
                    <div class="top2">
                        <span class="badge" :class="{ ok: ['confirmed','checked_in'].includes(sel.status), bad: sel.status === 'no_show' }">
                            <Icon :name="sel.status === 'in_service' ? 'sparkles' : sel.status === 'held' ? 'hourglass' : 'check'" />{{ sel.status_label }}
                        </span>
                        <span class="muted small">{{ sel.code }} · booked {{ sel.online ? 'online' : sel.source === 'walk_in' ? 'walk-in' : 'phone' }} {{ sel.booked_at }}</span>
                        <button class="ib x" aria-label="Close" @click="close"><Icon name="x" /></button>
                    </div>
                    <h2>{{ sel.service }}</h2>
                    <span class="muted small">{{ sel.when }}–{{ sel.ends_at }}<template v-if="sel.ends_in_min"> · ends in {{ sel.ends_in_min }} min</template></span>
                </div>
                <div class="psec">
                    <h3>Guests</h3>
                    <div v-for="(g, i) in sel.guests" :key="i" class="guest">
                        <span class="av" :class="'av-' + ((i % 7) + 1)" aria-hidden="true">{{ g.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() }}</span>
                        <span class="t2"><b>{{ g.name }}</b><small v-if="g.prefs">{{ g.prefs }}</small></span>
                        <span v-if="g.form_signed !== null" class="badge" :class="g.form_signed ? 'ok' : 'warn'">
                            <Icon :name="g.form_signed ? 'file-check' : 'file-warning'" />{{ g.form_signed ? 'Form signed' : 'Form missing' }}
                        </span>
                    </div>
                </div>
                <div class="psec">
                    <h3>Resources</h3>
                    <div class="res">
                        <div><small>ROOM</small><b>{{ sel.room.name }}</b><span class="muted small">{{ sel.room.type }}</span></div>
                        <div><small>THERAPISTS</small><b>{{ sel.therapists.map(t => t.name).join(' · ') }}</b><span class="muted small">{{ sel.therapists.map(t => t.level).join(', ') }}</span></div>
                    </div>
                    <div v-if="sel.moves_resources" class="note brand"><Icon sm name="info" /><span>Moving this booking also moves both therapists. Lulur checks the suite and both schedules before saving.</span></div>
                </div>
                <div class="psec money">
                    <h3>Payment</h3>
                    <div v-for="(l, i) in sel.lines" :key="i" class="row">
                        <span>{{ l.label }}</span>
                        <span :class="{ credit: l.credit }"><Money :amount="l.credit ? l.amount : l.amount" :currency="sel.currency" /></span>
                    </div>
                    <div class="row tot"><span style="color:var(--text)">Balance due</span><span><Money :amount="sel.balance_due" :currency="sel.currency" /></span></div>
                </div>
                <div class="psec">
                    <h3>Tip for {{ sel.tip_staff }}</h3>
                    <div class="tips" role="group" aria-label="Tip">
                        <button :aria-pressed="String(tipMode === 'none')" @click="tipMode = 'none'">None</button>
                        <button :aria-pressed="String(tipMode === 'p5')" @click="tipMode = 'p5'">5%</button>
                        <button :aria-pressed="String(tipMode === 'p10')" @click="tipMode = 'p10'">10%</button>
                        <button :aria-pressed="String(tipMode === 'custom')" @click="tipMode = 'custom'">Custom</button>
                    </div>
                    <input v-if="tipMode === 'custom'" v-model.number="customTip" type="number" class="input" style="height:34px" placeholder="Tip amount">
                    <span class="muted small">Split equally · editable at checkout</span>
                </div>
                <div class="pact">
                    <button v-if="sel.status === 'held'" class="btn primary" @click="act('confirm')"><Icon sm name="check" />Confirm (deposit received)</button>
                    <button v-else-if="sel.status === 'confirmed'" class="btn primary" @click="act('check_in')"><Icon sm name="door-open" />Check in</button>
                    <button v-else-if="sel.status === 'checked_in'" class="btn primary" @click="act('start')"><Icon sm name="sparkles" />Start service</button>
                    <button v-else-if="sel.status === 'in_service'" class="btn primary" @click="checkout()"><Icon sm name="receipt" />Checkout · <Money :amount="sel.balance_due + (tipMode === 'p10' ? Math.round(sel.total * .1) : tipMode === 'p5' ? Math.round(sel.total * .05) : tipMode === 'custom' ? customTip : 0)" :currency="sel.currency" /></button>
                    <button v-else-if="sel.status === 'no_show' && ['owner','manager'].includes(page.props.auth.role)" class="btn primary" @click="router.post(route('admin.bookings.noshowfee', sel.id), {}, { onSuccess: () => navigate() })"><Icon sm name="hand-coins" />Charge no-show fee</button>
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
                        <button class="btn" @click="act('no_show')" v-if="['confirmed','checked_in'].includes(sel.status)"><Icon sm name="user-x" />No-show</button>
                        <button class="btn" @click="router.get(route('admin.bookings'))"><Icon sm name="calendar-clock" />Reschedule</button>
                    </div>
                </div>
            </aside>
        </div>
    </AdminLayout>
</template>

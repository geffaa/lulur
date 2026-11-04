<script setup>
import { computed, ref, watch } from 'vue'
import { router } from '@inertiajs/vue3'
import BookingLayout from '@/Layouts/BookingLayout.vue'
import Icon from '@/Components/Icon.vue'
import Money from '@/Components/Money.vue'

const props = defineProps({ tenant: Object, location: Object, today: String })
const flow = JSON.parse(sessionStorage.getItem('lulur.flow') || 'null')

const todayStr = props.today
const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const therapistMode = ref('any') // any | per | gender
const gender = ref(null)
const days = ref([])
const activeDate = ref(todayStr)
const slots = ref({ morning: [], afternoon: [], evening: [] })
const chosen = ref(null)
const loading = ref(false)
const dayOpen = ref(true)

// 14-day strip with availability dots
async function loadSummary() {
    const q = new URLSearchParams({ service_variant: flow.variant_id, from: todayStr })
    if (gender.value) q.set('gender', gender.value)
    const res = await fetch(`/availability/summary?${q}`)
    const json = await res.json()
    days.value = json.days.map((d) => {
        const date = new Date(d.date + 'T00:00:00')
        return {
            date: d.date,
            dow: dayNames[date.getDay()],
            num: date.getDate(),
            level: d.count === 0 ? 'none' : d.count <= 4 ? 'low' : '',
            disabled: d.count === 0,
        }
    })
    if (!days.value.some((d) => d.date === activeDate.value && !d.disabled)) {
        const firstOpen = days.value.find((d) => !d.disabled)
        if (firstOpen) activeDate.value = firstOpen.date
    }
}
async function loadSlots() {
    loading.value = true
    const q = new URLSearchParams({ service_variant: flow.variant_id, date: activeDate.value })
    if (gender.value) q.set('gender', gender.value)
    const res = await fetch(`/availability?${q}`)
    const json = await res.json()
    slots.value = json.slots
    dayOpen.value = json.open
    chosen.value = null
    loading.value = false
}
watch(activeDate, loadSlots)
watch(gender, () => { loadSummary(); loadSlots() })
loadSummary()
loadSlots()

const activeDateFormatted = computed(() => {
    if (!chosen.value) return 'Pick a time'
    const d = new Date(activeDate.value + 'T00:00:00')
    return `${d.toLocaleDateString('en-US', { weekday: 'short' })} ${d.getDate()} ${d.toLocaleDateString('en-US', { month: 'short' })} · ${chosen.value}`
})
const monthLabel = computed(() => {
    const d = new Date(activeDate.value + 'T00:00:00')
    return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
})
const partLabels = { morning: ['sunrise', 'Morning'], afternoon: ['sun', 'Afternoon'], evening: ['sunset', 'Evening'] }

const hold = ref(null)
const holding = ref(false)
async function continueToCheckout() {
    if (!chosen.value) return
    holding.value = true
    const body = {
        service_variant: flow.variant_id,
        addons: flow.addon_ids,
        date: activeDate.value,
        start: chosen.value,
        previous: hold.value?.code,
    }
    if (gender.value) body.gender = gender.value
    const res = await fetch('/holds', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': document.querySelector('meta[name=csrf-token]')?.content ?? '' },
        body: JSON.stringify(body),
    })
    holding.value = false
    if (res.status === 409) {
        const j = await res.json()
        alert(j.message)
        loadSlots()
        return
    }
    const json = await res.json()
    hold.value = json
    sessionStorage.setItem('lulur.hold', JSON.stringify({ code: json.code, date: activeDate.value, start: chosen.value }))
    router.get(json.redirect)
}

// price recap from flow
const total = flow?.total ?? 0
const depositDue = computed(() => Math.round((total * (props.tenant.deposit_percent ?? 30)) / 100))
const sel = { name: flow?.service?.name, duration: flow?.duration, photo: flow?.service?.photo, guests: flow?.guests }
</script>

<template>
    <BookingLayout :step="2" :brand="tenant" :location="location">
        <div>
            <h1>When would you like to come?</h1>
            <p class="lead">{{ sel.name }} · {{ sel.duration }} min · {{ sel.guests > 1 ? '2 guests' : '1 guest' }}</p>

            <section class="tblk">
                <h2>Therapists</h2>
                <div class="ther" role="radiogroup" aria-label="Therapists">
                    <div class="opt" role="radio" :aria-checked="String(therapistMode === 'any')" @click="therapistMode = 'any'; gender = null">
                        <span class="rdo" aria-hidden="true"><span class="o" /></span>
                        <span class="av sm" style="background:var(--brand-soft);color:var(--brand-strong)"><Icon xs name="sparkles" /></span>
                        <span class="t"><b>Any two therapists</b><small>Most available times</small></span>
                    </div>
                    <div class="opt" role="radio" :aria-checked="String(therapistMode === 'per')" @click="therapistMode = 'per'">
                        <span class="rdo" aria-hidden="true"><span class="o" /></span>
                        <span class="av sm av-6" aria-hidden="true">MA</span>
                        <span class="t"><b>Choose per guest</b><small>Meet the team on the next screen</small></span>
                    </div>
                    <div class="opt" role="radio" :aria-checked="String(therapistMode === 'gender')" @click="therapistMode = 'gender'">
                        <span class="rdo" aria-hidden="true"><span class="o" /></span>
                        <span class="av sm" style="background:var(--hover);color:var(--text-2)"><Icon xs name="users" /></span>
                        <span class="t"><b>Gender preference</b><small>Female or male therapists</small></span>
                    </div>
                </div>
                <div v-if="therapistMode === 'gender'" class="seg" role="group" aria-label="Gender" style="margin-top:10px">
                    <button :aria-pressed="String(gender === 'female')" @click="gender = gender === 'female' ? null : 'female'">Female</button>
                    <button :aria-pressed="String(gender === 'male')" @click="gender = gender === 'male' ? null : 'male'">Male</button>
                </div>
            </section>

            <section class="tblk">
                <h2>{{ monthLabel }}
                    <span style="margin-left:auto;display:flex;gap:2px">
                        <button class="ib" aria-label="Previous week" @click="loadSummary"><Icon sm name="chevron-left" /></button>
                        <button class="ib" aria-label="Next week" @click="loadSummary"><Icon sm name="chevron-right" /></button>
                    </span>
                </h2>
                <div class="days" role="radiogroup" aria-label="Day">
                    <span v-for="d in days" :key="d.date" class="day" role="radio"
                        :aria-checked="String(activeDate === d.date)" :aria-disabled="String(d.disabled)"
                        @click="!d.disabled && (activeDate = d.date)">
                        {{ d.dow }}<b>{{ d.num }}</b><i :class="d.level" />
                    </span>
                </div>
            </section>

            <section class="tblk slots">
                <template v-for="(list, part) in slots" :key="part">
                    <div v-if="list.length">
                        <h3><Icon sm :name="partLabels[part][0]" />{{ partLabels[part][1] }}</h3>
                        <div class="sg" role="radiogroup" :aria-label="partLabels[part][1]">
                            <button v-for="t in list" :key="t" class="sl" role="radio"
                                :aria-checked="String(chosen === t)" @click="chosen = t">{{ t }}</button>
                        </div>
                    </div>
                </template>
                <p v-if="loading" class="why"><Icon sm name="info" /><span>Finding times when the room and therapist are both free…</span></p>
                <p v-else-if="!dayOpen" class="why"><Icon sm name="info" /><span>We're closed that day — pick another date.</span></p>
                <p v-else-if="!slots.morning.length && !slots.afternoon.length && !slots.evening.length" class="why">
                    <Icon sm name="info" /><span>Fully booked that day. Join the waitlist by messaging us — cancellations open up slots.</span>
                </p>
                <p class="why"><Icon sm name="info" /><span>
                    Only times when a suitable room and {{ sel.guests > 1 ? 'two therapists' : 'a therapist' }} are free for the full
                    {{ sel.duration }} minutes are shown.</span></p>
            </section>
        </div>

        <template #aside>
          <aside class="summary card" aria-label="Your booking">
              <h2>Your booking</h2>
              <div class="it">
                  <img :src="sel.photo" alt="">
                  <span class="t2"><b>{{ sel.name }} · {{ sel.duration }} min</b><small>{{ sel.guests > 1 ? '2 guests' : '1 guest' }}</small></span>
              </div>
              <div class="row"><span>When</span><span>{{ activeDateFormatted }}</span></div>
              <div class="row tot"><span style="color:var(--text)">Total</span><span><Money :amount="total" :currency="tenant.currency" /></span></div>
              <div v-if="depositDue" class="dep">
                  <span>Pay now ({{ tenant.deposit_percent }}% deposit)</span>
                  <b><Money :amount="depositDue" :currency="tenant.currency" /></b>
                  <span class="muted small">Balance <Money :amount="total - depositDue" :currency="tenant.currency" /> at the spa · free cancellation until 24 h before</span>
              </div>
              <button class="btn primary block" :disabled="!chosen || holding" @click="continueToCheckout">Continue</button>
          </aside>
        </template>

        <template #mbar>
          <div class="mbar">
              <span class="t"><b><Money :amount="total" :currency="tenant.currency" /></b><small v-if="depositDue">Deposit <Money :amount="depositDue" :currency="tenant.currency" /> today</small></span>
              <button class="btn primary" :disabled="!chosen || holding" @click="continueToCheckout">Continue</button>
          </div>
        </template>
    </BookingLayout>
</template>

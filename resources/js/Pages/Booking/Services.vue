<script setup>
import { computed, ref, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { router } from '@inertiajs/vue3'
import BookingLayout from '@/Layouts/BookingLayout.vue'
import Icon from '@/Components/Icon.vue'
import Money from '@/Components/Money.vue'

const props = defineProps({
    tenant: Object,
    services: Array,
    location: Object,
})

const cat = ref('all')
const forTwo = ref(false)
// party size decides which treatments exist: a couples ritual cannot be booked for one
const inParty = computed(() => props.services.filter((s) => (forTwo.value ? s.for_two : !s.for_two)))
const cats = computed(() => {
    const set = [...new Set(inParty.value.map((s) => s.category).filter(Boolean))]
    return [{ value: 'all', label: 'All' }, ...set.map((c) => ({ value: c, label: c }))]
})
const visible = computed(() => inParty.value.filter((s) => cat.value === 'all' || s.category === cat.value))
watch(forTwo, () => { cat.value = 'all'; selected.value = null; variant.value = null; addons.value = [] })

// category row: one scrollable line; fade the right edge while more chips are off-screen
const catsEl = ref(null)
const moreRight = ref(false)
function measure() {
    const el = catsEl.value
    moreRight.value = !!el && el.scrollWidth - el.clientWidth - el.scrollLeft > 4
}
function pickCat(v, e) {
    cat.value = v
    e?.currentTarget?.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' })
}
onMounted(() => { measure(); window.addEventListener('resize', measure) })
onBeforeUnmount(() => window.removeEventListener('resize', measure))
watch(cats, () => nextTick(measure))

// flow state: service, variant, addons, guests
const selected = ref(null) // service object
const variant = ref(null)
const addons = ref([])
const guests = computed(() => (selected.value?.for_two ? 2 : 1))

function pick(service) {
    selected.value = service
    variant.value = service.variants[0]
    addons.value = []
}
function toggleAddon(a) {
    const i = addons.value.findIndex((x) => x.id === a.id)
    i >= 0 ? addons.value.splice(i, 1) : addons.value.push(a)
}
const addonTotal = computed(() => addons.value.reduce((n, a) => n + a.price, 0))
const linePrice = computed(() => {
    if (!selected.value || !variant.value) return 0
    const base = selected.value.price_basis === 'per_booking' ? variant.value.price : variant.value.price * guests.value
    return base + addonTotal.value
})
const depositDue = computed(() => Math.round((linePrice.value * (props.tenant.deposit_percent ?? 30)) / 100))
const canContinue = computed(() => selected.value && variant.value)

function continueToTime() {
    sessionStorage.setItem('lulur.flow', JSON.stringify({
        service: { name: selected.value.name, photo: selected.value.photo },
        variant_id: variant.value.id,
        duration: variant.value.duration,
        addon_ids: addons.value.map((a) => a.id),
        guests: guests.value,
        for_two: selected.value.for_two,
        total: linePrice.value,
    }))
    router.get('/time')
}
</script>

<template>
    <BookingLayout :step="1" :brand="tenant" :location="location">
        <div>
            <div v-if="tenant.hero" class="hero">
                <img :src="tenant.hero" alt="Treatment room with a massage bed and soft curtains">
                <div class="tx">
                    <h1>{{ tenant.tagline }}</h1>
                    <div class="m">
                        <span v-if="tenant.rating" class="stars"><Icon xs name="star" /></span>
                        <span v-if="tenant.rating"><b>{{ tenant.rating }}</b> · {{ tenant.reviews }} reviews</span>
                        <span v-if="tenant.open_today"><Icon xs name="clock" />Open today {{ tenant.open_today }}</span>
                        <span v-if="tenant.address"><Icon xs name="map-pin" />{{ tenant.address }}</span>
                    </div>
                </div>
            </div>

            <h1 style="font-size:24px">Choose a treatment</h1>
            <div class="party" role="group" aria-label="Who is coming?">
                <button type="button" :aria-pressed="String(!forTwo)" @click="forTwo = false"><Icon sm name="user-round" />Just me</button>
                <button type="button" :aria-pressed="String(forTwo)" @click="forTwo = true"><Icon sm name="users" />For two</button>
            </div>
            <div v-if="cats.length > 2" class="catbar">
                <div ref="catsEl" class="cats" :class="{ fade: moreRight }" role="radiogroup" aria-label="Category" @scroll.passive="measure">
                    <button v-for="c in cats" :key="c.value" type="button" class="chip" role="radio"
                        :aria-checked="String(cat === c.value)" @click="pickCat(c.value, $event)">{{ c.label }}</button>
                </div>
            </div>

            <article v-for="s in visible" :key="s.id" class="svc card" :class="{ sel: selected?.id === s.id }">
                <img :src="s.photo" alt="">
                <div>
                    <div class="top2">
                        <h2 class="sn">{{ s.name }}</h2>
                        <span v-if="s.for_two" class="badge brand"><Icon xs name="users" />For 2</span>
                        <span v-if="s.badge === 'signature'" class="badge gold"><Icon xs name="star" />Signature</span>
                    </div>
                    <p>{{ s.description }}</p>
                    <div class="row" role="radiogroup" :aria-label="`${s.name} duration`">
                        <span v-for="v in s.variants" :key="v.id" class="chip" role="radio"
                            :aria-checked="String(selected?.id === s.id && variant?.id === v.id)"
                            @click="pick(s); variant = v">{{ v.duration }} min</span>
                        <span class="r">
                            <span class="price">
                                <template v-if="s.price_basis === 'per_booking'">
                                    <Money :amount="selected?.id === s.id ? variant.price : s.variants[0].price" :currency="tenant.currency" /> for two
                                </template>
                                <Money v-else :amount="selected?.id === s.id ? variant.price : s.variants[0].price" :currency="tenant.currency" />
                            </span>
                            <span v-if="selected?.id === s.id" class="badge ok"><Icon name="check" />Added</span>
                            <button v-else class="btn sm" @click="pick(s)"><Icon xs name="plus" />Add</button>
                        </span>
                    </div>
                    <div v-if="selected?.id === s.id && s.addons.length" class="addons">
                        <span class="muted small strong">Add-ons for this booking</span>
                        <span v-for="a in s.addons" :key="a.id" class="a">
                            <span class="cbx" role="checkbox" :aria-checked="String(addons.some(x => x.id === a.id))"
                                @click="toggleAddon(a)">
                                <span class="box"><Icon v-if="addons.some(x => x.id === a.id)" name="check" /></span>
                                {{ a.name }}<template v-if="a.duration">, {{ a.duration }} min</template>
                            </span>
                            <span class="p num">+<Money :amount="a.price" :currency="tenant.currency" /></span>
                        </span>
                    </div>
                </div>
            </article>

            <p class="synthetic">Fictional spa and synthetic data · photos: see IMAGES.md</p>
        </div>

        <template #aside>
          <aside v-if="canContinue" class="summary card" aria-label="Your booking">
              <h2>Your booking</h2>
              <div class="it">
                  <img :src="selected.photo" alt="">
                  <span class="t2"><b>{{ selected.name }} · {{ variant.duration }} min</b>
                      <small>{{ guests > 1 ? '2 guests' : '1 guest' }}{{ selected.for_two ? ' · Couples suite' : '' }}</small></span>
              </div>
              <div class="row"><span>{{ selected.name }}{{ guests > 1 ? ` × ${guests}` : '' }}</span><span><Money :amount="linePrice - addonTotal" :currency="tenant.currency" /></span></div>
              <div v-if="addonTotal" class="row"><span>Add-ons</span><span><Money :amount="addonTotal" :currency="tenant.currency" /></span></div>
              <div class="row tot"><span style="color:var(--text)">Total</span><span><Money :amount="linePrice" :currency="tenant.currency" /></span></div>
              <div v-if="depositDue" class="dep">
                  <span>Pay now ({{ tenant.deposit_percent }}% deposit)</span>
                  <b><Money :amount="depositDue" :currency="tenant.currency" /></b>
                  <span class="muted small">Balance <Money :amount="linePrice - depositDue" :currency="tenant.currency" /> at the spa · free cancellation until 24 h before</span>
              </div>
              <button class="btn primary block" @click="continueToTime">Choose a time</button>
          </aside>
        </template>

        <template #mbar>
          <div v-if="canContinue" class="mbar">
              <span class="t"><b><Money :amount="linePrice" :currency="tenant.currency" /></b>
                  <small v-if="depositDue">Deposit <Money :amount="depositDue" :currency="tenant.currency" /> today</small></span>
              <button class="btn primary" @click="continueToTime">Choose a time</button>
          </div>
        </template>
    </BookingLayout>
</template>

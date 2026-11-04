<script setup>
import { ref } from 'vue'
import { router } from '@inertiajs/vue3'
import AdminLayout from '@/Layouts/AdminLayout.vue'
import IconSprite from '@/Components/IconSprite.vue'
import Icon from '@/Components/Icon.vue'
import Pick from '@/Components/Pick.vue'
import DatePick from '@/Components/DatePick.vue'

const props = defineProps({
    range: Object, kpi: Object, utilisation: Array, heatmap: Array,
    revenue_by_service: Array, tips: Array, no_shows: Array, currency: String,
})
const from = ref(props.range.from)
const to = ref(props.range.to)
function apply() { router.get(route('admin.reports'), { from: from.value, to: to.value }, { preserveState: true }) }

const fmt = (m) => (props.currency === 'IDR' ? 'Rp ' + m.toLocaleString('id-ID') : '$' + (m / 100).toFixed(2))
const hours = (min) => `${Math.floor(min / 60)} h ${String(min % 60).padStart(2, '0')}`
const heatColor = (n) => ['', 'var(--brand-tint)', 'var(--brand-soft)', 'color-mix(in srgb, var(--brand-soft) 55%, var(--brand-light))', 'var(--brand-light)', 'var(--brand-mid)'][Math.min(n, 5)]
const hoursRange = Array.from({ length: 12 }, (_, i) => 9 + i)
const maxRevenue = Math.max(1, ...props.revenue_by_service.map((r) => r.revenue))
</script>

<template>
    <AdminLayout>
        <IconSprite />
        <div class="content">
            <div class="ph">
                <div><h1>Reports</h1><p>Utilisation, revenue, no-shows and tips — computed from real bookings.</p></div>
                <div class="acts">
                    <div style="width:190px"><DatePick v-model="from" label="From" /></div>
                    <div style="width:190px"><DatePick v-model="to" label="To" /></div>
                    <button class="btn sm" @click="apply">Apply</button>
                    <button class="btn"><Icon sm name="download" />Export</button>
                </div>
            </div>

            <div class="kpis">
                <div class="card kpi"><span class="l">Revenue</span><span class="v">{{ fmt(kpi.revenue) }}</span><span class="d">deposits + balances + tips</span></div>
                <div class="card kpi"><span class="l">Completed visits</span><span class="v">{{ kpi.completed }}</span><span class="d">in the selected range</span></div>
                <div class="card kpi"><span class="l">No-show rate</span><span class="v">{{ kpi.no_show_rate }}%</span><span class="d">{{ kpi.no_shows }} no-shows</span></div>
                <div class="card kpi"><span class="l">Rebooking</span><span class="v">{{ kpi.rebooking_rate }}%</span><span class="d">returned within 90 days</span></div>
            </div>

            <div class="rp-grid">
                <section class="card">
                    <div class="card-h"><h2>Therapist utilisation</h2><span class="muted small" style="margin-left:auto">booked vs shift minutes</span></div>
                    <div class="card-b" style="display:grid;gap:12px">
                        <div v-for="u in utilisation" :key="u.id" style="display:grid;gap:4px">
                            <div style="display:flex;align-items:center;gap:8px;font-size:13px">
                                <b>{{ u.name }}</b>
                                <span class="muted small">{{ u.specialty ?? u.level }}</span>
                                <span class="muted small num" style="margin-left:auto">{{ hours(u.booked_min) }} / {{ hours(u.shift_min) }}</span>
                            </div>
                            <div class="bar-outer"><div class="bar-fill" :style="{ width: (u.shift_min ? Math.min(100, Math.round(u.booked_min / u.shift_min * 100)) : 0) + '%' }" /></div>
                        </div>
                    </div>
                </section>

                <section class="card">
                    <div class="card-h"><h2>Rooms by hour</h2><span class="muted small" style="margin-left:auto">deeper rosewood = busier</span></div>
                    <div class="card-b" style="overflow-x:auto">
                        <table class="heat">
                            <thead><tr><th>Room</th><th v-for="h in hoursRange" :key="h">{{ h }}</th></tr></thead>
                            <tbody>
                                <tr v-for="r in heatmap" :key="r.id">
                                    <td class="strong">{{ r.name }}</td>
                                    <td v-for="h in hoursRange" :key="h" :style="{ background: heatColor(r.cells[h - 9]) }" :title="`${r.name} ${h}:00 — ${r.cells[h - 9]} bookings`">{{ r.cells[h - 9] || '' }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <section class="card">
                    <div class="card-h"><h2>Revenue by service</h2></div>
                    <div class="card-b" style="display:grid;gap:10px">
                        <div v-for="r in revenue_by_service" :key="r.service" style="display:grid;gap:4px">
                            <div style="display:flex;font-size:13px;gap:8px">
                                <b>{{ r.service }}</b><span class="muted small num">{{ r.bookings }}×</span>
                                <span class="num" style="margin-left:auto">{{ fmt(r.revenue) }}</span>
                            </div>
                            <div class="bar-outer"><div class="bar-fill" :style="{ width: Math.round(r.revenue / maxRevenue * 100) + '%' }" /></div>
                        </div>
                        <p v-if="!revenue_by_service.length" class="muted small">No completed bookings in this range.</p>
                    </div>
                </section>

                <section class="card">
                    <div class="card-h"><h2>Tips per therapist</h2></div>
                    <div class="tablewrap">
                        <table class="t">
                            <thead><tr><th>Therapist</th><th class="n">Tips</th><th class="n">Amount</th></tr></thead>
                            <tbody>
                                <tr v-for="t in tips" :key="t.staff"><td>{{ t.staff }}</td><td class="n">{{ t.count }}</td><td class="n">{{ fmt(t.amount) }}</td></tr>
                                <tr v-if="!tips.length"><td colspan="3" class="muted" style="text-align:center;padding:16px">No tips in this range.</td></tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <section class="card">
                    <div class="card-h"><h2>Recent no-shows</h2><span class="muted small" style="margin-left:auto"><Icon xs name="lightbulb" />fees are manager-only and audited</span></div>
                    <div class="tablewrap">
                        <table class="t">
                            <thead><tr><th>Client</th><th>Service</th><th>When</th><th class="n">Fee charged</th></tr></thead>
                            <tbody>
                                <tr v-for="(n, i) in no_shows" :key="i">
                                    <td>{{ n.client }}</td><td>{{ n.service }}</td><td>{{ n.when }}</td>
                                    <td class="n">{{ n.fee ? fmt(n.fee) : '—' }}</td>
                                </tr>
                                <tr v-if="!no_shows.length"><td colspan="4" class="muted" style="text-align:center;padding:16px">No no-shows in this range.</td></tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    </AdminLayout>
</template>

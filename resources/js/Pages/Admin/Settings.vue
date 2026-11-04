<script setup>
import { ref } from 'vue'
import { router } from '@inertiajs/vue3'
import AdminLayout from '@/Layouts/AdminLayout.vue'
import IconSprite from '@/Components/IconSprite.vue'

const props = defineProps({
    business: Object, policy: Object, locations: Array, users: Array, audit: Array, payments: Object,
})
const business = ref({ ...props.business })
const policy = ref({ ...props.policy })
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
const dayLabel = { mon: 'Mon', tue: 'Tue', wed: 'Wed', thu: 'Thu', fri: 'Fri', sat: 'Sat', sun: 'Sun' }

function saveBusiness() { router.put(route('admin.settings.business'), business.value, { preserveScroll: true }) }
function savePolicy() { router.put(route('admin.settings.policy'), policy.value, { preserveScroll: true }) }
</script>

<template>
    <AdminLayout>
        <IconSprite />
        <div class="content">
            <div class="ph"><div><h1>Settings</h1><p>Business, booking policy, locations, staff and audit trail.</p></div></div>

            <div class="st-grid">
                <div style="display:grid;gap:16px">
                    <section class="card">
                        <div class="card-h"><h2>Business</h2></div>
                        <div class="card-b" style="display:grid;gap:12px">
                            <div class="row2">
                                <div class="field"><label>Name</label><div class="input"><input v-model="business.name" style="border:0;outline:0;background:none;width:100%;font:inherit"></div></div>
                                <div class="field"><label>Plan · currency · timezone</label>
                                    <div class="input"><span class="phd">{{ business.plan }} · {{ business.currency }} · {{ business.timezone }}</span></div></div>
                            </div>
                            <div class="field"><label>Booking page tagline</label>
                                <div class="input"><input v-model="business.branding.tagline" style="border:0;outline:0;background:none;width:100%;font:inherit"></div></div>
                            <button class="btn primary" style="width:max-content" @click="saveBusiness">Save business</button>
                        </div>
                    </section>

                    <section class="card">
                        <div class="card-h"><h2>Booking policy</h2><span class="muted small" style="margin-left:auto">snapshotted into new bookings</span></div>
                        <div class="card-b" style="display:grid;gap:12px">
                            <div class="row2">
                                <div class="field"><label>Deposit</label>
                                    <div class="input"><input v-model="policy.deposit_percent" type="number" min="0" max="100" style="border:0;outline:0;background:none;width:100%;font:inherit"><span class="phd">%</span></div></div>
                                <div class="field"><label>Free cancellation window</label>
                                    <div class="input"><input v-model="policy.cancel_window_hours" type="number" min="0" max="168" style="border:0;outline:0;background:none;width:100%;font:inherit"><span class="phd">h before</span></div></div>
                            </div>
                            <div class="row2">
                                <div class="field"><label>No-show fee</label>
                                    <div class="input"><input v-model="policy.no_show_fee_percent" type="number" min="0" max="100" style="border:0;outline:0;background:none;width:100%;font:inherit"><span class="phd">% of total</span></div></div>
                                <div class="field"><label>Saved card</label>
                                    <div class="seg" role="group">
                                        <button :aria-pressed="String(policy.saved_card_mode === 'optional')" @click="policy.saved_card_mode = 'optional'">Optional</button>
                                        <button :aria-pressed="String(policy.saved_card_mode === 'required')" @click="policy.saved_card_mode = 'required'">Required</button>
                                    </div></div>
                            </div>
                            <button class="btn primary" style="width:max-content" @click="savePolicy">Save policy</button>
                        </div>
                    </section>

                    <section class="card">
                        <div class="card-h"><h2>Payments</h2></div>
                        <div class="card-b kv" style="display:grid;grid-template-columns:170px 1fr;gap:8px;font-size:13px">
                            <span class="muted">USD gateway</span><b>{{ payments.gateway_usd }}</b>
                            <span class="muted">IDR gateway</span><b>{{ payments.gateway_idr }}</b>
                            <span class="muted">Mode</span><b>{{ payments.sandbox ? 'Sandbox (simulated provider pages)' : 'Live' }}</b>
                        </div>
                    </section>
                </div>

                <div style="display:grid;gap:16px;align-content:start">
                    <section class="card">
                        <div class="card-h"><h2>Locations &amp; hours</h2></div>
                        <div class="card-b" style="display:grid;gap:14px">
                            <div v-for="l in locations" :key="l.id" style="border:1px solid var(--line);border-radius:10px;padding:14px;display:grid;gap:8px">
                                <div style="display:flex;gap:8px;align-items:center"><b>{{ l.name }}</b><span class="muted small" style="margin-left:auto">{{ l.timezone }}</span></div>
                                <div style="font-size:12px;color:var(--text-3);display:grid;gap:2px">
                                    <div v-for="d in days" :key="d" style="display:grid;grid-template-columns:36px 1fr;gap:8px">
                                        <span>{{ dayLabel[d] }}</span>
                                        <span class="num">{{ (l.opening_hours?.[d] ?? []).map(r => r.join('–')).join(', ') || 'Closed' }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section class="card">
                        <div class="card-h"><h2>Staff &amp; roles</h2></div>
                        <div class="tablewrap">
                            <table class="t">
                                <thead><tr><th>User</th><th>Role</th><th>Therapist</th><th>2FA</th></tr></thead>
                                <tbody>
                                    <tr v-for="u in users" :key="u.email">
                                        <td><span class="t2"><b>{{ u.name }}</b><small>{{ u.email }}</small></span></td>
                                        <td><span class="badge">{{ u.role.replace('_', ' ') }}</span></td>
                                        <td>{{ u.staff ?? '—' }}</td>
                                        <td><span class="badge" :class="u.twofa ? 'ok' : ''">{{ u.twofa ? 'On' : 'Off' }}</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section class="card">
                        <div class="card-h"><h2>Audit trail</h2></div>
                        <ul class="audit">
                            <li v-for="(a, i) in audit" :key="i">
                                <span class="av sm av-5" aria-hidden="true">{{ (a.who ?? 'S').slice(0, 2).toUpperCase() }}</span>
                                <span class="t2"><b>{{ a.what }}</b><small>by {{ a.who ?? 'system' }}</small></span>
                                <time>{{ a.when }}</time>
                            </li>
                            <li v-if="!audit.length" class="muted small" style="padding:8px 0">No audited events yet.</li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>

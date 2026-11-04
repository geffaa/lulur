<script setup>
import { router } from '@inertiajs/vue3'
import AdminLayout from '@/Layouts/AdminLayout.vue'
import IconSprite from '@/Components/IconSprite.vue'
import Icon from '@/Components/Icon.vue'
import Money from '@/Components/Money.vue'

const props = defineProps({
    client: Object, forms: Array, packages: Array, history: Array, currency: String,
})
const badgeClass = (s) => ({ confirmed: 'info', checked_in: 'warn', in_service: 'ok', completed: '', no_show: 'bad', held: 'brand' }[s] ?? '')
const fmtShort = (m) => props.currency === 'IDR'
    ? (m >= 1_000_000 ? 'Rp ' + (m / 1_000_000).toFixed(2).replace(/\.?0+$/, '') + ' m' : 'Rp ' + m.toLocaleString('id-ID'))
    : '$' + (m / 100).toFixed(2)
const spent = fmtShort(props.client.stats.spent)
function saveNotes(e) {
    router.put(route('admin.clients.update', props.client.id), { notes: e.target.value }, { preserveScroll: true })
}
</script>

<template>
    <AdminLayout>
        <IconSprite />
        <div class="content">
            <div class="ph">
                <div>
                    <div class="crumb"><a href="/admin/clients">Clients</a><Icon xs name="chevron-right" />{{ client.name }}</div>
                    <h1>{{ client.name }}
                        <span v-if="packages.some(p => p.left > 0)" class="badge gold"><Icon name="ticket" />Package client</span>
                    </h1>
                </div>
                <div class="acts">
                    <button class="btn"><Icon sm name="message-circle" />Message</button>
                    <button class="btn primary"><Icon sm name="plus" />New booking</button>
                </div>
            </div>
            <div class="cl">
                <div>
                    <section class="card who">
                        <div class="top2">
                            <span class="av lg" :class="'av-' + client.hue" aria-hidden="true">{{ client.initials }}</span>
                            <span class="t2"><h2>{{ client.name }}</h2><small>{{ client.phone }} · {{ client.email ?? 'no email' }}</small></span>
                        </div>
                        <div class="stats">
                            <div><b>{{ client.stats.visits }}</b><span>visits</span></div>
                            <div><b>{{ spent }}</b><span>spent</span></div>
                            <div><b>{{ client.stats.no_shows }}</b><span>no-shows</span></div>
                        </div>
                    </section>
                    <section class="card">
                        <div class="card-h"><h2>Preferences</h2></div>
                        <ul class="prefs">
                            <li v-for="(p, i) in client.prefs" :key="i" :class="{ warn: p.warn }">
                                <Icon sm :name="p.icon" /><span v-html="p.html" />
                            </li>
                            <li v-if="!client.prefs.length" class="muted small" style="padding:8px 0">No preferences recorded yet.</li>
                        </ul>
                    </section>
                    <section class="card">
                        <div class="card-h"><h2>Forms</h2></div>
                        <ul class="forms">
                            <li v-for="f in forms" :key="f.id">
                                <span class="ic"><Icon sm :name="f.valid ? 'file-check' : 'file-warning'" /></span>
                                <span class="t2"><b>{{ f.form }}</b><small>Signed {{ f.signed_at }}<template v-if="f.valid_until"> · valid until {{ f.valid_until }}</template></small></span>
                                <a class="small strong" href="#">View</a>
                            </li>
                            <li v-if="!forms.length" class="muted small" style="padding:8px 0">No signed forms yet.</li>
                        </ul>
                    </section>
                </div>
                <div>
                    <section v-for="p in packages" :key="p.id" class="card pkg">
                        <div style="display:flex;align-items:center;gap:10px">
                            <span class="badge gold"><Icon name="ticket" />Package</span>
                            <b>{{ p.name }}</b>
                            <span class="muted small" style="margin-left:auto">bought {{ p.purchased }} · valid until {{ p.expires }}</span>
                        </div>
                        <div class="bar" :aria-label="`${p.used} used, ${p.left} remaining`">
                            <template v-for="i in p.total" :key="i">
                                <i :class="i <= p.used ? 'u' : (i === p.used + 1 && p.left > 0 ? 'n' : '')" />
                            </template>
                        </div>
                        <div class="meta">
                            <span><b style="color:var(--text)">{{ p.used }} used</b> · {{ p.left }} left</span>
                            <span><Money :amount="p.per_session" :currency="p.currency" /> per session <template v-if="p.discount">({{ p.discount }}% off)</template></span>
                        </div>
                        <div v-if="p.left > 0 && p.valid" class="note brand"><Icon sm name="bell" /><span>Lulur will remind {{ client.name.split(' ')[0] }} to book the next session (every 3–4 weeks).</span></div>
                    </section>
                    <section class="card">
                        <div class="card-h">
                            <h2>History</h2>
                        </div>
                        <div class="tablewrap hist">
                            <table class="t">
                                <thead><tr><th>Date</th><th>Service</th><th>Therapist</th><th>Room</th><th>Status</th><th class="n">Detail</th></tr></thead>
                                <tbody>
                                    <tr v-for="(h, i) in history" :key="i">
                                        <td>{{ h.when }}</td>
                                        <td><span class="t2"><b>{{ h.service }}</b></span></td>
                                        <td>{{ h.staff ?? '—' }}</td>
                                        <td>{{ h.room ?? '—' }}</td>
                                        <td><span class="badge" :class="badgeClass(h.status)">{{ h.status_label }}</span></td>
                                        <td class="n">
                                            <template v-if="h.package">Package</template>
                                            <template v-else><Money :amount="h.amount" :currency="currency" /><template v-if="h.tip"> · tip <Money :amount="h.tip" :currency="currency" /></template></template>
                                        </td>
                                    </tr>
                                    <tr v-if="!history.length"><td colspan="6" class="muted" style="text-align:center;padding:24px">No visits yet.</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </section>
                    <section class="card">
                        <div class="card-h"><h2>Internal notes</h2></div>
                        <div class="card-b" style="display:grid;gap:10px">
                            <p style="font-size:14px;color:var(--text-2)">{{ client.notes || 'No notes yet.' }}</p>
                            <div class="field">
                                <label>Add an internal note (encrypted)</label>
                                <div class="input area">
                                    <textarea rows="2" placeholder="Visible to staff only…" style="border:0;outline:0;background:none;width:100%;font:inherit" @change="saveNotes" />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <p class="synthetic">Synthetic demo data.</p>
        </div>
    </AdminLayout>
</template>

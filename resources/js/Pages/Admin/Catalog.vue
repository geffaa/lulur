<script setup>
import { ref } from 'vue'
import { Link, router } from '@inertiajs/vue3'
import AdminLayout from '@/Layouts/AdminLayout.vue'
import IconSprite from '@/Components/IconSprite.vue'
import Icon from '@/Components/Icon.vue'
import Money from '@/Components/Money.vue'

const props = defineProps({ tab: String, services: Array, packages: Array, forms: Array, currency: String })
const tab = ref(props.tab)
const tabs = [
    { id: 'services', label: 'Services' },
    { id: 'packages', label: 'Packages' },
    { id: 'forms', label: 'Forms' },
]
const roomLabel = { single: 'Single room', couples: 'Couples suite', facial: 'Facial room', wet: 'Wet room', any: 'Any room' }
</script>

<template>
    <AdminLayout>
        <IconSprite />
        <div class="content">
            <div class="ph">
                <div><h1>Catalog</h1><p>What bookable services need — rooms, therapists, forms and deposit rules.</p></div>
                <div class="acts">
                    <button v-if="tab === 'services'" class="btn primary" @click="router.get(route('admin.catalog.services.create'))"><Icon sm name="plus" />New service</button>
                </div>
            </div>
            <div class="seg" role="tablist" style="margin-bottom:16px">
                <button v-for="t in tabs" :key="t.id" :aria-pressed="String(tab === t.id)" @click="tab = t.id">{{ t.label }}</button>
            </div>

            <section v-if="tab === 'services'" class="card">
                <div class="tablewrap">
                    <table class="t">
                        <thead><tr><th>Service</th><th>Category</th><th>Room</th><th class="n">Durations</th><th class="n">Prices</th><th>Form</th><th class="n">Skilled staff</th><th>Status</th></tr></thead>
                        <tbody>
                            <tr v-for="s in services" :key="s.id" style="cursor:pointer">
                                <td><Link :href="route('admin.catalog.services.edit', s.id)" class="cellp">
                                    <img v-if="s.photo" :src="s.photo" alt="" style="width:40px;height:40px;border-radius:8px;object-fit:cover">
                                    <span class="t2"><b>{{ s.name }} <span v-if="s.badge === 'signature'" class="badge gold" style="margin-left:4px"><Icon xs name="star" />Signature</span></b><small>{{ s.buffer }} min buffer</small></span>
                                </Link></td>
                                <td>{{ s.category }}</td>
                                <td>{{ roomLabel[s.room_type] }}<template v-if="s.therapists_needed > 1"> · 2 therapists</template></td>
                                <td class="n">{{ s.variants.map(v => v.duration).join(' / ') }} min</td>
                                <td class="n">{{ s.variants.map(v => (currency === 'IDR' ? 'Rp ' + v.price.toLocaleString('id-ID') : '$' + (v.price / 100).toFixed(0))).join(' / ') }}</td>
                                <td>{{ s.form ?? '—' }}</td>
                                <td class="n">{{ s.skills_count }}</td>
                                <td>
                                    <span class="badge" :class="s.bookable_online ? 'ok' : ''">
                                        <Icon xs :name="s.bookable_online ? 'globe' : 'x'" />{{ s.bookable_online ? 'Bookable online' : 'Staff only' }}
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section v-if="tab === 'packages'" class="card">
                <div class="tablewrap">
                    <table class="t">
                        <thead><tr><th>Package</th><th>Service</th><th class="n">Sessions</th><th class="n">Price</th><th class="n">Valid</th><th>Status</th></tr></thead>
                        <tbody>
                            <tr v-for="p in packages" :key="p.id">
                                <td><b>{{ p.name }}</b></td>
                                <td>{{ p.service }}</td>
                                <td class="n">{{ p.sessions }}×</td>
                                <td class="n"><Money :amount="p.price" :currency="currency" /></td>
                                <td class="n">{{ p.valid_months }} months</td>
                                <td><span class="badge" :class="p.active ? 'ok' : ''">{{ p.active ? 'Active' : 'Hidden' }}</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section v-if="tab === 'forms'" class="card">
                <div class="tablewrap">
                    <table class="t">
                        <thead><tr><th>Form</th><th>Kind</th><th class="n">Version</th><th>Published</th><th class="n">Used by</th></tr></thead>
                        <tbody>
                            <tr v-for="f in forms" :key="f.id">
                                <td><b>{{ f.name }}</b></td>
                                <td class="muted">{{ f.kind }}</td>
                                <td class="n">v{{ f.version ?? '—' }}</td>
                                <td>{{ f.published ?? '—' }}</td>
                                <td class="n">{{ f.services }} services</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    </AdminLayout>
</template>

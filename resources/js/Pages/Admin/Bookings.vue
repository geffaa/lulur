<script setup>
import { ref } from 'vue'
import { router } from '@inertiajs/vue3'
import AdminLayout from '@/Layouts/AdminLayout.vue'
import IconSprite from '@/Components/IconSprite.vue'
import Money from '@/Components/Money.vue'
import Icon from '@/Components/Icon.vue'
import Pick from '@/Components/Pick.vue'
import DatePick from '@/Components/DatePick.vue'

const props = defineProps({ bookings: Array, filters: Object, statuses: Array })
const search = ref(props.filters.search ?? '')
const status = ref(props.filters.status ?? '')

function apply() {
    router.get(route('admin.bookings'), { search: search.value, status: status.value }, { preserveState: true })
}
const badgeClass = (s) => ({ confirmed: 'info', checked_in: 'warn', in_service: 'ok', completed: '', no_show: 'bad', held: 'brand', cancelled: '', expired: '' }[s] ?? '')
</script>

<template>
    <AdminLayout>
        <IconSprite />
        <div class="content">
            <div class="ph">
                <div><h1>Bookings</h1><p>Every booking across locations — open the calendar to manage one.</p></div>
                <div class="acts">
                    <button class="btn primary"><Icon sm name="plus" />New booking</button>
                </div>
            </div>
            <section class="card">
                <div class="card-h" style="gap:10px;flex-wrap:wrap">
                    <div class="input" style="max-width:280px;height:34px">
                        <Icon sm name="list" />
                        <input v-model="search" placeholder="Search code or client…" style="border:0;outline:0;background:none;width:100%;font:inherit" @keydown.enter="apply">
                    </div>
                    <div style="min-width:180px"><Pick v-model="status" label="Status" :options="[{ value: '', label: 'All statuses' }, ...statuses.map(s => ({ value: s.value, label: s.label }))]" @update:modelValue="apply" /></div>
                    <button class="btn sm" @click="apply">Search</button>
                </div>
                <div class="tablewrap">
                    <table class="t">
                        <thead><tr><th>Code</th><th>Client</th><th>Service</th><th>When</th><th>Source</th><th>Status</th><th class="n">Total</th></tr></thead>
                        <tbody>
                            <tr v-for="b in bookings" :key="b.id" style="cursor:pointer" @click="router.get(route('admin.calendar', { booking: b.id, date: (new Date(b.when.replace(/,/g,''))).toISOString().slice(0,10) }))">
                                <td><b>{{ b.code }}</b></td>
                                <td>{{ b.client }}</td>
                                <td>{{ b.service }}</td>
                                <td>{{ b.when }}</td>
                                <td class="muted">{{ b.source === 'online' ? 'Online' : b.source === 'walk_in' ? 'Walk-in' : 'Phone' }}</td>
                                <td><span class="badge" :class="badgeClass(b.status)">{{ b.status_label }}</span></td>
                                <td class="n"><Money :amount="b.total" :currency="b.currency" /></td>
                            </tr>
                            <tr v-if="!bookings.length"><td colspan="7" class="muted" style="text-align:center;padding:24px">No bookings match.</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>
            <p class="synthetic">Synthetic demo data.</p>
        </div>
    </AdminLayout>
</template>

<script setup>
import { ref } from 'vue'
import { router } from '@inertiajs/vue3'
import AdminLayout from '@/Layouts/AdminLayout.vue'
import IconSprite from '@/Components/IconSprite.vue'
import Icon from '@/Components/Icon.vue'
import Pick from '@/Components/Pick.vue'
import DatePick from '@/Components/DatePick.vue'

const props = defineProps({ rooms: Array, locations: Array })
const form = ref({ name: '', location_id: props.locations[0]?.id, room_type: 'single', capacity: 1 })
const adding = ref(false)
const typeLabel = { single: 'Single', couples: 'Couples suite', facial: 'Facial', wet: 'Wet room' }

function save() {
    router.post(route('admin.rooms.store'), form.value, { onSuccess: () => { adding.value = false; form.value = { name: '', location_id: props.locations[0]?.id, room_type: 'single', capacity: 1 } } })
}
function toggle(r) {
    router.put(route('admin.rooms.update', r.id), { ...r, active: !r.active }, { preserveScroll: true })
}
</script>

<template>
    <AdminLayout>
        <IconSprite />
        <div class="content">
            <div class="ph">
                <div><h1>Rooms</h1><p>Where treatments happen. Couples suites hold one booking with two therapists.</p></div>
                <div class="acts"><button class="btn primary" @click="adding = !adding"><Icon sm name="plus" />New room</button></div>
            </div>

            <section v-if="adding" class="card" style="margin-bottom:16px">
                <div class="card-b" style="display:grid;gap:12px;max-width:520px">
                    <div class="row2">
                        <div class="field"><label>Name</label><div class="input"><input v-model="form.name" placeholder="e.g. Kamboja 1" style="border:0;outline:0;background:none;width:100%;font:inherit"></div></div>
                        <div class="field"><label>Location</label>
                            <Pick v-model="form.location_id" label="Location" :options="locations.map(l => ({ value: l.id, label: l.name }))" /></div>
                    </div>
                    <div class="row2">
                        <div class="field"><label>Type</label>
                            <Pick v-model="form.room_type" label="Room type" :options="[{ value: 'single', label: 'Single' }, { value: 'couples', label: 'Couples suite' }, { value: 'facial', label: 'Facial' }, { value: 'wet', label: 'Wet room' }]" /></div>
                        <div class="field"><label>Capacity</label><div class="input"><input v-model="form.capacity" type="number" min="1" max="4" style="border:0;outline:0;background:none;width:100%;font:inherit"></div></div>
                    </div>
                    <button class="btn primary" style="width:max-content" @click="save">Add room</button>
                </div>
            </section>

            <section class="card">
                <div class="tablewrap">
                    <table class="t">
                        <thead><tr><th>Room</th><th>Location</th><th>Type</th><th class="n">Capacity</th><th>Status</th></tr></thead>
                        <tbody>
                            <tr v-for="r in rooms" :key="r.id">
                                <td><span class="cellp"><span class="av" style="background:var(--hover);color:var(--text-2)"><Icon sm name="door-closed" /></span><b>{{ r.name }}</b></span></td>
                                <td>{{ r.location }}</td>
                                <td>{{ typeLabel[r.room_type] }}</td>
                                <td class="n">{{ r.capacity }}</td>
                                <td><span class="badge" :class="r.active ? 'ok' : ''" style="cursor:pointer" @click="toggle(r)">{{ r.active ? 'Active' : 'Blocked' }}</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    </AdminLayout>
</template>

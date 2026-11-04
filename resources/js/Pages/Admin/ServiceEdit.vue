<script setup>
import { ref } from 'vue'
import { router } from '@inertiajs/vue3'
import AdminLayout from '@/Layouts/AdminLayout.vue'
import IconSprite from '@/Components/IconSprite.vue'
import Icon from '@/Components/Icon.vue'
import Pick from '@/Components/Pick.vue'
import DatePick from '@/Components/DatePick.vue'
import Cbx from '@/Components/Cbx.vue'

const props = defineProps({
    service: Object, categories: Array, forms: Array, addons: Array, staff: Array, currency: String,
})
const isNew = !props.service
const f = ref(props.service ? JSON.parse(JSON.stringify(props.service)) : {
    name: '', description: '', category_id: props.categories[0]?.id, photo: null, badge: null,
    room_type: 'single', therapists_needed: 1, max_guests: 1, price_basis: 'per_guest', buffer: 15,
    form_id: null, active: true, bookable_online: true,
    variants: [{ duration: 60, price: props.currency === 'IDR' ? 300000 : 5000, master_surcharge: 0, senior_surcharge: 0 }],
    addon_ids: [], skill_ids: [],
})
const fmt = (m) => (props.currency === 'IDR' ? 'Rp ' + m.toLocaleString('id-ID') : '$' + (m / 100).toFixed(2))

function save() {
    const payload = { ...f.value, buffer: Number(f.value.buffer) }
    payload.variants = f.value.variants.map((v) => ({ ...v, duration: Number(v.duration), price: Number(v.price) }))
    router[isNew ? 'post' : 'put'](
        isNew ? route('admin.catalog.services.store') : route('admin.catalog.services.update', props.service.id),
        payload,
        { preserveScroll: true },
    )
}
</script>

<template>
    <AdminLayout>
        <IconSprite />
        <div class="content">
            <div class="ph">
                <div>
                    <div class="crumb"><a href="/admin/catalog">Catalog</a><Icon xs name="chevron-right" /><a href="/admin/catalog">Services</a><Icon xs name="chevron-right" />{{ isNew ? 'New' : 'Edit' }}</div>
                    <h1>{{ f.name || 'New service' }}
                        <span v-if="f.bookable_online" class="badge ok"><Icon name="globe" />Bookable online</span>
                    </h1>
                </div>
                <div class="acts">
                    <a class="btn" href="/"><Icon sm name="eye" />Preview</a>
                    <button class="btn primary" @click="save">Save</button>
                </div>
            </div>

            <div class="sv">
                <div style="display:grid;gap:16px">
                    <section class="card">
                        <div class="card-h"><h2>Basics</h2></div>
                        <div class="card-b" style="display:grid;gap:14px">
                            <div class="field"><label>Name</label>
                                <div class="input"><input v-model="f.name" placeholder="e.g. Balinese Massage" style="border:0;outline:0;background:none;width:100%;font:inherit"></div></div>
                            <div class="field"><label>Description</label>
                                <div class="input area"><textarea v-model="f.description" rows="2" style="border:0;outline:0;background:none;width:100%;font:inherit;resize:vertical"></textarea></div></div>
                            <div class="row2">
                                <div class="field"><label>Category</label>
                                    <Pick v-model="f.category_id" label="Category" :options="categories.map(c => ({ value: c.id, label: c.name }))" /></div>
                                <div class="field"><label>Badge</label>
                                    <Pick v-model="f.badge" label="Badge" :options="[{ value: null, label: 'None' }, { value: 'signature', label: 'Signature (gold)' }]" /></div>
                            </div>
                        </div>
                    </section>

                    <section class="card">
                        <div class="card-h"><h2>Durations &amp; prices</h2><span class="muted small" style="margin-left:auto">Master surcharge from price_by_level</span></div>
                        <div class="card-b" style="display:grid;gap:10px">
                            <table class="t" style="font-size:13px">
                                <thead><tr><th>Duration</th><th>Price</th><th>Master surcharge</th><th>Senior surcharge</th><th /></tr></thead>
                                <tbody>
                                    <tr v-for="(v, i) in f.variants" :key="i">
                                        <td><div class="input" style="width:110px"><input v-model="v.duration" type="number" min="15" step="15" style="border:0;outline:0;background:none;width:100%;font:inherit"></div></td>
                                        <td><div class="input" style="width:140px"><input v-model="v.price" type="number" min="0" step="1000" style="border:0;outline:0;background:none;width:100%;font:inherit"></div></td>
                                        <td><div class="input" style="width:140px"><input v-model="v.master_surcharge" type="number" min="0" step="1000" style="border:0;outline:0;background:none;width:100%;font:inherit"></div></td>
                                        <td><div class="input" style="width:140px"><input v-model="v.senior_surcharge" type="number" min="0" step="1000" style="border:0;outline:0;background:none;width:100%;font:inherit"></div></td>
                                        <td><button class="ib" aria-label="Remove" @click="f.variants.length > 1 && f.variants.splice(i, 1)"><Icon sm name="x" /></button></td>
                                    </tr>
                                </tbody>
                            </table>
                            <button class="btn sm" style="width:max-content" @click="f.variants.push({ duration: 90, price: f.variants[0].price, master_surcharge: 0, senior_surcharge: 0 })"><Icon xs name="plus" />Add duration</button>
                        </div>
                    </section>

                    <section class="card">
                        <div class="card-h"><h2>Skills required</h2><span class="muted small" style="margin-left:auto">Only these therapists can be assigned</span></div>
                        <div class="card-b" style="display:grid;gap:8px">
                            <label v-for="s in staff" :key="s.id" class="cbx" role="checkbox" :aria-checked="String(f.skill_ids.includes(s.id))"
                                @click="f.skill_ids.includes(s.id) ? f.skill_ids.splice(f.skill_ids.indexOf(s.id), 1) : f.skill_ids.push(s.id)">
                                <span class="box"><Icon v-if="f.skill_ids.includes(s.id)" name="check" /></span>
                                {{ s.display_name }} <span class="muted small">· {{ s.level }}</span>
                            </label>
                        </div>
                    </section>
                </div>

                <div style="display:grid;gap:16px;align-content:start">
                    <section class="card">
                        <div class="card-h"><h2>Resources</h2></div>
                        <div class="card-b" style="display:grid;gap:14px">
                            <div class="field"><label>Room type</label>
                                <Pick v-model="f.room_type" label="Room type" :options="[{ value: 'single', label: 'Single room' }, { value: 'couples', label: 'Couples suite' }, { value: 'facial', label: 'Facial room' }, { value: 'wet', label: 'Wet room' }, { value: 'any', label: 'Any room' }]" /></div>
                            <div class="row2">
                                <div class="field"><label>Therapists needed</label>
                                    <div class="seg" role="group"><button :aria-pressed="String(f.therapists_needed === 1)" @click="f.therapists_needed = 1; f.max_guests = 1">1</button><button :aria-pressed="String(f.therapists_needed === 2)" @click="f.therapists_needed = 2; f.max_guests = 2">2</button></div></div>
                                <div class="field"><label>Guests</label>
                                    <div class="seg" role="group"><button :aria-pressed="String(f.max_guests === 1)" @click="f.max_guests = 1">1</button><button :aria-pressed="String(f.max_guests === 2)" @click="f.max_guests = 2">For 2</button></div></div>
                            </div>
                            <div class="field"><label>Price basis</label>
                                <div class="seg" role="group">
                                    <button :aria-pressed="String(f.price_basis === 'per_guest')" @click="f.price_basis = 'per_guest'">Per guest</button>
                                    <button :aria-pressed="String(f.price_basis === 'per_booking')" @click="f.price_basis = 'per_booking'">Per booking (for two)</button>
                                </div></div>
                            <div class="field"><label>Buffer after treatment</label>
                                <div class="input"><input v-model="f.buffer" type="number" min="0" step="5" style="border:0;outline:0;background:none;width:100%;font:inherit"><span class="phd">min</span></div>
                                <span class="hint">Gap kept free before the next booking.</span></div>
                        </div>
                    </section>

                    <section class="card">
                        <div class="card-h"><h2>Add-ons</h2></div>
                        <div class="card-b" style="display:grid;gap:8px">
                            <label v-for="a in addons" :key="a.id" class="cbx" role="checkbox" :aria-checked="String(f.addon_ids.includes(a.id))"
                                @click="f.addon_ids.includes(a.id) ? f.addon_ids.splice(f.addon_ids.indexOf(a.id), 1) : f.addon_ids.push(a.id)">
                                <span class="box"><Icon v-if="f.addon_ids.includes(a.id)" name="check" /></span>
                                <span class="t2">{{ a.name }}<small class="num">{{ a.duration }} min · {{ fmt(a.price) }}</small></span>
                            </label>
                        </div>
                    </section>

                    <section class="card">
                        <div class="card-h"><h2>Booking rules</h2></div>
                        <div class="card-b" style="display:grid;gap:12px">
                            <div class="field"><label>Required form</label>
                                <Pick v-model="f.form_id" label="Form" :options="[{ value: null, label: 'None' }, ...forms.map(fo => ({ value: fo.id, label: fo.name }))]" />
                                <span class="hint">Bookings show "Form missing" in the calendar until signed.</span></div>
                            <label class="swt" role="switch" :aria-checked="String(f.active)" @click="f.active = !f.active">
                                <span class="track" /> Service active
                            </label>
                            <label class="swt" role="switch" :aria-checked="String(f.bookable_online)" @click="f.bookable_online = !f.bookable_online">
                                <span class="track" /> Bookable online
                            </label>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>

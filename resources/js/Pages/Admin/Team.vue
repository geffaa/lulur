<script setup>
import { ref } from 'vue'
import { router } from '@inertiajs/vue3'
import AdminLayout from '@/Layouts/AdminLayout.vue'
import IconSprite from '@/Components/IconSprite.vue'
import Icon from '@/Components/Icon.vue'
import Pick from '@/Components/Pick.vue'
import DatePick from '@/Components/DatePick.vue'

const props = defineProps({ staff: Array, time_off: Array, week: String, services: Array, locations: { type: Array, default: () => [] } })
const adding = ref(false)
const form = ref({ display_name: '', gender: 'female', level: 'junior', specialty: '', skill_ids: [] })
const shiftForm = ref({ staff_id: '', location_id: props.locations[0]?.id ?? '', day: new Date().toLocaleDateString('en-CA'), start: '09:00', end: '21:00' })
const offForm = ref({ staff_id: '', fromDay: '', fromTime: '09:00', toDay: '', toTime: '21:00', reason: '' })
const times = Array.from({ length: 96 }, (_, i) => { const v = `${String(Math.floor(i / 4)).padStart(2, '0')}:${String((i % 4) * 15).padStart(2, '0')}`; return { value: v, label: v } })
const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function saveStaff() {
    router.post(route('admin.team.staff.store'), form.value, { onSuccess: () => { adding.value = false; form.value = { display_name: '', gender: 'female', level: 'junior', specialty: '', skill_ids: [] } } })
}
function toggleSkill(id) {
    const i = form.value.skill_ids.indexOf(id)
    i >= 0 ? form.value.skill_ids.splice(i, 1) : form.value.skill_ids.push(id)
}
function addShift() {
    router.post(route('admin.team.shifts.store'), shiftForm.value, { preserveScroll: true })
}
function addTimeOff() {
    const o = offForm.value
    router.post(route('admin.team.timeoff.store'), { staff_id: o.staff_id, reason: o.reason, from: `${o.fromDay} ${o.fromTime}`, to: `${o.toDay} ${o.toTime}` }, { preserveScroll: true })
}
</script>

<template>
    <AdminLayout>
        <IconSprite />
        <div class="content">
            <div class="ph">
                <div><h1>Team</h1><p>Therapists, skills, weekly shifts and time off.</p></div>
                <div class="acts"><button class="btn primary" @click="adding = !adding"><Icon sm name="plus" />New therapist</button></div>
            </div>

            <section v-if="adding" class="card" style="margin-bottom:16px">
                <div class="card-h"><h2>New therapist</h2></div>
                <div class="card-b" style="display:grid;gap:12px">
                    <div class="row2">
                        <div class="field"><label>Name</label><div class="input"><input v-model="form.display_name" placeholder="e.g. Made Artana" style="border:0;outline:0;background:none;width:100%;font:inherit"></div></div>
                        <div class="row2" style="grid-template-columns:1fr 1fr;gap:12px">
                            <div class="field"><label>Gender</label>
                                <div class="seg"><button :aria-pressed="String(form.gender === 'female')" @click="form.gender = 'female'">Female</button><button :aria-pressed="String(form.gender === 'male')" @click="form.gender = 'male'">Male</button></div></div>
                            <div class="field"><label>Level</label>
                                <Pick v-model="form.level" label="Level" :options="[{ value: 'junior', label: 'Junior' }, { value: 'senior', label: 'Senior' }, { value: 'master', label: 'Master' }]" /></div>
                        </div>
                    </div>
                    <div class="field"><label>Skills</label>
                        <div style="display:flex;gap:6px;flex-wrap:wrap">
                            <span v-for="s in services" :key="s.id" class="chip" role="checkbox" :aria-checked="String(form.skill_ids.includes(s.id))" @click="toggleSkill(s.id)">{{ s.name }}</span>
                        </div></div>
                    <button class="btn primary" style="width:max-content" @click="saveStaff">Add therapist</button>
                </div>
            </section>

            <div class="tm-grid">
                <section class="card">
                    <div class="card-h"><h2>Therapists</h2></div>
                    <div class="tablewrap">
                        <table class="t">
                            <thead><tr><th>Therapist</th><th>Level</th><th>Skills</th><th class="n">Shifts this week</th></tr></thead>
                            <tbody>
                                <tr v-for="s in staff" :key="s.id">
                                    <td><span class="cellp"><span class="av" :class="'av-' + s.hue">{{ s.initials }}</span><span class="t2"><b>{{ s.name }}</b><small>{{ s.gender }}</small></span></span></td>
                                    <td>{{ s.level }}<template v-if="s.specialty"> · {{ s.specialty }}</template></td>
                                    <td class="muted">{{ s.skills.slice(0, 2).join(', ') }}<template v-if="s.skills.length > 2"> +{{ s.skills.length - 2 }}</template></td>
                                    <td class="n">{{ s.shifts.length }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
                <div style="display:grid;gap:16px;align-content:start">
                    <section class="card">
                        <div class="card-h"><h2>Add a shift</h2></div>
                        <div class="card-b" style="display:grid;gap:10px">
                            <div class="field"><label>Therapist</label>
                                <Pick v-if="locations.length > 1" v-model="shiftForm.location_id" label="Location" :options="locations.map(l => ({ value: l.id, label: l.name }))" style="margin-bottom:10px" />
                                <Pick v-model="shiftForm.staff_id" label="Therapist" :options="staff.map(s => ({ value: s.id, label: s.name }))" /></div>
                            <div class="row2">
                                <div class="field"><label>Date</label><DatePick v-model="shiftForm.day" label="Shift date" /></div>
                                <div class="row2" style="gap:8px">
                                    <div class="field"><label>From</label><Pick v-model="shiftForm.start" label="Shift start" :options="times" /></div>
                                    <div class="field"><label>To</label><Pick v-model="shiftForm.end" label="Shift end" :options="times" /></div>
                                </div>
                            </div>
                            <button class="btn primary" style="width:max-content" @click="addShift">Add shift</button>
                        </div>
                    </section>
                    <section class="card">
                        <div class="card-h"><h2>Time off</h2></div>
                        <div class="card-b" style="display:grid;gap:10px">
                            <ul class="forms">
                                <li v-for="t in time_off" :key="t.id">
                                    <span class="ic"><Icon sm name="calendar-days" /></span>
                                    <span class="t2"><b>{{ t.staff }}</b><small>{{ t.from }} → {{ t.to }} · {{ t.reason }}</small></span>
                                </li>
                                <li v-if="!time_off.length" class="muted small">No upcoming time off.</li>
                            </ul>
                            <div class="field"><label>Therapist</label><Pick v-model="offForm.staff_id" label="Time off therapist" :options="staff.map(s => ({ value: s.id, label: s.name }))" /></div>
                            <div class="row2">
                                <div class="field"><label>From</label><div style="display:grid;gap:6px"><DatePick v-model="offForm.fromDay" label="Time off from date" /><Pick v-model="offForm.fromTime" label="Time off from time" :options="times" /></div></div>
                                <div class="field"><label>To</label><div style="display:grid;gap:6px"><DatePick v-model="offForm.toDay" label="Time off to date" /><Pick v-model="offForm.toTime" label="Time off to time" :options="times" /></div></div>
                            </div>
                            <button class="btn sm" style="width:max-content" @click="addTimeOff">Record time off</button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>

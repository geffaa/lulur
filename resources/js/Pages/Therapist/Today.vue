<script setup>
import { computed } from 'vue'
import TherapistLayout from '@/Layouts/TherapistLayout.vue'
import Icon from '@/Components/Icon.vue'
import Money from '@/Components/Money.vue'
import { router } from '@inertiajs/vue3'

const props = defineProps({
    staff: Object, date_label: String, stats: Object, bookings: Array, currency: String,
})
const now = computed(() => props.bookings.find((b) => b.is_now))
const next = computed(() => props.bookings.find((b) => !b.past && !b.is_now && ['confirmed', 'checked_in'].includes(b.status)))
const earlier = computed(() => props.bookings.filter((b) => b.past || b.status === 'no_show').reverse())
function finish(b) {
    router.post(`/admin/bookings/${b.id}/status`, { action: 'complete' }, { preserveScroll: true })
}
</script>

<template>
    <TherapistLayout>
        <header class="th-top">
            <div class="r1">
                <span class="av" :class="'av-7'" aria-hidden="true">{{ staff.initials }}</span>
                <div><small>{{ date_label }}</small><b>Selamat siang, {{ staff.name.split(' ')[0] }}</b></div>
                <button class="ib" style="margin-left:auto;color:#fff" aria-label="Notifications"><Icon name="bell" /></button>
            </div>
            <div class="stat">
                <div><b>{{ stats.clients }}</b><span>clients today</span></div>
                <div><b>{{ stats.booked_label }}</b><span>booked</span></div>
                <div><b><Money :amount="stats.tips" :currency="currency" /></b><span>tips today</span></div>
            </div>
        </header>
        <div class="list">
            <template v-if="now">
                <h2>Now</h2>
                <div class="card it now">
                    <div class="r1"><time>{{ now.time }}</time><span class="muted small">until {{ now.until }} · {{ now.room }}</span>
                        <span class="badge ok"><Icon :name="now.status === 'in_service' ? 'sparkles' : 'door-open'" />{{ now.status_label }}</span></div>
                    <span class="t2"><b>{{ now.client }} · {{ now.service }}</b><small>{{ now.prefs }}</small></span>
                    <div class="timer"><Icon sm name="timer" /><span>{{ now.progress }} of 100%</span><span class="bar"><i :style="{ width: now.progress + '%' }" /></span></div>
                    <button v-if="now.status === 'checked_in'" class="btn primary" @click="router.post(`/admin/bookings/${now.id}/status`, { action: 'start' }, { preserveScroll: true })"><Icon sm name="sparkles" />Start session</button>
                    <button v-else class="btn primary" @click="finish(now)"><Icon sm name="check" />Finish session</button>
                </div>
            </template>
            <template v-if="next">
                <h2>Next</h2>
                <div class="card it">
                    <div class="r1"><time>{{ next.time }}</time><span class="muted small">until {{ next.until }} · {{ next.room }}</span>
                        <span class="badge" :class="next.status === 'confirmed' ? 'info' : 'ok'">{{ next.status_label }}</span></div>
                    <span class="t2"><b>{{ next.client }} · {{ next.service }}</b><small>{{ next.prefs }}</small></span>
                    <div class="tags">
                        <span v-if="!next.form_signed" class="badge warn"><Icon xs name="triangle-alert" />Form missing</span>
                        <span v-else class="badge ok"><Icon xs name="file-check" />Form signed</span>
                        <span v-if="next.prefs?.includes('allerg')" class="badge warn"><Icon xs name="triangle-alert" />Allergy — check notes</span>
                    </div>
                </div>
            </template>
            <template v-if="earlier.length">
                <h2>Earlier</h2>
                <div v-for="b in earlier" :key="b.id" class="card it past">
                    <div class="r1"><time>{{ b.time }}</time><span class="muted small">{{ b.room }}</span>
                        <span class="badge" :class="b.status === 'no_show' ? 'bad' : ''">
                            <Icon :name="b.status === 'no_show' ? 'user-x' : 'check'" />{{ b.status_label }}</span></div>
                    <span class="t2"><b>{{ b.client }} · {{ b.service }}</b><small v-if="b.tip">Tip <Money :amount="b.tip" :currency="currency" /></small><small v-else-if="b.status === 'no_show'">Deposit kept per policy</small></span>
                </div>
            </template>
        </div>
    </TherapistLayout>
</template>

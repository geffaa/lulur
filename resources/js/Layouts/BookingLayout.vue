<script setup>
import { Link } from '@inertiajs/vue3'
import Icon from '@/Components/Icon.vue'
import IconSprite from '@/Components/IconSprite.vue'
import Toast from '@/Components/Toast.vue'
import LulurMark from '@/Components/LulurMark.vue'

const props = defineProps({
    step: { type: Number, default: 1 }, // 1 Service, 2 Time, 3 Details
    brand: { type: Object, default: () => ({}) },
    location: { type: Object, default: null },
})
const steps = [
    { n: 1, label: 'Service' },
    { n: 2, label: 'Time' },
    { n: 3, label: 'Details' },
]
const stateOf = (s) => (s.n < props.step ? 'done' : s.n === props.step ? 'on' : '')
</script>

<template>
    <div class="book">
        <IconSprite />
        <header class="bhdr">
            <div class="w">
                <Link class="blogo" :href="route('booking.index')">
                    <i>{{ brand.logo_letter ?? 'T' }}</i>{{ brand.name ?? 'Spa' }}
                </Link>
                <nav class="steps" aria-label="Booking steps">
                    <template v-for="(s, i) in steps" :key="s.n">
                        <span v-if="i > 0" class="sepl" />
                        <span :class="stateOf(s)"><b><Icon v-if="s.n < step" xs name="check" /><template v-else>{{ s.n }}</template></b><span class="lab">{{ s.label }}</span></span>
                    </template>
                </nav>
                <div class="r">
                    <button v-if="location && location.name" class="trigger inline" aria-haspopup="listbox">
                        <Icon sm name="map-pin" />{{ location.name }}<Icon sm name="chevron-down" />
                    </button>
                    <a class="btn ghost" href="#">My booking</a>
                </div>
            </div>
        </header>
        <main class="bw">
            <div><slot /></div>
            <slot name="aside" />
            <slot name="mbar" />
        </main>
        <Toast />
        <footer class="bfoot"><LulurMark :size="20" /><span>Booking by <b>Lulur</b></span></footer>
    </div>
</template>

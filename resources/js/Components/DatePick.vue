<script setup>
// Custom date picker (replaces native <input type="date">). modelValue is "YYYY-MM-DD".
// Keyboard: Enter/Space/ArrowDown opens; arrows move by day/week; Enter picks; Esc closes.
import { ref, computed, onBeforeUnmount } from 'vue'
import Icon from './Icon.vue'

const props = defineProps({ modelValue: String, placeholder: { type: String, default: 'Pick a date' }, label: String })
const emit = defineEmits(['update:modelValue'])

const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
const parse = (s) => (s ? new Date(+s.slice(0, 4), +s.slice(5, 7) - 1, +s.slice(8, 10)) : null)

const open = ref(false)
const root = ref(null)
const cursor = ref(parse(props.modelValue) || new Date()) // date with keyboard focus
const view = computed(() => new Date(cursor.value.getFullYear(), cursor.value.getMonth(), 1))
const title = computed(() => view.value.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }))
const shown = computed(() => (props.modelValue ? parse(props.modelValue).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }) : ''))
const days = computed(() => {
    const first = view.value
    const start = new Date(first); start.setDate(1 - ((first.getDay() + 6) % 7)) // Monday first
    return Array.from({ length: 42 }, (_, i) => { const d = new Date(start); d.setDate(start.getDate() + i); return d })
})
const today = iso(new Date())

function outside(e) { if (root.value && !root.value.contains(e.target)) close() }
function show() { cursor.value = parse(props.modelValue) || new Date(); open.value = true; document.addEventListener('mousedown', outside) }
function close() { open.value = false; document.removeEventListener('mousedown', outside) }
function pick(d) { emit('update:modelValue', iso(d)); close() }
function shift(n, unit = 'd') {
    const d = new Date(cursor.value)
    if (unit === 'm') d.setMonth(d.getMonth() + n, 1); else d.setDate(d.getDate() + n)
    cursor.value = d
}
function key(e) {
    if (!open.value) { if (['Enter', ' ', 'ArrowDown'].includes(e.key)) { e.preventDefault(); show() } return }
    const map = { ArrowLeft: [-1], ArrowRight: [1], ArrowUp: [-7], ArrowDown: [7], PageUp: [-1, 'm'], PageDown: [1, 'm'] }
    if (e.key === 'Escape') { e.preventDefault(); close() }
    else if (map[e.key]) { e.preventDefault(); shift(...map[e.key]) }
    else if (e.key === 'Enter') { e.preventDefault(); pick(cursor.value) }
}
onBeforeUnmount(() => document.removeEventListener('mousedown', outside))
</script>

<template>
    <div ref="root" class="pickw" @keydown="key">
        <button type="button" class="trigger" aria-haspopup="dialog" :aria-expanded="String(open)" :aria-label="label" @click="open ? close() : show()">
            <Icon sm name="calendar" />
            <span class="val" :class="{ phd: !shown }">{{ shown || placeholder }}</span>
        </button>
        <div v-if="open" class="pop dpick" role="dialog" aria-label="Choose date">
            <div class="dp-h">
                <button type="button" class="btn sm" aria-label="Previous month" @click="shift(-1, 'm')"><Icon sm name="chevron-left" /></button>
                <strong>{{ title }}</strong>
                <button type="button" class="btn sm" aria-label="Next month" @click="shift(1, 'm')"><Icon sm name="chevron-right" /></button>
            </div>
            <div class="dp-g" role="grid">
                <span v-for="w in ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']" :key="w" class="dp-w">{{ w }}</span>
                <button v-for="d in days" :key="d.getTime()" type="button" role="gridcell" class="dp-d num"
                    :class="{ out: d.getMonth() !== view.getMonth(), sel: iso(d) === modelValue, now: iso(d) === today, cur: iso(d) === iso(cursor) }"
                    :aria-selected="String(iso(d) === modelValue)" :aria-label="d.toDateString()" @click="pick(d)">{{ d.getDate() }}</button>
            </div>
        </div>
    </div>
</template>

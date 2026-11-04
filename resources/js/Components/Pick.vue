<script setup>
// Custom listbox (replaces native <select>). Keyboard: Enter/Space/ArrowDown opens,
// arrows move, Enter selects, Esc closes. Also used for time-of-day (see times()).
import { ref, computed, nextTick, onBeforeUnmount } from 'vue'
import Icon from './Icon.vue'

const props = defineProps({
    modelValue: [String, Number, null],
    options: { type: Array, required: true }, // [{ value, label }]
    placeholder: { type: String, default: 'Choose…' },
    label: String,
})
const emit = defineEmits(['update:modelValue'])

const open = ref(false)
const active = ref(0)
const root = ref(null)
const list = ref(null)
const current = computed(() => props.options.find((o) => o.value === props.modelValue))

function outside(e) { if (root.value && !root.value.contains(e.target)) close() }
function show() {
    open.value = true
    active.value = Math.max(0, props.options.findIndex((o) => o.value === props.modelValue))
    document.addEventListener('mousedown', outside)
    nextTick(() => list.value?.querySelector('[aria-selected=true], .on')?.scrollIntoView({ block: 'nearest' }))
}
function close() { open.value = false; document.removeEventListener('mousedown', outside) }
function choose(o) { emit('update:modelValue', o.value); close() }
function key(e) {
    if (!open.value) {
        if (['Enter', ' ', 'ArrowDown'].includes(e.key)) { e.preventDefault(); show() }
        return
    }
    if (e.key === 'Escape') { e.preventDefault(); close() }
    else if (e.key === 'ArrowDown') { e.preventDefault(); active.value = Math.min(props.options.length - 1, active.value + 1) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); active.value = Math.max(0, active.value - 1) }
    else if (e.key === 'Enter') { e.preventDefault(); choose(props.options[active.value]) }
    nextTick(() => list.value?.querySelector('.on')?.scrollIntoView({ block: 'nearest' }))
}
onBeforeUnmount(() => document.removeEventListener('mousedown', outside))
</script>

<template>
    <div ref="root" class="pickw" @keydown="key">
        <button type="button" class="trigger" role="combobox" aria-haspopup="listbox" :aria-expanded="String(open)"
            :aria-label="label" @click="open ? close() : show()">
            <span class="val" :class="{ phd: !current }">{{ current ? current.label : placeholder }}</span>
            <Icon sm name="chevron-down" />
        </button>
        <ul v-if="open" ref="list" class="pop pick-list" role="listbox">
            <li v-for="(o, i) in options" :key="o.value" role="option" :aria-selected="String(o.value === modelValue)"
                :class="{ on: i === active, sel: o.value === modelValue }" @mouseenter="active = i" @click="choose(o)">
                {{ o.label }}<Icon v-if="o.value === modelValue" sm name="check" />
            </li>
        </ul>
    </div>
</template>

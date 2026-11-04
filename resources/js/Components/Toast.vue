<script setup>
// Shows flash messages and the first validation error after an Inertia visit. role=status, auto-dismiss.
import { ref, watch } from 'vue'
import { usePage } from '@inertiajs/vue3'
import Icon from './Icon.vue'

const page = usePage()
const msg = ref(null)
let timer = null

function show(kind, text) {
    msg.value = { kind, text }
    clearTimeout(timer)
    timer = setTimeout(() => (msg.value = null), 5000)
}
watch(() => page.props, (p) => {
    const first = Object.values(p.errors ?? {})[0]
    if (p.flash?.success) show('ok', p.flash.success)
    else if (p.flash?.error) show('bad', p.flash.error)
    else if (first) show('bad', first)
}, { immediate: true, deep: false })
</script>

<template>
    <div class="toastw" aria-live="polite" role="status">
        <div v-if="msg" class="toast" :class="msg.kind">
            <Icon sm :name="msg.kind === 'ok' ? 'circle-check' : 'circle-alert'" />
            <span>{{ msg.text }}</span>
            <button type="button" class="x" aria-label="Dismiss" @click="msg = null"><Icon sm name="x" /></button>
        </div>
    </div>
</template>

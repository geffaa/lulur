<script setup>
import { computed } from 'vue'

const props = defineProps({
    amount: { type: Number, required: true }, // minor units
    currency: { type: String, default: 'IDR' },
    credit: Boolean,
})

const fmt = computed(() => {
    const v = props.amount
    if (props.currency === 'IDR') {
        const sign = v < 0 ? '−' : ''
        return `${sign}Rp ${Math.abs(v).toLocaleString('id-ID')}`
    }
    const sign = v < 0 ? '−' : ''
    return `${sign}$${(Math.abs(v) / 100).toLocaleString('en-US', { minimumFractionDigits: 2 })}`
})
</script>

<template>
    <span :class="{ credit }" class="num">{{ fmt }}</span>
</template>

<style>
.credit{color:var(--ok)}
</style>

<script setup>
const props = defineProps({
    name: { type: String, required: true }, // e.g. "check" renders #i-check
    sm: Boolean, xs: Boolean, lg: Boolean,
})
const cls = () => ['icon', props.sm && 'sm', props.xs && 'xs', props.lg && 'lg'].filter(Boolean)
</script>

<template>
    <svg :class="cls()" aria-hidden="true"><use :href="`#i-${name}`" /></svg>
</template>

<script setup>
// Platform mark: two overlapping circles (therapist ∩ room) — the lens is the free slot.
defineProps({ size: { type: Number, default: 20 } })
</script>

<template>
    <svg :width="size" :height="size" viewBox="0 0 48 48" aria-hidden="true" style="flex:none">
        <circle cx="18" cy="24" r="14" fill="var(--brand-soft)" stroke="var(--brand)" stroke-width="2.5" />
        <circle cx="30" cy="24" r="14" fill="var(--brand-soft)" stroke="var(--brand)" stroke-width="2.5" />
        <path d="M24 11.35A14 14 0 0 1 24 36.65A14 14 0 0 1 24 11.35Z" fill="var(--brand)" />
    </svg>
</template>

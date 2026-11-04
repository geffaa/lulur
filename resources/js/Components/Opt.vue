<script setup>
const props = defineProps({ checked: Boolean, right: String })
const emit = defineEmits(['select'])
</script>

<template>
    <div class="opt" role="radio" :aria-checked="String(checked)" tabindex="0" @click="emit('select')">
        <span class="rdo" aria-hidden="true"><span class="o" /></span>
        <span class="t"><slot /></span>
        <span v-if="right" class="r num">{{ right }}</span>
        <slot name="right" />
    </div>
</template>

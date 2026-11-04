<script setup>
import Icon from './Icon.vue'
const props = defineProps({ modelValue: Boolean, label: String })
const emit = defineEmits(['update:modelValue'])
</script>

<template>
    <span class="cbx" role="checkbox" :aria-checked="String(modelValue)" tabindex="0"
        @click="emit('update:modelValue', !modelValue)"
        @keydown.space.prevent="emit('update:modelValue', !modelValue)">
        <span class="box"><Icon v-if="modelValue" name="check" /></span>
        <span v-if="label">{{ label }}</span>
        <slot />
    </span>
</template>

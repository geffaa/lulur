<script setup>
// Custom segmented control (DESIGN.md: custom controls only)
const props = defineProps({
    options: { type: Array, required: true }, // [{value,label}] or ['Light','Medium']
    modelValue: [String, Number],
})
const emit = defineEmits(['update:modelValue'])
</script>

<template>
    <div class="seg" role="group">
        <button v-for="o in options" :key="o.value ?? o" type="button"
            :aria-pressed="String(modelValue) === String(o.value ?? o)"
            @click="emit('update:modelValue', o.value ?? o)">
            {{ o.label ?? o }}
        </button>
    </div>
</template>

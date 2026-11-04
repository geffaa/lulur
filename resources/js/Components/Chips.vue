<script setup>
const props = defineProps({ options: Array, modelValue: [String, Number], allLabel: String })
const emit = defineEmits(['update:modelValue'])
</script>

<template>
    <div class="cats" role="radiogroup">
        <span v-for="o in options" :key="o.value ?? o" class="chip" role="radio"
            :aria-checked="String(modelValue) === String(o.value ?? o)"
            @click="emit('update:modelValue', o.value ?? o)">
            {{ o.label ?? o }}
        </span>
        <slot />
    </div>
</template>

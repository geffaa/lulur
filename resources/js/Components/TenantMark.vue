<script setup>
// A tenant's own mark. The root is an <i> so existing logo-square styles (.blogo i, .tn, .rail) still apply;
// without a known mark it falls back to the tenant's letter.
defineProps({ mark: String, letter: { type: String, default: '' } })
</script>

<template>
    <i class="tmark" :aria-hidden="true">
        <svg v-if="mark === 'ripple'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 3.5C12 3.5 6.5 9.6 6.5 14a5.5 5.5 0 0 0 11 0C17.5 9.6 12 3.5 12 3.5Z" /><path d="M9.6 14.6a2.6 2.6 0 0 0 2.4 2" />
        </svg>
        <svg v-else-if="mark === 'sprig'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 21V4M12 8.5 7.5 5.5M12 8.5l4.5-3M12 13l-5-3.2M12 13l5-3.2M12 17.5 6.5 14.5M12 17.5l5.5-3" />
        </svg>
        <svg v-else-if="mark === 'bloom'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <ellipse cx="12" cy="7" rx="2.6" ry="4" /><ellipse cx="12" cy="7" rx="2.6" ry="4" transform="rotate(90 12 12)" />
            <ellipse cx="12" cy="7" rx="2.6" ry="4" transform="rotate(180 12 12)" /><ellipse cx="12" cy="7" rx="2.6" ry="4" transform="rotate(270 12 12)" />
        </svg>
        <template v-else>{{ letter }}</template>
    </i>
</template>

<style>
.tmark{font-style:normal;display:inline-grid;place-items:center}
.tmark svg{width:62%;height:62%}
</style>

<script setup>
import { Link } from '@inertiajs/vue3'
import Icon from '@/Components/Icon.vue'
import IconSprite from '@/Components/IconSprite.vue'
</script>

<template>
    <div class="phone">
        <IconSprite />
        <slot />
        <nav class="tabbar" aria-label="Therapist">
            <Link href="/today" aria-current="page"><Icon name="calendar-days" />Today</Link>
            <a href="#"><Icon name="users" />Clients</a>
            <a href="#"><Icon name="hand-coins" />Tips</a>
        </nav>
    </div>
</template>

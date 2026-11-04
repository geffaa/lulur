<script setup>
import { Link, usePage } from '@inertiajs/vue3'
import Icon from '@/Components/Icon.vue'
import IconSprite from '@/Components/IconSprite.vue'
import TenantMark from '@/Components/TenantMark.vue'
import Toast from '@/Components/Toast.vue'

const page = usePage()
const modules = [
    { key: 'calendar', label: 'Calendar', href: 'admin.calendar', icon: 'calendar-days' },
    { key: 'bookings', label: 'Bookings', href: 'admin.bookings', icon: 'list' },
    { key: 'clients', label: 'Clients', href: 'admin.clients', icon: 'users' },
    { key: 'sales', label: 'Sales', href: null, icon: 'receipt' },
    { key: 'catalog', label: 'Catalog', href: 'admin.catalog', icon: 'flower-2' },
    { key: 'team', label: 'Team', href: 'admin.team', icon: 'id-card' },
    { key: 'rooms', label: 'Rooms', href: 'admin.rooms', icon: 'door-closed' },
    { key: 'marketing', label: 'Marketing', href: 'admin.marketing', icon: 'megaphone' },
    { key: 'reports', label: 'Reports', href: 'admin.reports', icon: 'chart-column' },
]
const tenant = page.props.tenant
const current = () => page.component.replace('Admin/', '').split('/')[0].toLowerCase()
const isCurrent = (m) => m.key === current()
</script>

<template>
    <div class="adm">
        <IconSprite />
        <nav class="rail" aria-label="Main">
            <Link class="tn" :href="route('admin.calendar')" :aria-label="tenant?.name" style="color:#fff;padding:0;width:40px">
                <TenantMark :mark="tenant?.mark" :letter="tenant?.logo_letter ?? 'T'" style="width:100%;height:100%" />
            </Link>
            <Link v-for="m in modules" :key="m.key" :href="m.href ? route(m.href) : '#'" :aria-current="isCurrent(m) ? 'page' : undefined">
                <Icon :name="m.icon" />{{ m.label }}
            </Link>
            <span class="sp" />
            <Link :href="route('admin.settings')" :aria-current="current() === 'settings' ? 'page' : undefined">
                <Icon name="settings" />Settings
            </Link>
            <span class="av av-5" aria-hidden="true">{{ page.props.auth.user?.initials }}</span>
        </nav>
        <div class="main">
            <header class="mtop">
                <button class="ib" aria-label="Open navigation"><Icon name="menu" /></button>
                <TenantMark class="tn" :mark="tenant?.mark" :letter="tenant?.logo_letter ?? 'T'" />
                <b>{{ tenant?.name }}</b>
                <span style="margin-left:auto"><span class="av sm av-5" aria-hidden="true">{{ page.props.auth.user?.initials }}</span></span>
            </header>
            <slot />
        </div>
        <Toast />
    </div>
</template>

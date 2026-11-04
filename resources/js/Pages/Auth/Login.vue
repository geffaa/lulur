<script setup>
import TenantMark from '@/Components/TenantMark.vue'
import { ref } from 'vue'
import { router } from '@inertiajs/vue3'
import IconSprite from '@/Components/IconSprite.vue'

defineProps({ brand: Object, redirect: String })
const email = ref('')
const password = ref('')
const busy = ref(false)

function submit() {
    busy.value = true
    router.post('/login', { email: email.value, password: password.value, redirect: new URLSearchParams(location.search).get('redirect') ?? 'admin/calendar' }, {
        onFinish: () => (busy.value = false),
    })
}
</script>

<template>
    <div class="book">
        <IconSprite />
        <div style="min-height:100vh;display:grid;place-items:center;padding:24px">
            <div class="card" style="width:min(400px,100%);padding:28px;display:grid;gap:14px">
                <div class="blogo" style="display:flex;align-items:center;gap:10px;font:600 20px var(--serif)">
                    <TenantMark :mark="brand?.mark" :letter="brand?.logo_letter ?? 'L'" style="width:34px;height:34px;border-radius:10px;background:var(--brand);color:#fff;font-size:16px" />
                    {{ brand?.name ?? 'Lulur' }}
                </div>
                <h1 style="font-size:22px">Staff sign-in</h1>
                <p class="muted small">Front desk, managers and therapists. Demo users are in the README.</p>
                <form class="grid" style="gap:12px" @submit.prevent="submit">
                    <div class="field">
                        <label for="email">Email</label>
                        <div class="input"><input id="email" v-model="email" type="email" autocomplete="username" required style="border:0;outline:0;background:none;width:100%;font:inherit"></div>
                    </div>
                    <div class="field">
                        <label for="password">Password</label>
                        <div class="input"><input id="password" v-model="password" type="password" autocomplete="current-password" required style="border:0;outline:0;background:none;width:100%;font:inherit"></div>
                    </div>
                    <div v-if="$page.props.errors?.email" class="err" style="color:var(--bad);font-size:13px">{{ $page.props.errors.email }}</div>
                    <button class="btn primary" style="height:44px" :disabled="busy">Sign in</button>
                </form>
                <p class="muted small">Booking pages don't need an account — this is for {{ brand?.name ?? 'the spa' }} staff only.</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { router } from '@inertiajs/vue3'
import IconSprite from '@/Components/IconSprite.vue'

const code = ref('')
function submit() {
    router.post('/login/twofa', { code: code.value })
}
</script>

<template>
    <div class="book">
        <IconSprite />
        <div style="min-height:100vh;display:grid;place-items:center;padding:24px">
            <div class="card" style="width:min(400px,100%);padding:28px;display:grid;gap:14px">
                <h1 style="font-size:22px">Two-factor code</h1>
                <p class="muted small">Enter the 6-digit code from your authenticator app.</p>
                <form style="display:grid;gap:12px" @submit.prevent="submit">
                    <div class="input"><input v-model="code" inputmode="numeric" maxlength="6" placeholder="123456" style="border:0;outline:0;background:none;width:100%;font:inherit;letter-spacing:.3em"></div>
                    <div v-if="$page.props.errors?.code" style="color:var(--bad);font-size:13px">{{ $page.props.errors.code }}</div>
                    <button class="btn primary" style="height:44px">Verify</button>
                </form>
            </div>
        </div>
    </div>
</template>

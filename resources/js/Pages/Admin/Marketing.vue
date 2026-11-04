<script setup>
import AdminLayout from '@/Layouts/AdminLayout.vue'
import IconSprite from '@/Components/IconSprite.vue'
import Icon from '@/Components/Icon.vue'

const props = defineProps({ templates: Array, reminders: Array })
const badge = (s) => ({ sent: 'ok', pending: 'info', skipped: '', cancelled: '', failed: 'bad' }[s] ?? '')
</script>

<template>
    <AdminLayout>
        <IconSprite />
        <div class="content">
            <div class="ph"><div><h1>Marketing</h1><p>Reminder templates per tenant. WhatsApp is simulated in the demo.</p></div></div>
            <div class="mk-grid">
                <section class="card">
                    <div class="card-h"><h2>Templates</h2></div>
                    <div class="card-b" style="display:grid;gap:10px">
                        <div v-for="t in templates" :key="t.kind" style="border:1px solid var(--line);border-radius:10px;padding:12px 14px">
                            <div style="display:flex;align-items:center;gap:8px"><b>{{ t.label }}</b><span class="badge" style="margin-left:auto">{{ t.channel }}</span></div>
                            <p class="muted small" style="margin-top:6px">{{ t.body }}</p>
                        </div>
                    </div>
                </section>
                <section class="card">
                    <div class="card-h"><h2>Recent reminders</h2></div>
                    <div class="tablewrap">
                        <table class="t">
                            <thead><tr><th>Booking</th><th>Kind</th><th>Channel</th><th>Send at</th><th>Status</th></tr></thead>
                            <tbody>
                                <tr v-for="(r, i) in reminders" :key="i">
                                    <td><b>{{ r.booking }}</b></td>
                                    <td>{{ r.kind }}</td>
                                    <td class="muted">{{ r.channel }}</td>
                                    <td>{{ r.send_at }}</td>
                                    <td><span class="badge" :class="badge(r.status)">{{ r.status }}</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    </AdminLayout>
</template>

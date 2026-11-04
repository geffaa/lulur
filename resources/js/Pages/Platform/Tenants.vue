<script setup>
import AdminLayout from '@/Layouts/AdminLayout.vue'
import IconSprite from '@/Components/IconSprite.vue'
import Icon from '@/Components/Icon.vue'

const props = defineProps({ tenants: Array, kpi: Object })
</script>

<template>
    <AdminLayout>
        <IconSprite />
        <div class="content">
            <div class="ph">
                <div><h1>Tenants <span class="badge" style="vertical-align:middle">Platform admin · phase 2</span></h1>
                    <p>{{ tenants.length }} businesses · each tenant's data is isolated by tenant id and row-level security</p></div>
                <div class="acts"><button class="btn primary"><Icon sm name="plus" />Invite business</button></div>
            </div>
            <div class="kpis">
                <div class="card kpi"><span class="l">MRR</span><span class="v">${{ kpi.mrr }}</span><span class="d">across all tenants</span></div>
                <div class="card kpi"><span class="l">Bookings, 30 days</span><span class="v">{{ kpi.bookings_30d.toLocaleString() }}</span><span class="d">across all tenants</span></div>
            </div>
            <section class="card">
                <div class="card-h"><h2>Businesses</h2></div>
                <div class="tablewrap">
                    <table class="t">
                        <thead><tr><th>Business</th><th>Region</th><th>Currency · zone</th><th class="n">Locations</th><th>Plan</th><th class="n">Bookings 30 d</th><th>Status</th><th /></tr></thead>
                        <tbody>
                            <tr v-for="t in tenants" :key="t.slug">
                                <td><span class="cellp"><span class="av" style="background:var(--brand-soft);color:var(--brand-strong);font-family:var(--serif)">{{ t.name[0] }}</span><span class="t2"><b>{{ t.name }}</b><small>{{ t.slug }}.lulur.app</small></span></span></td>
                                <td>{{ t.region }}</td>
                                <td class="muted">{{ t.currency }} · {{ t.timezone }}</td>
                                <td class="n">{{ t.locations }}</td>
                                <td>{{ t.plan }}</td>
                                <td class="n">{{ t.bookings_30d.toLocaleString() }}</td>
                                <td><span class="badge" :class="t.status === 'active' ? 'ok' : 'warn'">{{ t.status }}</span></td>
                                <td class="n"><button class="btn sm"><Icon xs name="log-in" />Support login</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
            <p class="synthetic">Synthetic demo data. Phase 2 screen, shown to explain the multi-tenant design.</p>
        </div>
    </AdminLayout>
</template>

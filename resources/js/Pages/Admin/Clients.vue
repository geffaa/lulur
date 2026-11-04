<script setup>
import { ref } from 'vue'
import { Link, router } from '@inertiajs/vue3'
import AdminLayout from '@/Layouts/AdminLayout.vue'
import IconSprite from '@/Components/IconSprite.vue'
import Icon from '@/Components/Icon.vue'

const props = defineProps({ clients: Array, search: String })
const q = ref(props.search ?? '')
function apply() { router.get(route('admin.clients'), { search: q.value }, { preserveState: true }) }
</script>

<template>
    <AdminLayout>
        <IconSprite />
        <div class="content">
            <div class="ph">
                <div><h1>Clients</h1><p>Preferences, forms and packages live on each profile.</p></div>
                <div class="acts"><button class="btn primary"><Icon sm name="plus" />New client</button></div>
            </div>
            <section class="card">
                <div class="card-h">
                    <div class="input" style="max-width:280px;height:34px">
                        <Icon sm name="users" />
                        <input v-model="q" placeholder="Search name, phone or email…" style="border:0;outline:0;background:none;width:100%;font:inherit" @keydown.enter="apply">
                    </div>
                    <button class="btn sm" @click="apply">Search</button>
                </div>
                <div class="tablewrap">
                    <table class="t">
                        <thead><tr><th>Client</th><th>Phone</th><th class="n">Visits</th><th>Package</th></tr></thead>
                        <tbody>
                            <tr v-for="c in clients" :key="c.id" style="cursor:pointer">
                                <td><Link :href="route('admin.clients.show', c.id)" class="cellp">
                                    <span class="av" :class="'av-' + c.hue">{{ c.initials }}</span>
                                    <span class="t2"><b>{{ c.name }}</b><small>{{ c.email ?? '' }}</small></span>
                                </Link></td>
                                <td class="num">{{ c.phone }}</td>
                                <td class="n">{{ c.visits }}</td>
                                <td><span v-if="c.has_package" class="badge gold"><Icon xs name="ticket" />Active</span><span v-else class="muted small">—</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    </AdminLayout>
</template>

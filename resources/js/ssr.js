import { createInertiaApp } from '@inertiajs/vue3'
import { createSSRApp, h } from 'vue'
import { ZiggyVue } from 'ziggy-js'
import '../css/app.css'

createInertiaApp({
    title: (title) => (title ? `${title} · Lulur` : 'Lulur'),
    resolve: (name) => {
        const pages = import.meta.glob('./Pages/**/*.vue', { eager: true })
        return pages[`./Pages/${name}.vue`]
    },
    setup({ App, props, plugin }) {
        return createSSRApp({ render: () => h(App, props) }).use(plugin).use(ZiggyVue)
    },
})

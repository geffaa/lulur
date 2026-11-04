import '@fontsource-variable/hanken-grotesk'
import '@fontsource-variable/literata'
import { createInertiaApp } from '@inertiajs/vue3'
import { createApp, h } from 'vue'
import { ZiggyVue } from 'ziggy-js'
import '../css/app.css'

createInertiaApp({
    title: (title) => (title ? `${title} · Lulur` : 'Lulur'),
    resolve: (name) => {
        const pages = import.meta.glob('./Pages/**/*.vue', { eager: true })
        return pages[`./Pages/${name}.vue`]
    },
    setup({ el, App, props, plugin }) {
        createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(ZiggyVue)
            .mount(el)
    },
    progress: { color: '#8C3B4A', showSpinner: false },
})

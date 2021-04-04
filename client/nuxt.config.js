export default {
    srcDir: 'src/',
    head: {
        title: 'vueeter',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },
    css: [
        'vuesax/dist/vuesax.css'
    ],
    plugins: [
        '@/plugins/vuesax'
    ],
    components: true,
    buildModules: [
        '@nuxt/typescript-build',
        '@nuxtjs/stylelint-module',
        '@nuxtjs/tailwindcss'
    ],
    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/pwa'
    ],
    axios: {},
    pwa: {
        manifest: {
            lang: 'en'
        }
    },
    build: {
    },
    router: {
        middleware: ['auth']
    }
}

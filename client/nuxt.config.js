import { langs } from './src/config/i18n'

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
        'vuesax/dist/vuesax.css',
        'assets/css/global.css'
    ],
    plugins: [
        '@/plugins/vuesax',
        '~/plugins/composition-api',
        '~/plugins/axios'
    ],
    components: true,
    buildModules: [
        '@nuxt/typescript-build',
        '@nuxtjs/stylelint-module',
        '@nuxtjs/tailwindcss',
        '@nuxt/typescript-build',
        [
            'nuxt-i18n',
            {
                defaultLocale: 'en',
                locales: [
                    {
                        code: 'en',
                        name: 'English'
                    },
                    {
                        code: 'pt',
                        name: 'Português'
                    }
                ],
                vueI18n: langs
              }
        ]
    ],
    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/pwa'
    ],
    axios: {
        baseURL: 'http://localhost:5050/api'
    },
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

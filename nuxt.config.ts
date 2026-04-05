// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    pages: true,

    runtimeConfig: {
        API_KEY: process.env.RESEND_API_KEY,
    },

    modules: [
        '@nuxt/eslint',
        '@nuxt/image',
        '@nuxt/ui',
        '@pinia/nuxt'
    ],

    css: ['~/assets/css/main.css', 'vue-toastification/dist/index.css'],

    build: {
        transpile: ['vue-toastification']
    }
})
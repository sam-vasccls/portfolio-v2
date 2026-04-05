import Toast, { useToast as useToastification } from 'vue-toastification'
import type { PluginOptions } from 'vue-toastification'

const options: PluginOptions = {
    position: 'bottom-right'
}

declare module '#app' {
    interface NuxtApp {
        $toastification: ReturnType<typeof useToastification>
    }
}

declare module 'vue' {
    interface ComponentCustomProperties {
        $toastification: ReturnType<typeof useToastification>
    }
}

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(Toast, options)

    return {
        provide: {
            toastification: useToastification()
        }
    }
})
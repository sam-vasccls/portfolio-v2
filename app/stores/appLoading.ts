import { defineStore } from 'pinia'

export const useAppLoadingStore = defineStore('appLoading', {
    state: () => ({
        isLoading: true
    }),
    getters: {
        $isLoading: (state) => state.isLoading
    },
    actions: {
        setLoading(value: boolean) {
            this.isLoading = value
        }
    }
})

<template>
    <AppLoadingScreen 
        v-if="isLoading"
        :cookie="hasVisitedCookie"
        @loading:finished="closeLoadingScreen" 
    />
    <NuxtLayout v-else>
        <NuxtPage/>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { useAppLoadingStore } from '@/stores/appLoading'

const hasVisitedCookie = useCookie<boolean>('has_visited', {
    maxAge: 30 * 60 * 60 * 24,
    sameSite: 'lax',
})

const appLoadingStore = useAppLoadingStore()
const isLoading = computed(() => appLoadingStore.$isLoading)

function closeLoadingScreen() {
    if (!hasVisitedCookie.value) {
        hasVisitedCookie.value = true
    }
    appLoadingStore.setLoading(false)
}
</script>

<style lang="scss">

</style>
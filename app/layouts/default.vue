<template>
    <div class="layout-wrapper" :data-theme="activeTheme">
        <AppLogo is-nav />
        <slot />
        <AppThemeButton />
    </div>
</template>

<script setup lang="ts">
const { activeTheme } = useTheme()

onMounted(() => {
    const htmlPage = document.getElementsByTagName('html')[0] as HTMLElement
    watch(activeTheme, () => {
        htmlPage.setAttribute('data-theme', activeTheme.value)
    })
})


</script>

<style lang="scss" scoped>
.layout-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    min-height: 100vh;
    width: 100%;
}

.layout-content {
    display: contents;
}
</style>
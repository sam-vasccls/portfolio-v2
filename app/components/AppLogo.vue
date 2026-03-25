<template>
    <div class="app-logo">
        <svg width="100%" height="100%" viewBox="0 0 20 41" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.0214 0L14.5277 0.493719C11.4102 3.92846 15.5991 6.55855 17.6892 5.77713L4.20174 10.8197L2.38981 12.6316L19.0265 20.0257L16.0638 22.3849L19.0265 24.0308L1.00342 34.3774L16.0638 22.3849L1.00342 14.018L2.38981 12.6316L1.00342 12.0154L4.20174 10.8197L14.5277 0.493719C14.6755 0.330862 14.8397 0.166197 15.0214 0Z" :fill="currentColor"/>
            <path d="M4.00496 40.1546L4.49624 39.6633C7.61522 36.2268 3.38746 33.5916 1.00111 34.4806L14.8314 29.3282L16.6366 27.523L-0.000175633 20.1289L2.96253 17.7697L-0.000175283 16.1237L18.023 5.77713L2.96253 17.7697L18.023 26.1366L16.6366 27.523L18.023 28.1392L14.8314 29.3282L4.49624 39.6633C4.34914 39.8254 4.1857 39.9892 4.00496 40.1546Z" :fill="currentColor"/>
        </svg>
    </div>
</template>

<script setup>
const { activeTheme } = useTheme()
const currentColor = ref(null)

watch(activeTheme, () => {
    currentColor.value = getComputedStyle(document.documentElement).getPropertyValue('--color-base-content') || '#000000'
})
</script>

<style lang="scss" scoped>
.app-logo {
    position: absolute;
    top: 1rem;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 50px;
}
</style>
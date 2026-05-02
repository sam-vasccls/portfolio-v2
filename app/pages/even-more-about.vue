<template>
    <div>
        Hi! Good to see you!

        <AppButton @click="goToHome">
                Back to Home
        </AppButton>
    </div>
</template>

<script setup>
const router = useRouter()

function goToHome() {
    router.go(-1)
}
</script>

<style lang="scss" scoped>

</style>
<template>
    <img :src="source" alt="Logo">
</template>

<script setup>
const props = defineProps({
    text: {
        type: String,
        required: true
    }
})

const { text } = toRefs(props)

const source = computed(() => {
    switch (text.value) {
        case 'cool':
            return '/svgs/cool-balloon.svg'
        default:
            return '/svgs/default-balloon.svg'
    }
})

</script>

<style lang="scss" scoped>

</style>
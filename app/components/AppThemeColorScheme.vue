<template>
    <div class="color-scheme" :style="{ backgroundColor: bgColor }">
        <div v-for="(color, index) in baseColors" :key="`${color}-${index}`" :style="{ backgroundColor: color }" class="color-scheme__option"/>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    colors: string[],
}>()

const { colors } = toRefs(props)
const baseColors = computed(() => colors.value.slice(0, 4) as string[])
const bgColor = computed(() => colors.value.at(-1) as string)
</script>

<style lang="scss" scoped>
.color {
    &-scheme {
        display: grid;
        align-items: center;
        justify-content: center;
        row-gap: 0;
        padding: 6px 4px;
        grid-template-columns: 10px 10px;
        width: 32px;
        height: 32px;
        border-radius: 12px;
        box-shadow: 0 1px 3px 1px hsl(0, 0% ,0%, 0.2);
        min-width: 2rem;
        
        &__option {
            border-radius: 8px;
            height: 6px;
            align-self: center;
            justify-self: center;
            width: 6px;
        }
    }

}
</style>
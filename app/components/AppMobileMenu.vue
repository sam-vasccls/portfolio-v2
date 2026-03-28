<template>
    <ul class="app-menu fixed bottom-8 left-1/2 -translate-x-1/2 sm:hidden glass shadow-2xl app-menu-horizontal app-rounded-box mt-6 w-max">
        <li>
            <a class="app-tooltip" data-tip="Home">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            </a>
        </li>
        <li>
            <a class="app-tooltip" data-tip="Details">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            </a>
        </li>
        <li>
            <a class="app-tooltip" data-tip="Stats">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            </a>
        </li>
        <li>
            <button :disabled="isHappy" class="app-tooltip" data-tip="I like this app" @click="makeHappy">
                <Icon :class="[isHappy && 'opacity-50 text-gray-400']" name="material-symbols:heart-smile-rounded" size="20"/>
            </button>
        </li>
        <li>
            <button :disabled="isSad" class="app-tooltip" data-tip="I don't like this app" @click="makeSad">
                <Icon :class="[isSad && 'opacity-50 text-gray-400']" name="material-symbols:sad-tab-rounded" size="20"/>
            </button>
        </li>
    </ul>
</template>

<script setup>
const isSad = computed(() => sentiment.value < 49)
const isHappy = computed(() => sentiment.value > 100)
</script>

<style lang="scss" scoped>

</style>
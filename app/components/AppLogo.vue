<template>
    <div :class="['app-logo', { 'is-nav': isNav, 'is-card': isCard, 'is-footer': isFooter }]">
        <!-- <img :src="`/svgs/logo.svg`" alt="App Logo" class="logo"> -->

        <svg class="logo" viewBox="0 0 120 128" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path class="shadow" d="M58.5 9.29163L0.207085 59C-0.0690576 59.2761 -0.0690137 68.0996 0.207129 68.3757L23.3133 91.4789C23.5598 91.7254 23.9169 91.8257 24.2557 91.7437L67.7273 81.2189C68.6797 80.9884 69.3421 82.1117 68.7319 82.8307C68.6909 82.8789 68.6408 82.9183 68.5883 82.9536L43.1831 100.041C42.7863 100.307 42.2843 100.667 42.2645 101.145C42.2096 102.472 42.4071 105.641 42.4193 109.958C42.42 110.224 42.5252 110.479 42.7128 110.667L59.0073 126.962C59.3962 127.35 60.0261 127.352 60.4173 126.966L119.028 69.0522C119.359 68.7256 119.168 64.6327 119.162 64.1681C119.134 62.1032 119.094 60.0097 119.045 59.5792C119.038 59.522 119.004 59.4845 118.955 59.4539L95.6993 44.8325C95.636 44.7927 95.5786 44.7443 95.5201 44.6977C95.2803 44.5065 94.9637 44.4347 94.6616 44.5078L51.19 55.0325C50.2062 55.2707 49.5318 54.0641 50.2501 53.3509L76.4949 27.2942C76.8655 26.9262 76.8853 18.8892 76.558 17.6474C76.5302 17.5421 76.4452 17.4754 76.3476 17.4271L60.0603 9.3658C59.9627 9.31752 59.8762 9.25001 59.7878 9.18658C59.3976 8.90673 58.8513 8.94164 58.5 9.29163Z" fill="url(#paint0_linear_84_44)"/>
            <path class="shadow" d="M58.5 0.291626L0.207129 58.3757C-0.0690137 58.6519 -0.0690137 59.0996 0.207129 59.3757L23.3133 82.4789C23.5598 82.7254 23.9169 82.8257 24.2557 82.7437L67.7273 72.2189C68.7111 71.9808 69.3855 73.1873 68.6672 73.9005L42.4224 99.9573C42.0295 100.347 42.0284 100.983 42.4199 101.374L59.0073 117.962C59.3962 118.35 60.0261 118.352 60.4173 117.966L119.028 60.0522C119.143 59.9393 119.207 59.7853 119.207 59.6247C119.207 59.4653 119.144 59.3124 119.031 59.1997L95.604 35.7726C95.3575 35.5261 95.0004 35.4258 94.6616 35.5078L51.19 46.0325C50.2062 46.2707 49.5318 45.0641 50.2501 44.3509L76.4949 18.2942C76.8879 17.904 76.889 17.2689 76.4975 16.8774L59.913 0.292893C59.5229 -0.0971358 58.8908 -0.0977028 58.5 0.291626Z" fill="url(#paint1_linear_84_44)"/>
            <defs>
            <linearGradient id="paint0_linear_84_44" x1="59.6034" y1="0" x2="59.6034" y2="118.254" gradientUnits="userSpaceOnUse">
                <stop stop-color="var(--color-primary-content)"/>
                <stop offset="1" stop-color="var(--color-secondary)"/>
            </linearGradient>
            <linearGradient id="paint1_linear_84_44" x1="59.6034" y1="0" x2="59.6034" y2="118.254" gradientUnits="userSpaceOnUse">
                <stop stop-color="var(--color-primary)"/>
                <stop offset="1" stop-color="var(--darker-80)"/>
            </linearGradient>
            </defs>
        </svg>
    </div>
</template>

<script setup>
defineProps({
    isNav: Boolean,
    isCard: Boolean,
    isFooter: Boolean
})
</script>

<style lang="scss" scoped>
.app-logo {
    display: block;
    width: 75px;
    height: 75px;
    transition: transform 0.3s ease;
    backface-visibility: hidden;

    &.is-nav {
        position: absolute;
        top: 1rem;
        cursor: pointer;
        animation: logoFloat 5s ease-in-out infinite;
    }

    &.is-card {
        width: 40%;
        height: 40%;
    }

    &.is-footer {
        width: 35px;
        height: 35px;
        animation: none;
    }

    & .logo {
        width: 100%;
        height: 100%;
        filter:
            drop-shadow(0 0 3px var(--color-secondary))
            drop-shadow(0 0 6px var(--color-primary))
            drop-shadow(0 0 12px color-mix(in srgb, var(--color-primary) 50%, transparent));
        transition: filter 0.3s ease;
        -webkit-filter: drop-shadow(0 0 3px var(--color-secondary))
            drop-shadow(0 0 6px var(--color-primary))
            drop-shadow(0 0 12px color-mix(in srgb, var(--color-primary) 50%, transparent));
        transition: filter 0.3s ease, transform 0.3s ease;
    }
}
</style>
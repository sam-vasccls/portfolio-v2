<template>
    <div class="wrapper" :data-theme="activeTheme" :style="{ filter: `saturate(${sentiment}%)` }">
        <nav class="app-navbar nav z-50 sticky top-0 left-0 px-16">
            <div class="app-navbar-start">
                <ul
                    class="flex items-center gap-12 text-sm font-medium">
                    <li><NuxtLink class="nav-option" to="/">Homepage</NuxtLink></li>
                    <li><NuxtLink class="nav-option" to="/themefy">Themes</NuxtLink></li>
                    <li><NuxtLink class="nav-option" to="#portfolio">Portfolio</NuxtLink></li>
                </ul>
            </div>
            <div class="app-navbar-center w-max">
                <h1 class="text-lg font-bold uppercase">test</h1>
            </div>
            <div class="app-navbar-end">
                <AppThemeButton />
            </div>
        </nav>
        <slot />
    </div>
</template>

<script setup lang="ts">
const { activeTheme } = useTheme()
const { sentiment } = useEmotionRegulator()

onMounted(() => {
    const htmlPage = document.getElementsByTagName('html')[0] as HTMLElement
    watch(activeTheme, () => {
        htmlPage.setAttribute('data-theme', activeTheme.value)
    })
})


</script>

<style lang="scss" scoped>
.wrapper {
    width: 100%;

    & .nav {
        backdrop-filter: blur(8px);
        box-shadow: 0 1px 20px -10px var(--color-base-300);

        & ul {
            font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        }
    }

    & .nav-option {
        position: relative;
        transition: 400ms;

        &::before, &::after {
            content: '';
            display: block;
            position: absolute;
            top: 55%;
            transform: translateY(-50%) rotateZ(45deg);
            border-radius: 50px;
            height: 4px;
            background: linear-gradient(75deg, var(--color-base-content) 40%, var(--color-base-100));
            width: 4px;
            transform: rotate('45deg');
            transition: 400ms ease-in-out;
        }

        &:hover {
            letter-spacing: 2px;
        }

        &::before {
            left: -1rem;
            opacity: 0;
        }

        &::after {
            right: -1rem;
            opacity: 0;
        }

        &:hover::before {
           left: -0.6rem;
            opacity: 1;
        }

        &:hover::after {
           right: -0.6rem;
            opacity: 1;
        }
    }
}
</style>
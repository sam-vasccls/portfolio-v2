<template>
    <div class="relative theme" title="Change Theme" @click="toggleThemeOptions">
        <button ref="themeBtn" class="app-btn theme__btn cursor-pointer">
            <div ref="selectedThemeRef" class="theme__btn__square">
                <AppThemeColorScheme :colors="activeColors" />
            </div>
            <Icon v-if="isThemeOpen" class="btn-icon" name="material-symbols:close-small-outline-rounded" size="16" @click.prevent />
            <Icon v-else class="btn-icon" name="material-symbols:keyboard-arrow-down-rounded" size="16" @click.prevent />
        </button>

        <TransitionGroup name="theme-options" tag="div">
            <div v-if="isThemeOpen" ref="themeOptions" class="app-menu-vertical theme__options">
                <span class="theme__options__title">{{activeTheme}}</span>
                <button
                    v-for="color in Object.entries(colors)"
                    :key="color[0]"
                    class="theme__options__option flex content-center justify-start gap-4 app-btn-sm"
                    :data-set-theme="color[0]"
                    @click="defineTheme(color)"
                >
                    <AppThemeColorScheme :colors="color[1]" />
                    <span>{{ color[0] }}</span>
                    <span v-show="activeTheme === color[0]" class="check">
                        <Icon name="material-symbols:check-rounded" size="20" />
                    </span>
                </button>
            </div>
        </TransitionGroup>
    </div>
</template>

<script setup lang="ts">
import { themeChange } from 'theme-change'

const { activeTheme, activeColors, colors, defineTheme } = useTheme()

const selectedThemeRef = ref<HTMLElement | null>(null)
const themeBtn = ref<HTMLElement | null>(null)
const themeOptions = ref<HTMLElement | null>(null)

const isThemeOpen = shallowRef(false)

function toggleThemeOptions() {
    isThemeOpen.value = !isThemeOpen.value
}

function onClickOutside(event: MouseEvent) {
    const target = event.target as Node | null
    if (!target) return

    const btn = themeBtn.value
    const options = themeOptions.value

    if (btn?.contains(target) || options?.contains(target)) return
    isThemeOpen.value = false
}

function updateTheme() {
    const themeWheel = selectedThemeRef.value
    const arr = activeColors.value
    if (!themeWheel || !arr || arr.length < 5) return
}

onMounted(() => {
    themeChange(false)
    updateTheme()

    if (import.meta.client) {
        window.addEventListener('click', onClickOutside)
    }
})

onBeforeUnmount(() => {
    if (import.meta.client) {
        window.removeEventListener('click', onClickOutside)
    }
})

watch(activeColors, updateTheme)
</script>

<style lang="scss" scoped>
.theme {
    position: absolute;
    z-index: 5;
    top: 1rem;
    right: 1rem;
    display: flex;
    width: 100px;
    border: none;

    & .btn-icon {
        user-select: none;
        pointer-events: none;
        color: var(--color-primary-content);
    }
    
    &__btn {
        background-color: var(--lighter-20);
        display: flex;
        transition: 400ms;
        border: none;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        padding-inline: 0.5rem;
        gap: 0.4rem;
        border-radius: var(--radius-box);

        &__square {
            border-radius: 12px;
            width: 2rem;
            height: 2rem;
            
            & .square {
                border-radius: 12px;
            }
        }

        & span {
            font-size: 0.75rem;
        }
    }

    &__options {
        position: absolute;
        top: 4rem;
        left: -12rem;
        max-height: 500px;
        overflow-y: scroll;
        overflow-x: hidden;
        width: 15rem;
        padding: 0.3rem 0.6rem 1rem;
        background-color: var(--color-base-300);
        border-radius: var(--radius-box);
        display: flex;
        flex-direction: column;
        z-index: 2;
        box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
        gap: 0.2rem;
        user-select: none;

        @media (min-width: 376px) {
            left: -9.5rem;
        }

        &__title {
            display: inline-block;
            text-transform: capitalize;
            font-weight: 700;
            font-size: 0.75rem;
            padding: 0.4rem;
            margin-bottom: 0.4rem;
            border-bottom: 1px solid var(--color-base-200);
        }

        &__option {
            font-size: 0.75rem;
            display: flex;
            font-weight: 400;
            cursor: pointer;
            align-items: center;
            border-radius: var(--radius-box);
            padding: 0.2rem 0.3rem;
            width: 100%;

            &:hover {
                background-color: var(--color-neutral-content);
                color: var(--color-neutral);
            }

            & span {
                display: block;
                font-size: 16px;
            
                &.check {
                    display: flex;
                    justify-content: flex-end;
                    flex: 1;
                }
            }

        }
    }
}

.theme-options-enter-active,
.theme-options-leave-active {
    transition: all 400ms ease;
}
.theme-options-enter-from,
.theme-options-leave-to {
    opacity: 0;
    transform: translateY(24px);
}

.theme-icon-enter-active,
.theme-icon-leave-active {
    transition: all 400ms ease;
}
.theme-icon-enter-from,
.theme-icon-leave-to {
    opacity: 0;
    transform: translateY(-10px)
}
</style>


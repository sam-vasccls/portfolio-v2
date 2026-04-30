<template>
    <div v-if="fancyBtn" class="btn-wrapper">
        <div class="hover-wrapper">
            <div class="bottom-shadow"/>
            <button
                :class="['super-btn', isDarkTheme ? 'dark' : 'light']" 
            >
                <div class="text-shadow-wrapper">
                    <span class="text-shadow-wrapper__text-shadow">
                        <slot/>
                    </span>
                </div>
                <span class="text">
                    <slot/>
                </span>
            </button>
        </div>
    </div>
    <button
        v-else
        :class="['normal-btn', isDarkTheme ? 'dark' : 'light']" 
    >
        <slot/>
    </button>
</template>

<script setup lang="ts">
const { isDarkTheme } = useTheme()

defineProps<{
    fancyBtn?: boolean
}>()
</script>

<style lang="scss" scoped>

.normal-btn:hover {
    transform: scale(1.1);
    letter-spacing: 4px;
    word-spacing: 2px;
}

.normal-btn:hover :deep(.icon) {
    animation: send 750ms cubic-bezier(0,.7,.36,2.06);
}

.normal-btn:active {
    transform: scale(0.95);
}

.text, .text-shadow-wrapper {
    text-align: center;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    transform-origin: center center;
}

.text {
    transition: transform 300ms ease-in-out, opacity 200ms, animation 300ms ease-in-out;
    transform-style: preserve-3d;
}

.text-shadow-wrapper {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    border-radius: var(--radius-box);
    height: 100%;
    overflow: hidden;
    transition: transform 200ms ease-in-out, opacity 200ms ease-in-out;
    perspective: 100px;
    -webkit-perspective: 100px;
    -moz-perspective: 100px;
    -ms-perspective: 100px;
    perspective-origin: center;
    transform-style: preserve-3d;
    
    &__text-shadow {
        display: inline-block;
        color: transparent;
        padding-block: 2px;
        opacity: 1;
        transform-style: preserve-3d;
        transform: scale(1);
        transition: 200ms ease;
    }
}

.hover-wrapper {
    position: relative;
    padding: 2px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    perspective: 500px;
    -webkit-perspective: 500px;
    -moz-perspective: 500px;
    -ms-perspective: 500px;
    perspective-origin: center;

    & .bottom-shadow {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        width: 100%;
        background: radial-gradient(var(--darker-10), var(--color-primary), transparent, transparent);
        transform-style: preserve-3d;
        opacity: 0.145;
        transform: rotateX(50deg) translateY(30px) scale(0.2);
        transition: opacity 200ms ease, transform 200ms ease;
    }

     &:hover .bottom-shadow  {
        opacity: 0.4;
        transform: rotateX(10deg) translateY(45px) scale(0.8);
        animation: appear 5s ease-in-out infinite;
    }
}

.super-btn, .normal-btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    appearance: none;
    min-width: 0;
    max-width: fit-content;
    background: linear-gradient(var(--color-primary));
    color: var(--color-primary-content);
    border-radius: var(--radius-box);
    border-width: 0;
    box-sizing: border-box;
    cursor: pointer;
    font-family: "JetBrains Mono", monospace;
    height: 48px;
    line-height: 1;
    text-transform: capitalize;
    text-align: center;
    padding: 1rem 0.75rem;
    position: relative;
    transition: box-shadow 100ms, 
        background 500ms ease-in-out,
        text-shadow 250ms 100ms ease-out, 
        outline 300ms, 
        transform 300ms ease-in-out,
        letter-spacing 300ms,
        opacity 300ms;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    white-space: nowrap;
    will-change: box-shadow, transform;
    font-size: 16px;
    transform-style: preserve-3d;
    perspective: 100px;
    -webkit-perspective: 100px;
    -moz-perspective: 100px;
    -ms-perspective: 100px;
    perspective-origin: center;
    -webkit-perspective-origin: center;
    -ms-perspective-origin: center;
    -moz-perspective-origin: center;

    outline: 3px solid transparent;
    outline-offset: 3px;
    box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px, var(--darker-20) 0 -3px 0 inset;
}

.btn-wrapper {
    padding-inline: 2rem;
    transform: scale(1.4);

    // focus outline
    &:focus-within button:focus-visible {
        outline: 2px solid var(--color-base-content);
        outline-style: dashed;
        outline-offset: 4px;

        &:active {
            outline-color: var(--color-base-100);
        }
    }

    &:hover .hover-wrapper{
        animation: float 5s ease-in-out infinite;
    }

    // Hover State
    &:hover button {
        padding-bottom: 18px;
        letter-spacing: 4px;
        outline-offset: 4px 4px 26px 4px;
        outline-style: dashed;
        transform: rotateX(16deg) translateY(-2px);
        transition: 300ms ease-in-out, letter-spacing 300ms ease, outline 300ms ease, animation 300ms ease;

        & .text {
            transform: translateY(-8px) scale(1.3) translateZ(2px);
            animation: textFloat 5s 300ms ease-in-out infinite;
        }

        // Text Shadow
        & .text-shadow-wrapper__text-shadow {
            letter-spacing: 6px;
            opacity: 1;
            transform: scale(1.2) translateY(2px) scaleY(1.35);
            filter: blur(0.5px);
            animation: textShadowFloat 5s 300ms ease-in-out infinite;

            // Light Ray Effect
             &::after {
                content: "";
                position: absolute;
                top: 20px;
                left: 20px;
                transform: translateX(10px) rotate(-45deg) scale(1.5);
                width: 100%;
                height: 100%;
                background: var(--lighter-80);
                border-radius: var(--radius-box);
                opacity: 0.5;
                filter: blur(4px);
                animation: lightRay 2500ms ease-in-out infinite;
            }
        }

        // Light theme hover
        &.light {
            font-weight: 600;
            background: linear-gradient(to right, var(--lighter-30),  var(--color-primary), var(--darker-20) 90%);
            box-shadow:
                inset 3px 7px 7px transparent,
                0 0 8px 1px transparent,
                0 0 30px 0px transparent,
                var(--darker-20) 0 2px 4px,
                var(--color-primary) 0 7px 13px -3px,
                var(--darker-20) 0 -5px 0 inset,
                var(--darker-50) -3px -3px 20px -10px inset,
                var(--lighter-40) 0 -6px 0px 0 inset;

            & .text-shadow-wrapper__text-shadow {
                font-weight: normal;
                color: var(--darker-40);
            }

            & .text {
                text-shadow: 1px 1px var(--darker-40),
            }
        }

        // Dark theme hover
        &.dark {
            font-weight: 600;
            background: linear-gradient(to right, var(--lighter-20) 10%,  var(--color-primary), var(--darker-30) 90%);
            box-shadow:
                inset 1px 2px 6px transparent,
                3px 7px 7px transparent inset,
                -2px -7px 7px 0px transparent inset,
                0 0 8px 1px transparent,
                var(--color-primary) 0 2px 4px,
                var(--color-primary) 0 7px 13px -3px,
                var(--lighter-20) 0 -5px 0 inset;

            & .text-shadow-wrapper__text-shadow {
                font-weight: normal;
                color: var(--lighter-30);
            }

            & .text {
                text-shadow: 1px 1px var(--lighter-40),
            }
        }
    }

    // Click State

    & button:active  {
        padding-bottom: 16px;
        transform: rotateX(16deg) translateZ(-5px) translateY(5px);
        background: linear-gradient(var(--color-primary));
        transition: box-shadow 100ms, transform 200ms;

        & .text {
            transform: translateY(0) scale(0.95);
            text-shadow: none;
            animation: none;
        }

        & .text-shadow-wrapper__text-shadow {
            opacity: 0;
            transform: scale(0.8) scaleY(1) translateY(0);
            color: transparent;
            animation: none;
            transition: transform 300ms;
        }

        &.light {
            font-weight: normal;
            box-shadow:
                inset 3px 7px 7px var(--darker-40),
                0 0 8px 1px var(--lighter-20),
                0 0 30px 0px var(--color-primary),
                0 2px 4px transparent,
                0 7px 13px -3px transparent,
                0 -5px 6px 0px var(--darker-40) inset,
                -15px 0px 16px -5px var(--darker-50) inset,
                15px 0px 16px -5px var(--darker-50) inset,
                -3px -3px 20px -10px transparent inset,
                0 -6px 0px 0px transparent inset;
        }

        &.dark {
            font-weight: normal;
            box-shadow:
                0 0 0 0 transparent,
                var(--darker-80) 1px 2px 6px inset,
                var(--darker-40) 3px 7px 7px inset,
                0 0 8px 1px color-mix(in srgb, var(--color-base-100), black 20%),
                0 2px 4px transparent,
                0 7px 13px -3px transparent,
                -2px -7px 7px 0px var(--lighter-10) inset;
                // -15px 0px 16px -5px var(--darker-50) inset,
                // 15px 0px 16px -5px var(--darker-50) inset;
        }
    }
}

// Animations

@keyframes textFloat {
    0%, 100% {
        transform: translateY(-8px) scale(1.3) translateZ(2px);
    }
    50% {
        transform: translateY(-14px) scale(1.3) translateZ(2px);
    }
}

@keyframes textShadowFloat {
    0%, 100% {
        transform: scale(1.2) translateY(2px) scaleY(1.35);
    }
    45%, 51% {
        transform: scale(1.2) translateY(-3px) scaleY(0.95);
    }
    50% {
        transform: scale(1.2) translateY(-3px) scaleY(0.95);
    }
}

@keyframes appear {
    0% {
        opacity: 0.3;
        transform: rotateX(50deg) translateY(60px) scale(0.8);
    }
    50% {
        opacity: 0;
        transform: rotateX(50deg) translateY(60px) scale(1);
    }
    100% {
        opacity: 0.3;
        transform: rotateX(50deg) translateY(60px) scale(0.8);
    }
}

@keyframes lightRay {
    0% {
        transform: translateX(-100%) translateX(10px) rotate(-30deg) scale(1.5);

    }
    40%, 100% {
        transform: translateX(100%) translateX(10px) rotate(-30deg) scale(1.5);
    }
}
</style>
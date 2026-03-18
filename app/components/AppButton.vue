<template>
    <div class="btn-wrapper">
        <div class="hover-wrapper">
            <div class="bottom-shadow"/>
            <button
                :class="['main-btn', isDarkTheme ? 'dark' : 'light']" 
            >
                <div class="text-shadow-wrapper">
                    <span class="text-shadow-wrapper__text-shadow">
                        <slot>{{activeTheme}}</slot>
                    </span>
                </div>
                <span class="text">
                    <slot>{{activeTheme}}</slot>
                </span>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
const { isDarkTheme, activeTheme } = useTheme()
</script>

<style lang="scss" scoped>
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
    transition: transform 200ms ease-in-out, opacity 200ms;
    transform-style: preserve-3d;
}

.text-shadow-wrapper {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    overflow: hidden;
    transition: transform 200ms ease-in-out, opacity 200ms ease-in-out;
    
    &__text-shadow {
        color: transparent;
        padding-block: 2px;
        opacity: 0;
        transform-style: preserve-3d;
        transform: scale(0.2);
        transition: opacity 200ms ease, transform 200ms ease, color 200ms ease;
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
        background: radial-gradient(color-mix(in srgb, var(--color-primary), black 20%), var(--color-primary), transparent, transparent);
        transform-style: preserve-3d;
        opacity: 0;
        transform: rotateX(50deg) translateY(30px) scale(0.2);
        transition: opacity 200ms ease, transform 200ms ease;
    }

     &:hover .bottom-shadow  {
        opacity: 0.2;
        transform: rotateX(10deg) translateY(45px) scale(0.8);
        animation: appear 5s ease-in-out infinite;
    }
}

.main-btn {
    position: relative;
    align-items: center;
    appearance: none;
    min-width: 0;
    max-width: fit-content;
    background: linear-gradient(var(--color-primary));
    color: var(--color-primary-content);
    border-radius: var(--radius-box);
    border-width: 0;
    box-sizing: border-box;
    cursor: pointer;
    display: inline-flex;
    font-family: "JetBrains Mono", monospace;
    height: 48px;
    justify-content: center;
    line-height: 1;
    text-transform: capitalize;
    text-align: center;
    padding: 16px 12px;
    position: relative;
    transition: box-shadow 250ms, 
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
    box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px, color-mix(in srgb, var(--color-primary), black 20%) 0 -3px 0 inset;
}

.btn-wrapper {
    padding-inline: 2rem;
    
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

    // hover animations

    &:hover button {
        padding-bottom: 18px;
        letter-spacing: 4px;
        outline-offset: 4px 4px 26px 4px;
        outline-style: dashed;
        /* Combine base hover transform with mouse rotation (left/right only) */
        transform: rotateX(16deg) translateY(-2px);

        & .text {
            transform: translateY(-11px) scale(1.3) translateZ(2px);
        }

        & .text-shadow-wrapper__text-shadow {
            letter-spacing: 6px;
            opacity: 1;
            transform: scale(1.2) translateX(3px);
            filter: blur(0.5px);
        }

        // Light theme hover
        &.light {
            font-weight: 600;
            background: linear-gradient(to right, color-mix(in srgb, var(--color-primary), white 30%) 10%,  var(--color-primary), color-mix(in srgb, var(--color-primary), black 20%) 90%);
            box-shadow: color-mix(in srgb, var(--color-primary), black 20%) 0 2px 4px,
                var(--color-primary) 0 7px 13px -3px, 
                color-mix(in srgb, var(--color-primary), black 20%) 0 -5px 0 inset,
                color-mix(in srgb, var(--color-primary), black 50%) -3px -3px 20px -10px inset;

            & .text-shadow-wrapper__text-shadow {
                font-weight: normal;
                color: color-mix(in srgb, var(--color-primary), black 40%);
            }

            & .text {
                text-shadow: 1px 1px color-mix(in srgb, var(--color-primary), black 40%),
            }
        }

        // Dark theme hover
        &.dark {
            font-weight: 600;
            background: linear-gradient(to right, color-mix(in srgb, var(--color-primary), white 20%) 10%,  var(--color-primary), color-mix(in srgb, var(--color-primary), black 30%) 90%);
            box-shadow: var(--color-primary) 0 2px 4px, 
                var(--color-primary) 0 7px 13px -3px, 
                color-mix(in srgb, var(--color-primary), white 20%) 0 -5px 0 inset;

            & .text-shadow-wrapper__text-shadow {
                font-weight: normal;
                color: color-mix(in srgb, var(--color-primary), white 30%);
            }

            & .text {
                text-shadow: 1px 1px color-mix(in srgb, var(--color-primary), white 40%),
            }
        }
    }

    & button:active .hover-wrapper {
        animation: none;
    }

    & button:active  {
        padding-bottom: 16px;
        transform: rotateX(16deg) translateZ(-5px) translateY(5px);
        background: linear-gradient(var(--color-primary));

        & .text {
            transform: translateY(0) scale(0.95);
            text-shadow: none;
        }

        & .text-shadow-wrapper__text-shadow {
            opacity: 0;
            color: transparent;
            transform: scale(0.8) translateX(0);
        }

        &.light {
            font-weight: normal;
            box-shadow: 0 0 8px 1px color-mix(in srgb, var(--color-primary), white 20%),
            color-mix(in srgb, var(--color-primary), black 20%) 3px 7px 7px inset;
        }

        &.dark {
            font-weight: normal;
            box-shadow: 0 0 8px 1px color-mix(in srgb, var(--color-base-100), black 20%),
            color-mix(in srgb, var(--color-primary), black 40%) 3px 7px 7px inset;
        }
    }
}

@keyframes float {
    0% {
        transform: translateY(-10px);
    }
    50% {
        transform: translateY(-20px);
    }
    100% {
        transform: translateY(-10px);
    }
}

@keyframes appear {
    0% {
        opacity: 0.2;
        transform: rotateX(50deg) translateY(60px) scale(0.8);
    }
    50% {
        opacity: 0;
        transform: rotateX(50deg) translateY(60px) scale(1);
    }
    100% {
        opacity: 0.2;
        transform: rotateX(50deg) translateY(60px) scale(0.8);
    }
}
</style>
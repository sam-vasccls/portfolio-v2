<template>
    <div class="speed-dial" :class="{ 'is-open': isOpen }">

        <!-- Decorative arc -->
        <div class="speed-dial__arc" />

        <!-- Items via spoke layout -->
        <div
            v-for="(item, i) in items"
            :key="item.id"
            class="speed-dial__spoke"
            :style="{ '--spoke-angle': `${spokeAngles[i]}deg`, '--counter-rot': `${-spokeAngles[i]!}deg` }"
        >
            <div class="speed-dial__item-wrap">
                <button
                    ref="itemRefs"
                    class="speed-dial__item"
                    :aria-label="item.label"
                    @click="navigate(item.selector)"
                >
                    <span
                        :class="['speed-dial__label', { 
                            'home': item.id === 'home', 
                            'about': item.id === 'about', 
                            'services': item.id === 'services', 
                            'contact': item.id === 'contact' 
                        }]"
                    >{{ item.label }}</span>
                    <Icon :name="item.icon" size="20" />
                </button>
            </div>
        </div>

        <!-- FAB toggle button -->
        <button class="speed-dial__fab" aria-label="Toggle navigation" @click="isOpen ? closeDial() : openDial()">
            <span class="icon-menu"><Icon name="heroicons:bars-3" size="22" /></span>
            <span class="icon-close"><Icon name="heroicons:x-mark" size="22" /></span>
        </button>

    </div>
</template>

<script setup lang="ts">
const { $gsap: gsap } = useNuxtApp()

const items = [
    { id: 'home', label: 'Home', icon: 'heroicons:home', selector: null },
    { id: 'about', label: 'About', icon: 'heroicons:user', selector: '.section-about' },
    { id: 'tech', label: 'Tech', icon: 'heroicons:cpu-chip',   selector: '.section-tech' },
    { id: 'services', label: 'Services', icon: 'heroicons:briefcase', selector: '.section-services' },
    { id: 'contact', label: 'Contact', icon: 'heroicons:envelope', selector: '.section-contact' },
]

// 5 items fanning from -70° to +70° from straight up
// CSS rotate: 0° = right → up = -90° → spoke_css = direction_from_up - 90
const spokeAngles = [-160, -125, -90, -55, -20]

const isOpen = ref(false)
const itemRefs = ref<HTMLElement[]>([])

onMounted(() => {
    gsap.set(itemRefs.value, { scale: 0, opacity: 0 })
})

function openDial() {
    isOpen.value = true
    gsap.fromTo(
        itemRefs.value,
        { scale: 0, opacity: 0, filter: 'blur(14px)' },
        {
            scale: 1,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.55,
            stagger: { amount: 0.3, from: 'center' },
            ease: 'back.out(2.2)',
        }
    )
}

function closeDial() {
    gsap.to(itemRefs.value, {
        scale: 0,
        opacity: 0,
        filter: 'blur(8px)',
        duration: 0.28,
        stagger: { amount: 0.14, from: 'edges' },
        ease: 'back.in(1.5)',
        onComplete: () => { isOpen.value = false },
    })
}

function navigate(selector: string | null) {
    closeDial()
    setTimeout(() => {
        if (!selector) window.scrollTo({ top: 0, behavior: 'smooth' })
        else document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' })
    }, 320)
}
</script>

<style lang="scss" scoped>
.speed-dial {
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 300;
    width: 52px;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (min-width: 769px) {
        display: none;
    }
}

.speed-dial__arc {
    position: absolute;
    bottom: 26px; // aligns arc base with FAB center
    left: 50%;
    transform: translateX(-50%);
    width: 180px;
    height: 90px;
    border: 1px solid color-mix(in srgb, var(--color-base-content), transparent 82%);
    border-bottom: none;
    border-radius: 90px 90px 0 0;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.4s ease 0.1s;

    .is-open & {
        opacity: 1;
    }
}

/* ===== SPOKE - radiates outward from FAB center ===== */
.speed-dial__spoke {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 90px;
    height: 0;
    transform-origin: left center;
    transform: rotate(var(--spoke-angle));
    pointer-events: none;
}

/* ===== ITEM WRAP - counter-rotates item to stay screen-upright ===== */
.speed-dial__item-wrap {
    position: absolute;
    right: -22px; // item center lands exactly at spoke tip (90px from FAB center)
    top: -22px;
    width: 44px;
    height: 44px;
    transform: rotate(var(--counter-rot));
    pointer-events: all;
}

/* ===== ITEM BUTTON ===== */
.speed-dial__item {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: color-mix(in srgb, var(--color-base-200), transparent 20%);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    border: 1px solid color-mix(in srgb, var(--color-base-content), transparent 72%);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-base-content);
    position: relative;
    transition:
        background 0.2s ease,
        border-color 0.2s ease,
        color 0.2s ease,
        box-shadow 0.2s ease;

    &:hover {
        background: color-mix(in srgb, var(--color-primary), transparent 25%);
        border-color: color-mix(in srgb, var(--color-primary), transparent 40%);
        color: var(--color-primary);
        box-shadow: 0 0 14px 2px color-mix(in srgb, var(--color-primary), transparent 50%);
    }

    &:active {
        transform: scale(0.88);
    }
}

/* ===== LABEL - floats above item, fades in after items land ===== */
.speed-dial__label {
    position: absolute;
    bottom: calc(100% + 6px);
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    font-size: 0.58rem;
    font-family: 'JetBrains Mono', monospace;
    letter-spacing: 0.08em;
    line-height: 100%;
    text-transform: uppercase;
    padding: 4px 8px;
    border-radius: 4px;
    background: color-mix(in srgb, var(--color-base-300), transparent 20%);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    color: var(--color-base-content);
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s ease 0.2s;

    .is-open & {
        opacity: 1;
    }

    &.home {
        transform: translateX(-95%);
    }

    &.about {
        transform: translateX(-60%);
    }

    &.services {
        transform: translateX(-30%);
    }

    &.contact {
        transform: translateX(-5%);
    }
}

/* ===== FAB TOGGLE BUTTON ===== */
.speed-dial__fab {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background: color-mix(in srgb, var(--color-base-100), transparent 60%);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    border: 1px solid color-mix(in srgb, var(--color-base-content), transparent 68%);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 10;
    color: color-mix(in srgb, var(--color-base-content), transparent 25%);
    transition:
        background 0.35s ease,
        border-color 0.35s ease,
        box-shadow 0.35s ease,
        color 0.35s ease;

    .is-open & {
        background: var(--color-primary);
        border-color: var(--color-primary);
        box-shadow: 0 0 24px 6px color-mix(in srgb, var(--color-primary), transparent 45%);
        color: white;
    }

    // Icon cross-fade
    .icon-menu,
    .icon-close {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: opacity 0.2s ease, transform 0.3s ease;
    }

    .icon-menu {
        opacity: 1;
        transform: rotate(0deg);
    }

    .icon-close {
        opacity: 0;
        transform: rotate(-90deg);
    }

    .is-open & .icon-menu {
        opacity: 0;
        transform: rotate(90deg);
    }

    .is-open & .icon-close {
        opacity: 1;
        transform: rotate(0deg);
    }
}
</style>
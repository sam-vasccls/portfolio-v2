<template>
    <div class="layout-wrapper" :data-theme="activeTheme">
        <AppLogo is-nav />

        <nav class="side-nav" aria-label="Page sections">
            <div class="side-nav__track">
                <div
                    class="side-nav__track-fill"
                    :style="{ transform: `scaleY(${activeIndex <= 0 ? 0 : activeIndex / (navLinks.length - 1)})` }"
                />
            </div>

            <button
                v-for="(link, i) in navLinks"
                :key="link.id"
                :class="['side-nav__item', { 'is-active': activeSection === link.id, 'is-passed': i < activeIndex }]"
                type="button"
                :aria-label="`Navigate to ${link.label}`"
                @click="scrollToSection(link.selector)"
            >
                <span class="side-nav__dot-wrapper">
                    <span class="side-nav__ring" />
                    <span class="side-nav__dot" />
                </span>
                <span class="side-nav__label">{{ link.label }}</span>
            </button>
        </nav>

        <slot />
        <AppThemeButton />
    </div>
</template>

<script setup lang="ts">
const { activeTheme } = useTheme()

const navLinks = [
    { id: 'home', label: 'Home', selector: null },
    { id: 'about', label: 'About', selector: '.section-about' },
    { id: 'tech', label: 'Tech Stack', selector: '.section-tech' },
    { id: 'services', label: 'Services', selector: '.section-services' },
    { id: 'contact', label: 'Contact', selector: '.section-contact' },
]

const activeSection = ref('')
const activeIndex = computed(() => navLinks.findIndex(l => l.id === activeSection.value))

function scrollToSection(selector: string | null) {
    if (!selector) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
    }
    document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' })
}

function updateActiveSection() {
    if (window.scrollY < 80) {
        activeSection.value = 'home'
        return
    }

    const mid = window.innerHeight / 2
    let bestId = ''
    let bestDist = Infinity

    for (const link of navLinks) {
        if (!link.selector) continue
        const el = document.querySelector(link.selector)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.bottom < 0 || rect.top > window.innerHeight) continue
        const dist = Math.abs((rect.top + rect.height / 2) - mid)
        if (dist < bestDist) {
            bestDist = dist
            bestId = link.id
        }
    }

    activeSection.value = bestId
}

let rafId: number | null = null
function onScroll() {
    if (rafId !== null) return
    rafId = requestAnimationFrame(() => {
        updateActiveSection()
        rafId = null
    })
}

onMounted(() => {
    const htmlPage = document.getElementsByTagName('html')[0] as HTMLElement
    watch(activeTheme, () => {
        htmlPage.setAttribute('data-theme', activeTheme.value)
    })

    updateActiveSection()
    window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
    if (rafId !== null) cancelAnimationFrame(rafId)
})
</script>

<style lang="scss" scoped>
.layout-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    min-height: 100vh;
    width: 100%;
}

$dot-size: 12px;
$track-offset: 10px;

.side-nav {
    position: fixed;
    left: 1.75rem;
    top: 3rem;
    height: calc(50vh - 6rem);
    z-index: 200;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    animation: navSlideIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) 2.8s both;

    @media (max-width: 768px) {
        display: none;
    }

    &__track {
        position: absolute;
        left: calc($dot-size / 2);
        top: $track-offset;
        bottom: $track-offset;
        width: 2px;
        transform: translateX(-50%);
        background: color-mix(in srgb, var(--color-base-content), transparent 88%);
        border-radius: 2px;
        overflow: hidden;

        &-fill {
            position: absolute;
            inset: 0;
            background: color-mix(in srgb, var(--color-secondary), transparent 15%);
            transform-origin: top center;
            transform: scaleY(0);
            transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
            border-radius: 2px;
        }
    }

    // Each nav item button
    &__item {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        background: none;
        border: none;
        padding: 3px 0;
        cursor: pointer;
        outline: none;
        transition: filter 0.3s ease;

        &:focus-visible .side-nav__dot {
            box-shadow: 0 0 0 3px var(--color-primary);
        }

        // Hover (non-active) — secondary color, label slides in, unblur
        &:hover:not(.is-active) {
            filter: blur(0);

            .side-nav__dot {
                background: var(--color-secondary);
                box-shadow:
                    0 0 6px 1px var(--color-secondary),
                    0 0 14px 2px color-mix(in srgb, var(--color-secondary), transparent 55%);
                transform: scale(1.35);
            }

            .side-nav__ring {
                border-color: var(--color-secondary);
                opacity: 1;
                transform: scale(1);
            }

            .side-nav__label {
                color: var(--color-secondary);
                opacity: 1;
                transform: translateX(0);
            }
        }

        // Active — primary color, label always visible, unblur
        &.is-active {
            filter: blur(0);

            .side-nav__dot {
                background: var(--color-primary);
                box-shadow:
                    0 0 6px 1px var(--color-primary),
                    0 0 14px 2px color-mix(in srgb, var(--color-primary), transparent 55%);
                transform: scale(1.25);
            }

            .side-nav__ring {
                border-color: var(--color-primary);
                opacity: 0.65;
                transform: scale(1);
            }

            .side-nav__label {
                color: var(--color-primary);
                opacity: 1;
                transform: translateX(0);
            }
        }

        // Full ring opacity when hovering over active item
        &.is-active:hover .side-nav__ring {
            opacity: 1;
        }

        // Passed dots — match the track fill color
        &.is-passed .side-nav__dot {
            background: color-mix(in srgb, var(--color-secondary), var(--color-base-100) 15%);
        }
    }

    // Dot outer: holds ring + inner dot
    &__dot-wrapper {
        position: relative;
        width: $dot-size;
        height: $dot-size;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
    }

    // Expanding ring on hover/active
    &__ring {
        position: absolute;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 1.5px solid var(--color-primary);
        opacity: 0;
        transform: scale(0.4);
        transition:
            opacity 0.3s ease,
            transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
        pointer-events: none;
    }

    // Inner dot
    &__dot {
        width: $dot-size;
        height: $dot-size;
        border-radius: 50%;
        background: color-mix(in srgb, var(--color-base-content), var(--color-base-100) 80%);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        transition:
            background 0.3s ease,
            box-shadow 0.3s ease,
            transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
        position: relative;
        z-index: 2;
    }

    // Label — only on hover
    &__label {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.8rem;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        white-space: nowrap;
        color: var(--color-base-content);
        opacity: 0;
        transform: translateX(-6px);
        transition:
            opacity 0.3s ease,
            transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
            color 0.3s ease;
        user-select: none;
        pointer-events: none;
    }
}

@keyframes navSlideIn {
    from {
        opacity: 0;
        transform: translateX(-18px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}
</style>
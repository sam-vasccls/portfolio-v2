<template>
    <main class="main fade-in">
        <header class="section section-hero">
            <div class="section-hero__grid">
                <div class="section-hero__title">
                    <h3 ref="heroH3" class="hero-enter">
                        Hey, how's it going? <br> I'm <span :class="[activeTheme === 'abyss' ? 'span-secondary' : 'span-accent']">Sam</span>!
                    </h3>
                    <h1 id="title" ref="heroH1" :class="['section-hero__title-main gradient-text hero-enter', titlesStyle, activeTheme]">
                        <span>{{'<'}}</span>
                        Creative Frontend Developer
                        <span>{{'/>'}}</span>
                    </h1>
                    <div class="w-full text-center xs:py-6 flex justify-center items-center">
                        <h2 ref="heroH2" class="inline-block text-base md:text-lg w-[80%] hero-enter">
                            Crafting fast, accessible, and beautifully engineered web experiences. <br> From architecture to pixels.
                        </h2>
                    </div>
                    <div ref="heroBtn" class="section-hero__btn hero-enter">
                        <AppButton
                            :fancy-btn="windowWidth > phoneBreakpoint"
                            class="header-btn"
                            @mouseenter="onBalloonHover"
                            @mouseleave="onBalloonLeave"
                            @click="scrollToContent"
                        >
                            Explore more
                        </AppButton>
                        <BalloonTooltip text="cool" class="balloon balloon--cool" />
                    </div>
                </div>
                <HeroCard />
            </div>

            <div ref="scrollIndicator" class="scroll-indicator">
                <Icon name="material-symbols:keyboard-arrow-down-rounded" size="28" />
            </div>
        </header>

        <AboutSection />

        <TechSection />

        <ServicesSection />

        <ContactSection />

        <footer class="footer">
            <AppLogo is-footer />
            <p class="footer__text">
                © {{ currentYear }} · Developed with 
                <Icon name="material-symbols:favorite-rounded" size="16" class="footer__heart" /> 
                by
                <span class="footer__name">Sam Dev</span>
            </p>
        </footer>

        <Teleport to="body">
            <AppMobileMenu />
        </Teleport>
    </main>
</template>

<script setup lang="ts">
import debounce from 'lodash/debounce';

const currentYear = new Date().getFullYear()

const { activeTheme, titlesStyle } = useTheme()
const { $gsap: gsap } = useNuxtApp()

const windowWidth = ref(1000)
const handleResize = debounce(() => { windowWidth.value = window.innerWidth }, 300)
const phoneBreakpoint = 768

// Hero entrance refs
const heroH3 = ref(null)
const heroH1 = ref(null)
const heroH2 = ref(null)
const heroBtn = ref(null)
const scrollIndicator = ref<HTMLDivElement | null>(null)

let balloonTimer: ReturnType<typeof setTimeout> | null = null
let balloonHideTimeout: ReturnType<typeof setTimeout> | null = null
const HOVER_TIMER = 15000
const MOUSE_LEAVE_TIMER = 1500

function animateBalloonOut(el: Element) {
    clearTimeout(balloonHideTimeout as ReturnType<typeof setTimeout>)
    balloonHideTimeout = null
    gsap.killTweensOf(el)
    gsap.to(el, { opacity: 0, y: 20, scale: 0.7, filter: 'blur(20px)', duration: 0.5, ease: 'back.in(1.7)' })
}

const balloonCounter = shallowRef(0)
function onBalloonHover() {
    if (balloonTimer) return

    if(balloonCounter.value > 3) return
    balloonCounter.value++

    balloonTimer = setTimeout(() => {
        const balloon = document.querySelector('.balloon--cool')
        if (!balloon) return
        console.log('show balloon')
        gsap.fromTo(
            balloon,
            { opacity: 0, y: 30, x: -20, scale: 0.7, filter: 'blur(20px)' },
            {
                opacity: 1,
                y: 0,
                x: 0,
                scale: 1,
                filter: 'blur(0px)',
                duration: 0.7,
                ease: 'back.out(1.7)',
                onComplete: () => {
                    balloonHideTimeout = setTimeout(() => animateBalloonOut(balloon as HTMLElement), MOUSE_LEAVE_TIMER)
                }
            }
        )
    }, HOVER_TIMER)
}

function onBalloonLeave() {
    clearTimeout(balloonTimer as ReturnType<typeof setTimeout>)
    balloonTimer = null
    const el = document.querySelector('.balloon--cool')
    if (el && Number(gsap.getProperty(el, 'opacity')) > 0) {
        animateBalloonOut(el)
    } else {
        clearTimeout(balloonHideTimeout as ReturnType<typeof setTimeout>)
        balloonHideTimeout = null
    }
}

function scrollToContent() {
    document.querySelector('.section-about')?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
    if (import.meta.client) {
        window.addEventListener('resize', handleResize)
    }
    
    handleResize()

    // Staggered hero entrance
    const heroEls = [heroH3.value, heroH1.value, heroH2.value, heroBtn.value].filter(Boolean)
    gsap.fromTo(heroEls,
        { opacity: 0, x: -60, z: 50, filter: 'blur(40px)' },
        { opacity: 1, x: 0, z: 0, filter: 'blur(0px)', duration: 1, stagger: 0.45, ease: 'power3.out', delay: 2 }
    )

    // Fade in scroll indicator after hero entrance
    if (scrollIndicator.value) {
        gsap.fromTo(scrollIndicator.value,
            { opacity: 0 },
            { opacity: 1, duration: 0.5, delay: 1.2 }
        )
    }

    // Hide scroll indicator on first scroll
    function hideOnScroll() {
        if (!scrollIndicator.value) return
        gsap.to(scrollIndicator.value, { opacity: 0, duration: 0.3, onComplete: () => {
            if (scrollIndicator.value) scrollIndicator.value.style.display = 'none'
        }})
        window.removeEventListener('scroll', hideOnScroll)
    }
    window.addEventListener('scroll', hideOnScroll, { passive: true })

})

onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize)
})
</script>

<style scoped lang="scss">
.balloon {
    position: absolute;

    &--cool {
        opacity: 0;
        top: -3rem;
        right: -8rem;
    }
    
    @media (max-width: 768px) {
        display: none;
    }
}
.icon-dark {
    color: #000;
}
.icon-light {
    filter: invert(100%) sepia(100%) grayscale(100%) brightness(150%);
}

.main {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    height: 100%;
    width: 100%;
}

/* ========== HERO SECTION ========== */
.hero-enter {
    opacity: 0;
}

.section-hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: inherit;
    
        @media (max-width: 900px) {
        flex-direction: column;
        
        &__card {
            max-width: 350px;
            margin: 0 auto;
        }
        
        &__title {
            flex: 1;
            max-width: 100%;
            height: 100%;
            align-items: center;
            text-align: center;
        }
    }

    &::after {
        content: '';
        display: block;
        position: absolute;
        z-index: 0;
        top: 3rem;
        left: 75%;
        transform: translateX(-50%) rotate(45deg);
        width: 25rem;
        height: 25rem;
        border-radius: 100px;
        background-color: var(--color-secondary);
        filter: blur(110px);
        opacity: 0.2;
        pointer-events: none;
        animation: orbFloat 6s ease-in-out infinite;

        @media (max-width: 900px) {
            top: 50%;
            left: 75%;
        }
    }

    &::before {
        content: '';
        display: block;
        position: absolute;
        z-index: 0;
        top: 25rem;
        left: 5%;
        transform: translateX(-50%) rotate(45deg);
        width: 25rem;
        height: 25rem;
        border-radius: 100px;
        background-color: var(--color-accent);
        filter: blur(110px);
        opacity: 0.2;
        pointer-events: none;
        animation: orbFloat 8s ease-in-out infinite reverse;
    }

    &__grid {
        z-index: 1;
        display: flex;
        gap: 1rem;
        width: 100%;
        max-width: 1280px;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        padding-inline: 2rem;

        @media(max-width: 900px) {
            padding-inline: 1rem;
            grid-template-columns: 1fr;
            max-width: 100vw;
            height: max-content;
            flex-direction: column;
            padding: 8rem 1rem 12rem;
        }

        & .header-btn {

            @media(max-width: 900px) {
                position: absolute;
                bottom: 0rem;
                left: 50%;
                transform: translateX(-50%);
            }
        }
    }

    &__title {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        gap: 1.5rem;
        min-width: 0;
        max-width: 900px;
        height: 100%;

        @media(max-width: 768px) {
            align-items: center;
            justify-content: center;
        }

        & h1 {
            line-height: 1.2;
            text-align: center;
            opacity: 1;

            @media (max-width: 900px) {
                font-size: 3rem;
                text-align: center;
            }

            @media (max-width: 375px) {
                font-size: 2rem;
                text-align: center;
            }
        }

        & h2 {
            @media(max-width: 768px) {
                text-align: center;
            }
        }

        & h3 {
            width: max-content;
            text-align: right;
            font-family: "JetBrains Mono", monospace !important;
            padding-bottom: 1rem;

            @media(max-width: 768px) {
                width: 100%;
                text-align: left;
                justify-self: left;
                padding-left: 1rem;
            }
        }
    }

    &__title-main {
        font-size: 4rem;
        width: fit-content;
        font-weight: 700;
        font-family: 'Montserrat', 'Noto Sans', 'Google Sans', sans-serif;
        color: var(--color-base-content);
        position: relative;
        z-index: 2;
    }

    &__btn {
        position: relative;
        width: max-content;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 1.5rem auto 0;

        @media(max-width: 900px) {
            position: absolute;
            bottom: 4rem;
            left: 50%;
            transform: translateX(-50%);
        }
    }

    .gradient-text {
        background: linear-gradient(90deg, var(--color-primary), var(--color-accent), var(--color-secondary));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        color: transparent;

        &.light {
            background: linear-gradient(90deg, var(--color-primary), var(--color-primary), var(--color-accent), var(--color-secondary), var(--color-secondary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            background-size: 200% auto;
            background-position: 50% center;
        }

        &.bumblebee {
            background: linear-gradient(90deg, var(--color-primary), var(--color-accent), var(--color-secondary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
    }

}

.scroll-indicator {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
    color: var(--color-base-content);
    animation: scrollBounce 1.5s ease-in-out infinite;
    z-index: 2;
}

@keyframes scrollBounce {
    0%, 100% { transform: translateX(-50%) translateY(0); }
    50%      { transform: translateX(-50%) translateY(8px); }
}

@keyframes orbFloat {
    0%, 100% { transform: translate(0, 0); }
    50%      { transform: translate(-100px, 75px); }
}

/* ========== FOOTER ========== */
.footer {
    width: 100%;
    padding: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-base-100);
    border-top: 1px solid color-mix(in srgb, var(--color-base-content), transparent 90%);

    @media (max-width: 425px) {
        flex-direction: column;
        gap: 1.2rem;
    }

    &__text {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.8rem;
        color: color-mix(in srgb, var(--color-base-content), transparent 50%);
        margin: 0;
    }

    &__heart {
        color: var(--color-secondary);
        animation: heartbeat 1.4s ease-in-out infinite;
        display: inline-flex;
    }

    &__name {
        background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        font-weight: 700;
    }
}

@keyframes heartbeat {
    0%, 100% { transform: scale(1); }
    14%      { transform: scale(1.25); }
    28%      { transform: scale(1); }
    42%      { transform: scale(1.15); }
    56%      { transform: scale(1); }
}

.contact-info {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    justify-content: center;

    &__block {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        color: var(--color-primary);

        & h4 {
            font-weight: 700;
            font-size: 0.95rem;
            color: var(--color-base-content);
        }

        & p {
            font-size: 0.9rem;
            color: color-mix(in srgb, var(--color-base-content), transparent 30%);
            margin: 0.15rem 0 0;
        }
    }

    &__socials {
        display: flex;
        gap: 1rem;
        align-items: center;
        padding-top: 1rem;

        @media(max-width: 768px) {
            justify-content: center;
        }

        & a {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background: var(--color-base-200);
            color: var(--color-base-content);
            transition: all 0.25s ease;
            user-select: none;

            &:hover {
                background: var(--color-primary);
                transform: translateY(-3px);
                box-shadow: 0 6px 16px color-mix(in srgb, var(--color-primary), transparent 50%);
            }
        }
    }

    &__social-icon {
        width: 28px;
        height: 28px;
        object-fit: contain;
    }
}
</style>
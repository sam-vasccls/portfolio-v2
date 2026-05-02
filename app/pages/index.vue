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
                    <div class="w-full text-center py-6 flex justify-center items-center">
                        <h2 ref="heroH2" class="inline-block text-lg w-[80%] hero-enter">
                            Crafting fast, accessible, and beautifully engineered web experiences. From architecture to pixels.
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

        <!-- ========== MARQUEE + ABOUT ========== -->
        <section class="section section-about">
            <div class="about-marquee" aria-hidden="true">
                <div class="about-marquee__track">
                    <span v-for="(word, index) in actionsList" :key="'a' + index" class="about-marquee__word">
                        {{ word }} <span class="about-marquee__dot">·</span>
                    </span>
                    <span v-for="(word, index) in actionsList" :key="'b' + index" class="about-marquee__word">
                        {{ word }} <span class="about-marquee__dot">·</span>
                    </span>
                </div>
            </div>

            <div class="about-content">
                <h2 :class="['section-title about-title', titlesStyle]">About Me</h2>
                <div class="about-content__inner text-left">
                    <p class="about-text hidden">
                        My passion lies in crafting <span class="span-accent font-bold">high-quality digital experiences</span> that combine
                        <span class="span-primary font-bold">clean architecture</span> with pixel-perfect interfaces.
                        From concept to deployment, I focus on the UX, design, performance, accessibility, and code that scales, ensuring every project
                        meets professional standards and delivers real value.
                    </p>
                    <p  class="about-text hidden">
                        Beyond day-to-day development, I continuously invest in studying code, architecture, modern frameworks,
                        and day-to-day tooling. I believe that a <span class="span-secondary font-bold">solid foundation</span>
                        and thoughtful engineering are what separate good software from great software.
                    </p>
                    <p class="about-text">
                        I build interfaces where design and engineering meet: strong focus on clean code, thoughtful UX, and attention to the details that most people skip.
                        My background is heavier on web software than static sites, which means I think in systems: state, data flow, component architecture, 
                        overall structure and organization. 
                    </p>
                    <p class="about-text">
                        I care about how things work as much as how they look. I write clean code, and I build things that work beautifully, and that the next developer won't hate maintaining.
                        And I take the craft seriously. Always studying, always refining, always looking for the next problem worth solving.
                    </p>
                </div>

                <div>
                    <AppButton class="more-about" @click="goToLoadMorePage">
                        More About Me
                    </AppButton>
                </div>
            </div>
        </section>

        <!-- ========== TECH STACK — GSAP FLIP ========== -->
        <section ref="techSection" class="section section-tech" @mousemove="onTechParallax" @mouseleave="resetTechParallax">
            <h2 :class="['section-title', titlesStyle]">Tech Stack</h2>
            <p class="section-subtitle">Technologies I work with daily</p>

            <div class="tech-showcase">
                <!-- Main featured tech -->
                <div ref="techSectionRef" class="tech-main">
                    <div :class="['tech-main__icon-wrapper', !isDarkTheme && 'icon-shadow']">
                        <img
                            ref="techMainIcon"
                            :src="activeTech.icon"
                            :alt="activeTech.name"
                            :class="['tech-main__icon', (activeTech.name === 'GitHub' || activeTech.name === 'Express.js') && isDarkTheme && 'icon-light']"
                        >
                    </div>
                    <Transition name="tech-text" mode="out-in">
                        <div :key="activeTech.name" class="tech-main__info">
                            <h3 class="tech-main__name">{{ activeTech.name }}</h3>
                            <p class="tech-main__desc">{{ activeTech.description }}</p>
                        </div>
                    </Transition>
                </div>

                <!-- Icon grid -->
                <div class="tech-grid">
                    <button
                        v-for="(tech, index) in techs"
                        :key="tech.name"
                        :class="['tech-grid__item', { 'tech-grid__item--active': index === activeTechIndex }]"
                        :aria-label="'Select ' + tech.name"
                        @click="selectTech(index)"
                    >
                        <img :src="tech.icon" :alt="tech.name" :class="['tech-grid__icon', (tech.name === 'GitHub' || tech.name === 'Express.js') && isDarkTheme && 'icon-light']" >
                        <span class="tech-grid__label">{{ tech.name }}</span>
                    </button>
                </div>
            </div>
        </section>

        <!-- ========== SERVICES ========== -->
        <section :class="['section section-services', { 'section-services--cupcake': activeTheme === 'cupcake' }]">
            <h2 :class="['section-title', titlesStyle]">Services</h2>
            <p class="section-subtitle">Activities I'm proficient and comfortable working on</p>

            <div class="services-grid">
                <div v-for="service in services" :key="service.title" :class="['service-card', { 'service-card--cupcake': activeTheme === 'cupcake' || activeTheme === 'ice' }]">
                    <div class="service-card__icon">
                        <Icon :name="service.icon" size="36" />
                    </div>
                    <h3 class="service-card__title">{{ service.title }}</h3>
                    <p class="service-card__desc">{{ service.desc }}</p>
                </div>
            </div>
        </section>

        <!-- ========== CONTACT ========== -->
        <ContactSection />

        <footer class="footer">
            <AppLogo is-footer />
            <p class="footer__text">
                © {{ currentYear }} · Developed with 
                <!-- <Icon name="noto:red-heart" size="16" class="footer__heart" />  -->
                <Icon name="material-symbols:favorite-rounded" size="16" class="footer__heart" /> 
                by
                <span class="footer__name">Sam Dev</span>
            </p>
        </footer>

        <!-- <Teleport to="body">
            <AppMobileMenu />
        </Teleport> -->
    </main>
</template>

<script setup lang="ts">
import debounce from 'lodash/debounce';
import { animate, createTimer, text, utils, cubicBezier } from "animejs";

const currentYear = new Date().getFullYear()

const { isDarkTheme, activeTheme, titlesStyle } = useTheme()
const { $gsap: gsap } = useNuxtApp()

const windowWidth = ref(1000)
const handleResize = debounce(() => { windowWidth.value = window.innerWidth }, 300)
const phoneBreakpoint = 768
const actionsList = ['PROTOTYPE', 'DEVELOP', 'DEPLOY', 'SCALE', 'MAINTAIN', 'HAVE FUN', 'REPEAT', 'PROTOTYPE', 'DEVELOP', 'DEPLOY', 'SCALE', 'MAINTAIN', 'HAVE FUN', 'REPEAT']

// Hero entrance refs
const heroH3 = ref(null)
const heroH1 = ref(null)
const heroH2 = ref(null)
const heroBtn = ref(null)
const scrollIndicator = ref<HTMLDivElement | null>(null)

const techs = [
    { name: 'TypeScript', icon: '/icons/ts.svg', description: 'Typed superset of JavaScript that catches errors at compile time and improves code maintainability at scale.' },
    { name: 'JavaScript', icon: '/icons/js.svg', description: 'The language of the web — powering interactivity, logic, and dynamic behavior across every modern browser.' },
    { name: 'HTML', icon: '/icons/html.svg', description: 'The semantic backbone of every web page — structuring content for accessibility, SEO, and cross-platform reach.' },
    { name: 'CSS', icon: '/icons/css.svg', description: 'Stylesheet language for visual design — layouts, animations, responsive breakpoints, and theming.' },
    { name: 'Sass', icon: '/icons/sass.svg', description: 'CSS preprocessor with variables, nesting, mixins, and functions for scalable, maintainable stylesheets.' },
    { name: 'Figma', icon: '/icons/figma.svg', description: 'Collaborative design tool for prototyping interfaces, creating design systems, and developer handoff.' },
    { name: 'Tailwind CSS', icon: '/icons/tailwindcss.svg', description: 'Utility-first CSS framework for rapidly building custom designs without leaving your HTML.' },
    { name: 'Vite', icon: '/icons/vite.svg', description: 'Next-generation frontend tooling for fast development and optimized builds.' },
    { name: 'Vue.js', icon: '/icons/vuejs.svg', description: 'Progressive JavaScript framework for building modern, reactive user interfaces with a component-driven architecture.' },
    { name: 'Nuxt', icon: '/icons/nuxtjs.svg', description: 'Full-stack Vue framework with SSR, routing, and a powerful module ecosystem for production-grade web applications.' },
    { name: 'Node.js', icon: '/icons/nodejs.svg', description: 'Server-side JavaScript runtime powering APIs, tooling, and full-stack applications with a vast package ecosystem.' },
    { name: 'Express.js', icon: '/icons/express.svg', description: 'Flexible Node.js web application framework providing a robust set of features for web and mobile applications.' },
    { name: 'Git', icon: '/icons/git.svg', description: 'Distributed version control system for tracking changes, collaborating, and maintaining code history.' },
    { name: 'GitHub', icon: '/icons/github.svg', description: 'Platform for hosting repositories, code review, CI/CD pipelines, and open-source collaboration.' },
    { name: 'GitLab', icon: '/icons/gitlab.svg', description: 'DevOps platform combining Git hosting, CI/CD, issue tracking, and container registry in one tool.' },
    { name: 'Pinia Store', icon: '/icons/pinia.svg', description: 'State management library for VueJS and NuxtJS applications, providing an intuitive API for managing global state.' },
]

const activeTechIndex = ref(0)
const activeTech = computed(() => techs[activeTechIndex.value]!)

const techSection = ref<HTMLDivElement | null>(null)
const techSectionRef = ref(null)
const techMainIcon = ref(null)

function selectTech(index: number) {
    if (index === activeTechIndex.value) return

    // Animate the main icon out, swap, animate in
    const iconEl = techMainIcon.value
    if (iconEl) {
        gsap.to(iconEl, {
            scale: 0.6,
            rotateY: 90,
            duration: 0.25,
            ease: 'power2.in',
            onComplete: () => {
                activeTechIndex.value = index
                nextTick(() => {
                    gsap.fromTo(techMainIcon.value, 
                        { scale: 0.6, rotateY: -90 },
                        { scale: 1, rotateY: 0, duration: 0.35, ease: 'back.out(1.4)' }
                    )
                })
            }
        })
    } else {
        activeTechIndex.value = index
    }
}

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

// Parallax on tech section
function onTechParallax(event: MouseEvent) {
    if (!techSectionRef.value) return
    const rect = techSection.value!.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 20
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 20
    gsap.to(techSectionRef.value, {
        x: x,
        y: y,
        duration: 0.6,
        ease: 'power2.out'
    })
}

function resetTechParallax() {
    if (!techSectionRef.value) return
    gsap.to(techSectionRef.value, { x: 0, y: 0, duration: 0.6, ease: 'power2.out' })
}

function scrollToContent() {
    document.querySelector('.section-about')?.scrollIntoView({ behavior: 'smooth' })
}

const services = [
    { icon: 'material-symbols:code-rounded', title: 'Frontend Development', desc: 'Building fast, accessible, and responsive interfaces with Vue, Nuxt, and Typescript.' },
    { icon: 'material-symbols:design-services-rounded', title: 'UI/UX Design', desc: 'Designing intuitive user experiences with Figma — from wireframes to high-fidelity prototypes.' },
    { icon: 'material-symbols:stacks-rounded', title: 'Full-Stack Development', desc: 'End-to-end application development including APIs, databases, and server-side rendering.' },
    { icon: 'material-symbols:api-rounded', title: 'API Integration', desc: 'Connecting frontends to REST and GraphQL APIs with proper error handling and type safety.' },
    { icon: 'material-symbols:speed-rounded', title: 'Performance Optimization', desc: 'Auditing and improving Core Web Vitals, bundle sizes, and runtime performance.' },
    // { icon: 'material-symbols:accessibility-rounded', title: 'Accessibility', desc: 'Building to WCAG standards — semantic HTML, keyboard navigation, and screen reader support.' }
]

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

    // About Section Text Animation
    const radius = 40;
    const animations: ReturnType<typeof animate>[] = [];
    const chars: HTMLElement[] = [];
    document.querySelectorAll('.about-text').forEach(p => {
        const { chars: pChars } = text.splitText(p as HTMLElement, { chars: true });
        chars.push(...pChars);
    });
    let pointerX = 0;
    let pointerY = 0;

    const animateChar = ($c: HTMLElement, i: number) => {
        const anim = animations[i];
        if (anim && anim.progress < .5) return;
        const rect = $c.getBoundingClientRect();
        const dx = pointerX - (rect.left + (rect.width * .5));
        const dy = pointerY - (rect.top + (rect.height * .5));
        const distanceSquared = dx * dx + dy * dy;
        if (distanceSquared <= radius * radius) {
            animations[i] = animate($c, {
                keyframes: [
                    {
                        x: utils.random(-radius, radius),
                        y: utils.random(-radius, radius),
                        ease: cubicBezier(.17,.67,.41,1.65)
                    },
                    {
                        x: 0, y: 0,
                        ease: cubicBezier(.71,1.72,.37,1.25), duration: 1000
                    }
                ],
            });
        }
    }

    document.addEventListener('pointermove', (e) => {
        pointerX = e.clientX;
        pointerY = e.clientY;
    });

    createTimer({ onUpdate: () => chars.forEach(animateChar) });
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize)
})

const router = useRouter()
function goToLoadMorePage() {
    router.push('/even-more-about')
}
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

/* ========== ABOUT SECTION ========== */
.section-about {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: visible;

    &::after {
        content: '';
        position: absolute;
        bottom: -2rem;
        left: 30%;
        z-index: 3;
        width: 14rem;
        height: 14rem;
        background: var(--color-accent);
        filter: blur(100px);
        opacity: 0.15;
        pointer-events: none;
    }
}

.about-marquee {
    width: 100%;
    padding: 2.5rem 0;
    overflow: hidden;
    white-space: nowrap;
    border-top: 1px solid color-mix(in srgb, var(--color-base-content), transparent 88%);
    border-bottom: 1px solid color-mix(in srgb, var(--color-base-content), transparent 88%);
    mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
    -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
}

.about-marquee__track {
    display: flex;
    gap: 0rem;
    width: max-content;
    animation: marqueeScroll 60s linear infinite;
}

.about-marquee__word {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    align-items: center;
    font-size: 2.5rem;
    font-weight: 800;
    font-family: 'Montserrat', sans-serif;
    letter-spacing: 0.05em;
    color: color-mix(in srgb, var(--color-base-content), transparent 60%);
    white-space: nowrap;
    width: max-content;
    padding-inline: 0.5rem;
    transition: color 0.3s;

    &:hover {
        color: var(--color-secondary);
    }
}
.about-marquee__dot {
    color: var(--color-primary);
    opacity: 0.6;
    transform: translate(1px, -1px);
    text-align: center;
}

@keyframes marqueeScroll {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
}

.about-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 5rem 2rem;
    gap: 2rem;
    max-width: 860px;
    width: 100%;
    font-size: 1.05rem;
    line-height: 1.75;
    color: color-mix(in srgb, var(--color-base-content), transparent 15%);

    &__inner :deep(span) {
        display: inline-block;
    }

    & .more-about {
        transform: translateY(50px);
    }
}

.about-text {
    padding-bottom: 2rem;
}

.about-title {
    align-self: center;

    @media (max-width: 768px) {
        align-self: center;
    }
}

/* ========== TECH STACK SECTION ========== */
.section-tech {
    background-color: var(--color-base-100);

    &::before {
        content: '';
        position: absolute;
        top: 8rem;
        right: 20%;
        width: 18rem;
        height: 18rem;
        background: var(--color-primary);
        filter: blur(120px);
        opacity: 0.15;
        pointer-events: none;
        z-index: 0;
    }
}

.tech-showcase {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3rem;
    max-width: 800px;
    width: 100%;
    z-index: 1;
}

.tech-main {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;

    &__icon-wrapper {
        width: 120px;
        height: 120px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 1.5rem;
        background: var(--color-base-200);
        box-shadow:
            0 8px 32px rgba(0,0,0,0.50),
            inset 0 1px 0 color-mix(in srgb, var(--color-base-content), transparent 92%);
        perspective: 600px;

        &.icon-shadow {
            box-shadow:
            0 8px 32px rgba(0,0,0,0.20),
            inset 0 -32px 28px color-mix(in srgb, black, transparent 98%),
            inset 0 -12px 10px color-mix(in srgb, black, transparent 95%),
            inset 0 -8px 5px -3px color-mix(in srgb, black, transparent 92%),
            inset 0 1px 0 color-mix(in srgb, var(--color-base-content), transparent 92%);
        }

        @media (max-width: 768px) {
            width: 90px;
            height: 90px;
        }
    }

    &__icon {
        width: 72px;
        height: 72px;
        object-fit: contain;

        @media (max-width: 768px) {
            width: 54px;
            height: 54px;
        }
    }

    &__info {
        text-align: center;
        max-width: 500px;
    }

    &__name {
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
        font-family: 'JetBrains Mono', monospace;
        color: var(--color-secondary);
    }

    &__desc {
        font-size: 0.95rem;
        line-height: 1.6;
        color: color-mix(in srgb, var(--color-base-content), transparent 20%);
    }
}

.tech-text-enter-active { animation: techTextIn 0.3s ease-out; }
.tech-text-leave-active { animation: techTextOut 0.2s ease-in; }
@keyframes techTextIn {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
}
@keyframes techTextOut {
    from { opacity: 1; transform: translateY(0); }
    to   { opacity: 0; transform: translateY(-12px); }
}

.tech-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.75rem;

    &__item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.35rem;
        padding: 0.75rem;
        border-radius: var(--radius-box);
        border: 2px solid transparent;
        background: var(--color-base-200);
        cursor: pointer;
        transition: all 0.25s ease;
        width: 80px;

        &:hover {
            transform: translateY(-4px);
            box-shadow: 0 6px 20px rgba(0,0,0,0.12);
            border-color: var(--color-primary);
        }

        &--active {
            border-color: var(--color-primary);
            background: color-mix(in srgb, var(--color-primary), transparent 85%);
            box-shadow: 0 0 16px color-mix(in srgb, var(--color-primary), transparent 60%);
        }
    }

    &__icon {
        width: 32px;
        height: 32px;
        object-fit: contain;
    }

    &__label {
        font-size: 0.65rem;
        font-family: 'JetBrains Mono', monospace;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 100%;
        color: color-mix(in srgb, var(--color-base-content), transparent 30%);
    }
}

/* ========== SERVICES SECTION ========== */
.section-services {
    background-color: var(--color-base-200);

    &--cupcake {
        background-color: var(--color-base-100);
    }

    &::after {
        content: '';
        position: absolute;
        bottom: -4rem;
        left: 35%;
        width: 14rem;
        height: 14rem;
        background: var(--color-secondary);
        filter: blur(100px);
        opacity: 0.15;
        pointer-events: none;
    }
}

.services-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    max-width: 1000px;
    width: 100%;
    z-index: 1;

    @media (max-width: 900px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 600px) {
        grid-template-columns: 1fr;
    }
}

.service-card {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    height: 260px;
    min-height: 260px;
    gap: 1rem;
    padding: 1.75rem;
    border-radius: var(--radius-box);
    background: var(--color-base-300);
    border: 1px solid color-mix(in srgb, var(--color-base-content), transparent 90%);
    transition: all 0.3s ease;

    &--cupcake {
        background: var(--color-base-200);
    }

    &:hover {
        transform: translateY(-6px);
        box-shadow: 0 12px 32px rgba(0,0,0,0.12);
        border-color: var(--color-primary);
    }

    &__icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 56px;
        height: 56px;
        border-radius: 0.75rem;
        background: color-mix(in srgb, var(--color-primary), transparent 85%);
        color: var(--color-primary);
    }

    &__title {
        font-size: 1.1rem;
        font-weight: 700;
    }

    &__desc {
        font-size: 0.9rem;
        line-height: 1.55;
        color: color-mix(in srgb, var(--color-base-content), transparent 30%);
    }
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
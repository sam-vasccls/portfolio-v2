<template>
    <main class="main fade-in">
        <AppLogo />
        <header class="section section-hero">
            <div class="section-hero__grid">
                <div class="section-hero__title">
                    <h3 ref="heroH3" class="hero-enter">Hey, what's up? <br> I'm Sam!</h3>
                    <h1 id="title" ref="heroH1" class="section-hero__title-main gradient-text hero-enter">
                        <span>{{'<'}}</span>
                        Creative Frontend Developer
                        <span>{{'/>'}}</span>
                    </h1>
                    <h2 ref="heroH2" class="py-6 text-left text-lg hero-enter">Developer focused on clean architecture, practical solutions, professionalism, amazing experience and continuous learning!</h2>
                    <div ref="heroBtn" class="section-hero__btn hero-enter">
                        <AppButton
                            :fancy-btn="windowWidth > phoneBreakpoint"
                            class="header-btn"
                            @mouseenter="onBalloonHover"
                            @mouseleave="onBalloonLeave"
                            @click="scrollToContent"
                        >
                            Let's Begin!!
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

        <!-- ═══════════ MARQUEE + ABOUT ═══════════ -->
        <section class="section section-about">
            <div class="about-marquee" aria-hidden="true">
                <div class="about-marquee__track">
                    <span v-for="(word, index) in actionsList" :key="index" class="about-marquee__word">
                        {{ word }} <span class="about-marquee__dot">·</span>
                    </span>
                </div>
            </div>

            <div class="about-content">
                <h2 class="section-title about-title">About Me</h2>
                <div class="about-content__inner text-left">
                    <p class="about-text">
                        My passion lies in crafting <span class="span-accent font-bold">high-quality digital experiences</span> that combine
                        <span class="span-primary font-bold">clean architecture</span> with pixel-perfect interfaces.
                        From concept to deployment, I focus on the UX, design, performance, accessibility, and code that scales, ensuring every project
                        meets professional standards and delivers real value.
                    </p>
                    <p  class="about-text">
                        Beyond day-to-day development, I continuously invest in studying code, architecture, modern frameworks,
                        and day-to-day tooling. I believe that a <span class="span-secondary font-bold">solid foundation</span>
                        and thoughtful engineering are what separate good software from great software.
                    </p>
                </div>
            </div>
        </section>

        <!-- ═══════════ TECH STACK — GSAP FLIP ═══════════ -->
        <section ref="techSection" class="section section-tech" @mousemove="onTechParallax" @mouseleave="resetTechParallax">
            <h2 class="section-title">Tech Stack</h2>
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

        <!-- ═══════════ SERVICES ═══════════ -->
        <section class="section section-services">
            <h2 class="section-title">Services</h2>
            <p class="section-subtitle">Activities I'm proficient and comfortable working on</p>

            <div class="services-grid">
                <div v-for="service in services" :key="service.title" class="service-card">
                    <div class="service-card__icon">
                        <Icon :name="service.icon" size="36" />
                    </div>
                    <h3 class="service-card__title">{{ service.title }}</h3>
                    <p class="service-card__desc">{{ service.desc }}</p>
                </div>
            </div>
        </section>

        <!-- ═══════════ CONTACT ═══════════ -->
        <section class="section section-contact">
            <h2 class="section-title">Get In Touch</h2>
            <p class="section-subtitle">Let's build something together</p>

            <div class="contact-grid">
                <form class="contact-form" @submit.prevent>
                    <div class="contact-form__field">
                        <label for="contact-name">Name</label>
                        <input id="contact-name" type="text" placeholder="Your name" autocomplete="name">
                    </div>
                    <div class="contact-form__field">
                        <label for="contact-email">Email</label>
                        <input id="contact-email" type="email" placeholder="you@email.com" autocomplete="email">
                    </div>
                    <div class="contact-form__field">
                        <label for="contact-message">Message</label>
                        <textarea id="contact-message" rows="5" placeholder="Tell me about your ideas..." />
                    </div>
                    <button type="submit" class="contact-form__submit">
                        <Icon name="material-symbols:send-rounded" size="20" />
                        Send Message
                    </button>
                </form>

                <div class="contact-info">
                    <div class="contact-info__block">
                        <Icon name="material-symbols:mail-outline-rounded" size="24" />
                        <div>
                            <h4>Email</h4>
                            <p>sam.vasconcelos.dev@gmail.com</p>
                        </div>
                    </div>
                    <div class="contact-info__block">
                        <Icon name="material-symbols:location-on-outline-rounded" size="24" />
                        <div>
                            <h4>Location</h4>
                            <p>Available remotely, worldwide</p>
                        </div>
                    </div>
                    <div class="contact-info__socials">
                        <a href="https://github.com/sam-vasccls" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                            <img src="/icons/github.svg" alt="GitHub" :class="['contact-info__social-icon', isDarkTheme && 'icon-light']">
                        </a>
                        <a href="https://www.linkedin.com/in/sam-vasconcelos/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <Icon name="mdi:linkedin" size="32" />
                        </a>
                        <a href="https://www.instagram.com/sam.vasccls" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <Icon name="logos:instagram-icon" size="28" :class="[isDarkTheme && 'icon-light']" />
                        </a>
                    </div>
                </div>
            </div>
        </section>

<footer class="footer">
            <p class="footer__text">
                © {{ currentYear }} · Developed with <Icon name="noto:red-heart" size="16" class="footer__heart" /> by
                <span class="footer__name">Sam Dev</span>
            </p>
        </footer>

        <!-- <Teleport to="body">
            <AppMobileMenu />
        </Teleport> -->
    </main>
</template>

<script setup>
import { debounce } from 'lodash'
import { animate, createTimer, text, utils, cubicBezier } from "animejs";

const currentYear = new Date().getFullYear()

const { isDarkTheme } = useTheme() // Assuming you have a theme composable that provides this reactive variable
const { $gsap: gsap } = useNuxtApp()

const windowWidth = ref(1000)
const handleResize = debounce(() => { windowWidth.value = window.innerWidth }, 300)
const phoneBreakpoint = 768
const actionsList = ['PROTOTYPE', 'DEVELOP', 'DEPLOY', 'SCALE', 'MAINTAIN', 'REPEAT', 'PROTOTYPE', 'DEVELOP', 'DEPLOY', 'SCALE', 'MAINTAIN', 'REPEAT']

// Hero entrance refs
const heroH3 = ref(null)
const heroH1 = ref(null)
const heroH2 = ref(null)
const heroBtn = ref(null)
const scrollIndicator = ref(null)

const techs = [
    { name: 'TypeScript', icon: '/icons/ts.svg', description: 'Typed superset of JavaScript that catches errors at compile time and improves code maintainability at scale.' },
    { name: 'JavaScript', icon: '/icons/js.svg', description: 'The language of the web — powering interactivity, logic, and dynamic behavior across every modern browser.' },
    { name: 'HTML', icon: '/icons/html.svg', description: 'The semantic backbone of every web page — structuring content for accessibility, SEO, and cross-platform reach.' },
    { name: 'CSS', icon: '/icons/css.svg', description: 'Stylesheet language for visual design — layouts, animations, responsive breakpoints, and theming.' },
    { name: 'Sass', icon: '/icons/sass.svg', description: 'CSS preprocessor with variables, nesting, mixins, and functions for scalable, maintainable stylesheets.' },
    { name: 'Figma', icon: '/icons/figma.svg', description: 'Collaborative design tool for prototyping interfaces, creating design systems, and developer handoff.' },
    { name: 'Tailwind CSS', icon: '/icons/tailwindcss.svg', description: 'Utility-first CSS framework for rapidly building custom designs without leaving your HTML.' },
    { name: 'Vite', icon: '/icons/vite.svg', description: 'Next-generation frontend tooling for fast development and optimized builds.' },
    { name: 'Vue', icon: '/icons/vuejs.svg', description: 'Progressive JavaScript framework for building modern, reactive user interfaces with a component-driven architecture.' },
    { name: 'Nuxt', icon: '/icons/nuxtjs.svg', description: 'Full-stack Vue framework with SSR, routing, and a powerful module ecosystem for production-grade web applications.' },
    { name: 'Node.js', icon: '/icons/nodejs.svg', description: 'Server-side JavaScript runtime powering APIs, tooling, and full-stack applications with a vast package ecosystem.' },
    { name: 'Express.js', icon: '/icons/express.svg', description: 'Flexible Node.js web application framework providing a robust set of features for web and mobile applications.' },
    { name: 'Git', icon: '/icons/git.svg', description: 'Distributed version control system for tracking changes, collaborating, and maintaining code history.' },
    { name: 'GitHub', icon: '/icons/github.svg', description: 'Platform for hosting repositories, code review, CI/CD pipelines, and open-source collaboration.' },
    { name: 'GitLab', icon: '/icons/gitlab.svg', description: 'DevOps platform combining Git hosting, CI/CD, issue tracking, and container registry in one tool.' },
    { name: 'Pinia Store', icon: '/icons/pinia.svg', description: 'State management library for VueJS and NuxtJS applications, providing an intuitive API for managing global state.' },
]

const activeTechIndex = ref(0)
const activeTech = computed(() => techs[activeTechIndex.value])

const techSection = ref(null)
const techSectionRef = ref(null)
const techMainIcon = ref(null)

function selectTech(index) {
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

let balloonTimer = null
let balloonHideTimeout = null
const HOVER_TIMER = 6000
const MOUSE_LEAVE_TIMER = 1500

function animateBalloonOut(el) {
    clearTimeout(balloonHideTimeout)
    balloonHideTimeout = null
    gsap.killTweensOf(el)
    gsap.to(el, { opacity: 0, y: 20, scale: 0.7, filter: 'blur(20px)', duration: 0.5, ease: 'back.in(1.7)' })
}

const balloonCounter = shallowRef(0)
function onBalloonHover() {
    if (balloonTimer) return

    if(balloonCounter.value > 0) return
    balloonCounter.value++

    console.log('hello')

    balloonTimer = setTimeout(() => {
        const balloon = document.querySelector('.balloon--cool')
        if (!balloon) return
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
                    balloonHideTimeout = setTimeout(() => animateBalloonOut(balloon), MOUSE_LEAVE_TIMER)
                }
            }
        )
    }, HOVER_TIMER)
}

function onBalloonLeave() {
    clearTimeout(balloonTimer)
    balloonTimer = null
    const el = document.querySelector('.balloon--cool')
    if (el && parseFloat(gsap.getProperty(el, 'opacity')) > 0) {
        animateBalloonOut(el)
    } else {
        clearTimeout(balloonHideTimeout)
        balloonHideTimeout = null
    }
}

// Parallax on tech section
function onTechParallax(e) {
    if (!techSectionRef.value) return
    const rect = techSection.value.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20
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
    { icon: 'material-symbols:code-rounded', title: 'Frontend Development', desc: 'Building fast, accessible, and responsive interfaces with Vue, Nuxt, and modern JavaScript.' },
    { icon: 'material-symbols:design-services-rounded', title: 'UI/UX Design', desc: 'Designing intuitive user experiences with Figma — from wireframes to high-fidelity prototypes.' },
    { icon: 'material-symbols:stacks-rounded', title: 'Full-Stack Development', desc: 'End-to-end application development including APIs, databases, and server-side rendering.' },
    { icon: 'material-symbols:api-rounded', title: 'API Integration', desc: 'Connecting frontends to REST and GraphQL APIs with proper error handling and type safety.' },
    { icon: 'material-symbols:speed-rounded', title: 'Performance Optimization', desc: 'Auditing and improving Core Web Vitals, bundle sizes, and runtime performance.' },
    { icon: 'material-symbols:devices-rounded', title: 'Responsive Web Design', desc: 'Ensuring pixel-perfect layouts across every screen size — mobile, tablet, and desktop.' },
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
        { opacity: 1, x: 0, z: 0, filter: 'blur(0px)', duration: 1, stagger: 0.45, ease: 'power3.out', delay: 0.4 }
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
    const animations = [];
    const chars = [];
    document.querySelectorAll('.about-text').forEach(p => {
        const { chars: pChars } = text.splitText(p, { chars: true });
        chars.push(...pChars);
    });
    let pointerX = 0;
    let pointerY = 0;

    const animateChar = ($c, i) => {
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

/* ═══════════ HERO SECTION ═══════════ */
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

        &__card {
            max-width: 350px;
            margin: 0 auto;
        }

        &__title {
            max-width: 100%;
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
        animation: orbFloat 12s ease-in-out infinite;
    }

    &::before {
        content: '';
        display: block;
        position: absolute;
        z-index: 0;
        top: 25rem;
        left: 35%;
        transform: translateX(-50%) rotate(45deg);
        width: 25rem;
        height: 25rem;
        border-radius: 100px;
        background-color: var(--color-accent);
        filter: blur(110px);
        opacity: 0.2;
        pointer-events: none;
        animation: orbFloat 16s ease-in-out infinite reverse;
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
            margin-top: 2rem;

            @media(max-width: 900px) {
                position: absolute;
                bottom: 3rem;
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
            text-align: left;
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

        @media(max-width: 768px) {
            position: absolute;
            bottom: 2rem;
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
    0%, 100% { translate: 0 0; }
    50%      { translate: 20px -35px; }
}

/* ═══════════ ABOUT SECTION ═══════════ */
.section-about {
    min-height: 80vh;
    background-color: var(--color-base-200);
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
}

.about-marquee {
    width: 100%;
    padding: 2.5rem 0;
    overflow: hidden;
    border-top: 1px solid color-mix(in srgb, var(--color-base-content), transparent 88%);
    border-bottom: 1px solid color-mix(in srgb, var(--color-base-content), transparent 88%);
    mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
    -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);

}

.about-marquee__track {
    display: flex;
    gap: 0;
    width: max-content;
    animation: marqueeScroll 22s linear infinite;
    will-change: transform;
}

.about-marquee__word {
    font-size: 2.5rem;
    font-weight: 800;
    font-family: 'Montserrat', sans-serif;
    letter-spacing: 0.05em;
    color: color-mix(in srgb, var(--color-base-content), transparent 60%);
    white-space: nowrap;
    padding: 0 1.25rem;
    transition: color 0.3s;
}
.about-marquee__word:hover {
    color: var(--color-primary);
}

.about-marquee__dot {
    color: var(--color-primary);
    opacity: 0.6;
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
}

.about-text:first-of-type {
    padding-bottom: 2rem;
}

.about-title {
    align-self: center;

    @media (max-width: 768px) {
        align-self: center;
    }
}

/* ═══════════ SHARED SECTION ELEMENTS ═══════════ */
.section-title {
    font-size: 2.5rem;
    font-weight: 700;
    font-family: 'Montserrat', sans-serif;
    text-align: center;
    background: linear-gradient(90deg, var(--color-primary), var(--color-accent), var(--color-secondary));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
    margin-bottom: 0.25rem;
}

.section-subtitle {
    text-align: center;
    color: color-mix(in srgb, var(--color-base-content), transparent 40%);
    font-size: 1.05rem;
    margin-bottom: 3rem;
}

/* ═══════════ SECTION LAYOUT BASE ═══════════ */
.section {
    position: relative;
    width: 100%;
}

.section-tech,
.section-services,
.section-contact {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5rem 2rem;
    overflow: hidden;
}

/* ═══════════ TECH STACK SECTION ═══════════ */
.section-tech {
    background-color: var(--color-base-100);

    &::before {
        content: '';
        position: absolute;
        top: -5rem;
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
        color: var(--color-primary);
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

/* ═══════════ SERVICES SECTION ═══════════ */
.section-services {
    background-color: var(--color-base-200);

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

/* ═══════════ CONTACT SECTION ═══════════ */
.section-contact {
    background: var(--color-base-100);

    &::before {
        content: '';
        position: absolute;
        top: 2rem;
        left: 60%;
        width: 16rem;
        height: 16rem;
        background: var(--color-accent);
        filter: blur(110px);
        opacity: 0.12;
        pointer-events: none;
    }
}

.contact-grid {
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    gap: 3rem;
    max-width: 900px;
    width: 100%;
    z-index: 1;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
}

.contact-form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;

    &__field {
        display: flex;
        flex-direction: column;
        gap: 0.35rem;

        & label {
            font-size: 0.85rem;
            font-weight: 600;
            color: color-mix(in srgb, var(--color-base-content), transparent 20%);
        }

        & input, & textarea {
            padding: 0.75rem 1rem;
            border-radius: var(--radius-box);
            border: 1px solid color-mix(in srgb, var(--color-base-content), transparent 85%);
            background: var(--color-base-200);
            color: var(--color-base-content);
            font-family: inherit;
            font-size: 0.95rem;
            transition: border-color 0.2s, box-shadow 0.2s;
            outline: none;

            &:focus {
                border-color: var(--color-primary);
                box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary), transparent 80%);
            }

            &::placeholder {
                color: color-mix(in srgb, var(--color-base-content), transparent 60%);
            }
        }

        & textarea {
            resize: vertical;
            min-height: 120px;
        }
    }

    &__submit {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        padding: 0.85rem 2rem;
        border: none;
        border-radius: var(--radius-box);
        background: var(--color-primary);
        color: var(--color-primary-content);
        font-weight: 700;
        font-size: 1rem;
        cursor: pointer;
        transition: all 0.25s ease;
        align-self: flex-start;
        transform: translateY(12px);

        &:hover {
            transform: translateY(8px);
            box-shadow: 0 6px 20px color-mix(in srgb, var(--color-primary), transparent 50%);
        }

        &:active {
            transform: translateY(14px);
        }
    }
}

/* ═══════════ FOOTER ═══════════ */
.footer {
    width: 100%;
    padding: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-base-100);
    border-top: 1px solid color-mix(in srgb, var(--color-base-content), transparent 90%);

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

            &:hover {
                background: var(--color-primary);
                color: var(--color-primary-content) !important;
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
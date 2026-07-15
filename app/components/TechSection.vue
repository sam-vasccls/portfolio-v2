<template>
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
</template>

<script setup lang="ts">
const { isDarkTheme, titlesStyle } = useTheme()
const { $gsap: gsap } = useNuxtApp()

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
    { name: 'PostgreSQL', icon: '/icons/postgresql.svg', description: 'Powerful open-source relational database known for reliability, extensibility, and standards compliance.' },
    { name: 'Drizzle', icon: '/icons/drizzle.svg', description: 'TypeScript ORM offering a lightweight, SQL-like query builder with full type safety and zero runtime overhead.' },
    { name: 'Git', icon: '/icons/git.svg', description: 'Distributed version control system for tracking changes, collaborating, and maintaining code history.' },
    { name: 'GitHub', icon: '/icons/github.svg', description: 'Platform for hosting repositories, code review, CI/CD pipelines, and open-source collaboration.' },
    { name: 'GitLab', icon: '/icons/gitlab.svg', description: 'DevOps platform combining Git hosting, CI/CD, issue tracking, and container registry in one tool.' },
    { name: 'Pinia Store', icon: '/icons/pinia.svg', description: 'State management library for VueJS and NuxtJS applications, providing an intuitive API for managing global state.' },
    { name: 'VS Code', icon: '/icons/vscode.svg', description: 'Lightweight, extensible code editor with rich language support, debugging, and Git integration.' },
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
</script>

<style scoped lang="scss">
.icon-light {
    filter: invert(100%) sepia(100%) grayscale(100%) brightness(150%);
}

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
</style>

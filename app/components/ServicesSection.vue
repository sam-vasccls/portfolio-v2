<template>
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
</template>

<script setup>
const { activeTheme, titlesStyle } = useTheme()

const services = [
    { icon: 'material-symbols:code-rounded', title: 'Frontend Development', desc: 'Building fast, accessible, and responsive interfaces with Vue, Nuxt, and Typescript.' },
    { icon: 'material-symbols:design-services-rounded', title: 'UI/UX Design', desc: 'Designing intuitive user experiences with Figma — from wireframes to high-fidelity prototypes.' },
    // { icon: 'material-symbols:stacks-rounded', title: 'Full-Stack Development', desc: 'End-to-end application development including APIs, databases, and server-side rendering.' },
    { icon: 'material-symbols:api-rounded', title: 'API Integration', desc: 'Connecting frontends to REST and GraphQL APIs with proper error handling and type safety.' },
    // { icon: 'material-symbols:speed-rounded', title: 'Performance Optimization', desc: 'Auditing and improving Core Web Vitals, bundle sizes, and runtime performance.' },
    // { icon: 'material-symbols:accessibility-rounded', title: 'Accessibility', desc: 'Building to WCAG standards — semantic HTML, keyboard navigation, and screen reader support.' }
]

</script>

<style lang="scss" scoped>
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
    padding: 3rem 4rem;
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    max-width: 1000px;
    width: 100%;
    z-index: 1;

    @media (max-width: 900px) {
        flex-wrap: wrap;
        display: flex;
        grid-template-columns: 1fr;
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
    min-width: 260px;
    gap: 1rem;
    padding: 1.75rem;
    border-radius: var(--radius-box);
    background: var(--color-base-300);
    border: 1px solid color-mix(in srgb, var(--color-base-content), transparent 90%);
    transition: all 0.3s ease;

    @media (max-width: 900px) {
        gap: 1.5rem;
        width: 100%;
        padding: 1.75rem 1.75rem 1rem  1.75rem;
    }

    @media (max-width: 500px) {
        gap: 1rem;
        height: auto;
        padding: 1.75rem;
    }

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
</style>
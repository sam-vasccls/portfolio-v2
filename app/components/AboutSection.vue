<template>
    <section :class="['section section-about', {'has-background': activeTheme !== 'cupcake'}]">
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
            <h2 :class="['section-title about-title', titlesStyle, { 'cupcake': activeTheme === 'cupcake' } ]">About</h2>
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
                    I care about how things work as much as how they look. I build things that work beautifully, and that the next developer won't hate maintaining.
                    And it's always a pleasure to work and deploy amazing, high-quality digital experiences.
                </p>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { animate, createTimer, text, utils, cubicBezier } from "animejs";

const { activeTheme, titlesStyle } = useTheme()
const { isNarrowMobile } = useScreenSize()

const actionsList = ['PROTOTYPE', 'DEVELOP', 'DEPLOY', 'SCALE', 'MAINTAIN', 'HAVE FUN', 'REPEAT', 'PROTOTYPE', 'DEVELOP', 'DEPLOY', 'SCALE', 'MAINTAIN', 'HAVE FUN', 'REPEAT']

onMounted(() => {
    if(isNarrowMobile.value) return
    
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
</script>

<style scoped lang="scss">
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

    &.has-background {
        background-color: var(--color-base-200);
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
        transform: translateY(0px);
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

/* ========== INTERESTING SECTION ========== */
.section-interesting {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: var(--color-base-100);
    margin-top: 2rem;
    padding: 4rem 2rem 5rem 2rem;
    border-radius: 1.5rem;
    box-shadow: 0 2px 24px 0 color-mix(in srgb, var(--color-base-content), transparent 92%);
}

.interesting-content {
    max-width: 800px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
}

.interesting-title {
    font-size: 2.2rem;
    font-weight: 800;
    margin-bottom: 1.5rem;
    color: var(--color-secondary);
}

.interesting-content__inner {
    width: 100%;
}

.interesting-text {
    font-size: 1.08rem;
    line-height: 1.7;
    color: color-mix(in srgb, var(--color-base-content), transparent 10%);
    margin-bottom: 1.5rem;
}
</style>

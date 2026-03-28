<template>
    <div ref="heroCard" class="mouse-events-wrapper" @mouseleave="resetCardPosition">
        <div ref="cardWrapper" class="card-wrapper">
            <div class="card card--front">
                <div class="card__img">
                    <img :src="img" alt="Self portrait" >
                </div>
                <div class="card__info">
                    <div><label>Name:</label><div class="card__line"/><p>Sam Vasconcelos</p></div>
                    <div><label>Role:</label><div class="card__line"/><p>UI/UX Advocate</p></div>
                    <div><label>Logic:</label><div class="card__line"/><p>115 points</p></div>
                    <div><label>Creativity:</label><div class="card__line"/><p>85 points</p></div>
                    <div><label>Fun:</label><div class="card__line"/><p>+9000 points</p></div>
                    <div class="card__medals">
                        <p>Acquired Medals:</p>
                        <ul>
                            <li><Icon name="noto:military-medal" size="24" /> CSS Wizard</li>
                            <li><Icon name="noto:military-medal" size="24" /> JS Ninja</li>
                            <li><Icon name="noto:military-medal" size="24" /> API Devourer</li>
                            <li><Icon name="noto:military-medal" size="24" /> Lone Wolf</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="card card--back">
                <!-- Some content or logo or nothing -->
            </div>
        </div>
    </div>
</template>

<script setup>
const img = ref('/avatar/pic.jpg');

const heroCard = ref(null)
const cardWrapper = ref(null)
const enableHoverAnimation = shallowRef(false)
onMounted(() => {
    setTimeout(() => {
        if(cardWrapper.value) {
            cardWrapper.value.style.animation = 'none'
            enableHoverAnimation.value = true
        }
    }, 2100); // Delay the transition to allow the initial spin animation to complete

    if(heroCard.value && cardWrapper.value) {
        heroCard.value.addEventListener('mousemove', (e) => setCardPosition(e))
    }
})

function resetCardPosition() {
    if(heroCard.value) {
        heroCard.value.style.setProperty('--position-x', '0deg')
        heroCard.value.style.setProperty('--position-y', '0deg')
    }
}

function setCardPosition(e) {
    if(!enableHoverAnimation.value)  return

    // Get exact position of mouse within the card
    const positionPx = e.x - heroCard.value.getBoundingClientRect().left
    // Convert to percentage relative to the card size
    const positionX = (positionPx / heroCard.value.offsetWidth) * 100
    
    const positionPy = e.y - heroCard.value.getBoundingClientRect().top
    const positionY = (positionPy / heroCard.value.offsetHeight) * 100
    
    heroCard.value.style.setProperty('--position-x', (0.5) * (positionY - 50) + 'deg')
    heroCard.value.style.setProperty('--position-y', (0.5) * (50 - positionX) + 'deg')
    heroCard.value.style.setProperty('--mouse-x', positionX + '%')
    heroCard.value.style.setProperty('--mouse-y', positionY + '%')
}
</script>

<style lang="scss" scoped>
.card-wrapper, .mouse-events-wrapper {
    position: relative;
    width: 100%;
    max-width: 350px;
    height: 550px;
    display: flex;
    justify-content: center;
    align-items: center;
    transform-style: preserve-3d;
}

.mouse-events-wrapper {
    perspective: 1500px;
}

.card-wrapper {
    box-shadow: 0 3px 16px 0 rgba(0,0,0,0.08);
    border-radius: var(--radius-box);
    animation: spin 2s cubic-bezier(0,2.01,.52,.84) forwards;
    transform: rotateX(var(--position-x, 0deg)) rotateY(var(--position-y, 0deg));
    transition: transform 400ms ease-out;
    
    & * {
        pointer-events: none;
    }

    // Img shadow
    &::after {
        content: '';
        position: absolute;
        inset: 50%;
        transform: translateX(-50%);
        top: 25px;
        width: 150px;
        height: 150px;
        border-radius: 150px;
        background: radial-gradient(circle, var(--darker-40), transparent);
        filter: blur(4px);
        opacity: 0;
        pointer-events: none;
        transition: opacity 300ms;
    }
}

.mouse-events-wrapper:hover {
    & .card-wrapper {
        &::after {
            opacity: 0.5;
        }
    }
    & .card--front::before {
        opacity: 1;
    }
    & .card--front::after {
        opacity: 0.8;
    }
    & .card {
        &__img, &__info {
            transform: translateZ(50px);
            text-shadow: 0px 0px 5px rgba(0,0,0,0.1);
        }
    }
}

.card--front {
    transform: rotateY(0deg);
    backface-visibility: hidden;

    // mouse hover shine highlight
    &::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: var(--radius-box);
        background: radial-gradient(
            circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
            color-mix(in srgb, var(--lighter-80), transparent 50%) 0%,
            color-mix(in srgb, var(--lighter-80), transparent 90%) 40%,
            transparent 70%
        );
        opacity: 0;
        pointer-events: none;
        transition: opacity 300ms ease-out;
        z-index: 10;
    }

    // Border glow
    &::after {
        content: '';
        position: absolute;
        inset: -8px;
        padding: 8px;
        border-radius: calc(var(--radius-box) + 8px);
        background: radial-gradient(
            circle 180px at var(--mouse-x, 50%) var(--mouse-y, 50%),
            var(--color-primary),
            transparent 60%
        );
        opacity: 0;
        pointer-events: none;
        transition: opacity 300ms ease-out;
        z-index: -1;
        -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
        mask-composite: exclude;
    }
}

.card--back {
    transform: rotateY(180deg);
    backface-visibility: hidden;
    background: linear-gradient(135deg, var(--color-base-200) 15%, var(--color-primary), var(--color-accent) 50%, var(--color-secondary), var(--color-base-200) 95%);
    box-shadow: inset 0 0 10px 10px var(--color-base-100);
    /* I could add a logo here */
}
.card {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    background-color: var(--color-base-300);
    padding: 1.5rem 1rem;
    border-radius: var(--radius-box);
    max-width: 350px;
    box-shadow: 0 0 0 8px rgba(0,0,0,0.1);
    height: 100%;
    transform-style: preserve-3d;

    &__img {
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 120px;
        border-radius: 50%;
        border: 4px solid var(--color-primary);
        margin-bottom: 1rem;
        position: relative;
        overflow: hidden;
        box-shadow: 0px 0px 12px 2px var(--darker-10);
        transition: transform 400ms ease-out;
        pointer-events: none;

        // Weak glow around the image (primary color)
        &::after {
            content: '';
            position: absolute;
            height: 120px;
            inset: 0;
            background: radial-gradient(circle, transparent, var(--color-primary));
            opacity: 0.2;
            pointer-events: none;
            border-radius: inherit;
        }

        & img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transform: scale(1.1) translateY(0.25rem);
        }
    }

    &__info {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        font-family: "JetBrains Mono", monospace;
        transition: transform 400ms ease-out;
        pointer-events: none;

        & > div {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 0.45rem;
            width: 100%;
        }

        p {
            width: max-content;
            margin: 0;
        }
    }

    &__line {
        flex: 1;
        height: 1px;
        background-color: var(--color-primary);
        margin: 0 0.5rem;
    }
    &__medals {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
    
        & p {
            padding-bottom: 0.5rem;
        }
    
        & ul {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            justify-content: center;
            align-items: center;
            padding: 0;
            margin: 0;
            list-style: none;
        }
    
        & li {
            display: flex;
            align-items: center;
            gap: 0.25rem;
            font-size: 0.85rem;
            background-color: var(--color-primary);
            color: var(--color-primary-content);
            padding-inline: 0.5rem;
            height: 38px;
            border-radius: var(--radius-box);
            box-shadow:
            0 8px 32px rgba(0,0,0,0.20),
            inset 0 -32px 28px color-mix(in srgb, black, transparent 98%),
            inset 0 -12px 10px color-mix(in srgb, black, transparent 95%),
            inset 0 -8px 5px -3px color-mix(in srgb, black, transparent 92%),
            inset 0 1px 0 color-mix(in srgb, var(--color-base-content), transparent 92%),
            inset 0px -3px 0 0 var(--darker-30);
        }
    }
}

@keyframes spin {
    0% {
        transform: rotateY(-1800deg) scale(0.5);
    }
    100% {
        transform: rotateY(0deg) scale(1);
    }
}
</style>
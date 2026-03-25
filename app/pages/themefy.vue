<template>
    <main class="main fade-in">
        <AppLogo />
        <header class="section hero-header hero-bg min-h-screen">
            <div class="hero-header__grid">
                <div class="hero-header__title">
                    <h3>Hey, what's up? <br> I'm Sam!</h3>
                    <h1 id="title" class="hero-header__title-main gradient-text">
                        <span>{{'<'}}</span>
                        Creative Frontend Developer
                        <span>{{'/>'}}</span>
                    </h1>
                    <h2 class="py-6 text-left text-lg">Developer focused on clean architecture, practical solutions, professionalism, amazing experience and continuous learning!</h2>
                    <!-- <h2 class="py-6 text-left text-lg">Missing Technologies Section, Projects Section, About Me Section, Mobile Phone Section</h2> -->
                    <div class="hero-header__btn">
                        <AppButton fancy-btn>
                            Let's Begin!
                        </AppButton>
                    </div>
                </div>
                <div class="hero-header__card">
                    <div class="hero-header__card-img">
                        <img src="/avatar/pic.jpg" alt="Self portrait" >
                    </div>
                    <div class="hero-header__card-info">
                        <div><label>Name:</label><div class="hero-header__line"/><p>Samuel Vasconcelos</p></div>
                        <div><label>Role:</label><div class="hero-header__line"/><p>UI/UX Advocate</p></div>
                        <div><label>Logic:</label><div class="hero-header__line"/><p>115 points</p></div>
                        <div><label>Creativity:</label><div class="hero-header__line"/><p>85 points</p></div>
                        <div><label>Fun:</label><div class="hero-header__line"/><p>+9000 points</p></div>
                        <div class="hero-header__medals">
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
            </div>
        </header>

        <section class="section hero bg-base-200 min-h-screen">
            <span class="text-rotate text-7xl">
                <span class="justify-items-center">
                    <span>PROTOTYPE</span>
                    <span>DEVELOP</span>
                    <span>DEPLOY</span>
                    <span>SCALE</span>
                    <span>MAINTAIN</span>
                    <span>REPEAT</span>
                </span>
            </span>

            <div class="max-w-150 flex flex-col gap-4">
                <p>
                    I'm a developer who enjoys turning <span class="span-accent font-bold">ideas</span> into <span class="span-primary font-bold">visually appealing experiences</span>.
                    My work focuses on building reliable web applications and web pages, implementing clean code, learning modern tools deeply, 
                    and improving the way software is structured and delivered.
                </p>

                <p>
                    While my professional experience is still growing, I dedicate a significant amount of time to studying 
                    real-world development practices such as backend architecture, infrastructure, and modern web frameworks. 
                    I believe strong fundamentals and thoughtful design are what turn simple code into dependable software.
                </p>
            </div>
        </section>

        <section class="section app-card bg-base-100 w-96 shadow-sm">
            <figure>
                <img
                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                    alt="Shoes" 
                >
            </figure>
            <div class="app-card-body">
                <h2 class="app-card-title">
                    Card Title
                    <div class="app-badge app-badge-secondary">NEW</div>
                </h2>
                <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                <div class="app-card-actions justify-end">
                <div class="app-badge app-badge-outline">Fashion</div>
                <div class="app-badge app-badge-outline">Products</div>
                </div>
            </div>
        </section>

        <Teleport to="body">
            <AppMobileMenu />
        </Teleport>
    </main>
</template>

<script setup>

</script>

<style scoped lang="scss">
.main {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 100%;

    & .hero-header {
        position: relative;
        height: max-content;
        display: flex;
        align-items: center;
        justify-content: center;
        background: inherit;
        
        @media (max-width: 900px) {
            &__grid {
                grid-template-columns: 1fr;
                max-width: 100vw;
            }

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

        &__grid {
            display: flex;
            // grid-template-columns: 1fr max-content;
            gap: 1rem;
            width: 100%;
            max-width: 1280px;
            align-items: center;
            justify-content: center;
            margin: 0 auto;
            padding-inline: 2rem;

            @media(max-width: 900px) {
                padding-inline: 1rem;
            }
            
            @media(max-width: 768px) {
                height: max-content;
                flex-direction: column;
                gap: 2rem;
                padding: 8rem 1rem;
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

                @media (max-width: 900px) {
                    font-size: 3rem;
                }

                @media(max-width: 768px) {
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
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 1.5rem;

            @media(max-width: 768px) {
                position: absolute;
                bottom: 2rem;
                left: 50%;
                transform: translateX(-50%);
            }
        }

        &__card {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            background-color: var(--color-base-300);
            border-radius: var(--radius-box);
            padding: 1.5rem 1rem;
            max-width: 350px;
            width: 100%;
            box-shadow: 0 2px 16px 0 rgba(0,0,0,0.08);
            transform-style: preserve-3d;
            perspective: 100px;

            &-img {
                overflow: hidden;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 10rem;
                height: 10rem;
                border-radius: 50%;
                border: 4px solid var(--color-primary);
                margin-bottom: 1rem;
                position: relative;
                overflow: hidden;
                box-shadow: 0px 0px 12px 2px var(--darker-10);

                &::after {
                    content: '';
                    position: absolute;
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
                    transform: scale(1.1) translateY(5px);
                }
            }

            &-info {
                width: 100%;
                display: flex;
                flex-direction: column;
                gap: 1rem;
                font-family: "JetBrains Mono", monospace;

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
                padding: 0.25rem 0.5rem;
                border-radius: var(--radius-box);
                box-shadow: 2px 2px 0 0 var(--darker-30);
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
}

.phone {
    position: absolute;
    opacity: 0;
    animation: phoneShow linear forwards;
    animation-timeline: view();
    animation-range: entry 20% cover 50%;
}
</style>
<template>
    <main class="main fade-in">
        <section class="section section--1 hidden hero hero-bg min-h-screen">
            <div class="w-full flex flex-col items-center content-center">
                 <div class="w-inherit">
                    <h1 class="text-5xl font-bold">Building Thoughtful Software</h1>
                    <h2 class="py-6">Developer focused on clean architecture, practical solutions, and continuous learning.</h2>
                    <button class="btn btn-primary">Get Started</button>
                </div>
            </div>            
            <div class="w-full flex flex-col items-center content-center">
                 <div class="w-inherit">
                    <AppButton>
                        Things are going great!
                    </AppButton>
                </div>
            </div>            
        </section>
        
        <section class="section section--2 hidden bg-base-200 min-h-screen">
            <div class="w-max flex flex-col h-full items-center content-center lg:flex-row">
                 <div class="mockup-phone">
                    <div class="mockup-phone-camera"/>
                    <div class="mockup-phone-display w-[320px] h-175 text-white grid place-content-center bg-neutral-900">
                        It's Glowtime.
                    </div>
                </div>
            </div>
        </section>

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

            <div class="max-w-90 flex flex-col gap-4">
                <p>
                    I am a developer who enjoys turning ideas into working software. I am passionate about understanding how systems work beneath the surface. 
                    My work focuses on building reliable web applications, implementing clean code, learning modern tools deeply, 
                    and improving the way software is structured and delivered.
                </p>

                <p>
                    While my professional experience is still growing, I dedicate a significant amount of time to studying 
                    real-world development practices such as backend architecture, infrastructure, and modern web frameworks. 
                    I believe strong fundamentals and thoughtful design are what turn simple code into dependable software.
                </p>
            </div>
        </section>

        <section class="section hero bg-base-200 min-h-screen">
            <div class="w-max flex flex-col items-center content-center lg:flex-row">
                 <div class="max-w-md">
                    <h1 class="text-5xl font-bold">Hello there</h1>
                    <p class="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                    <button class="btn btn-primary">Get Started</button>
                </div>
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

        <div class="app-card app-card-dash bg-base-100 w-96">
            <div class="app-card-body">
                <h2 class="app-card-title">Card Title</h2>
                <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                <div class="app-card-actions justify-end">
                    <button class="app-btn--depth app-btn-primary">Buy Now</button>
                </div>
            </div>
        </div>

        <Teleport to="body">
            <AppMobileMenu />
        </Teleport>
    </main>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.main {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 100%;
    
    & .section {
        width: 100%;
        padding: 8rem 1rem 4rem;
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 4rem;
    }
}
</style>
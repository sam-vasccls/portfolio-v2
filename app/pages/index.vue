<template>
    <div class="wrapper">
        <AppButton>
            Hover Me
        </AppButton>
    </div>
</template>

<script setup> 
import throttle  from 'lodash/throttle'
const { $gsap: gsap } = useNuxtApp()
const timeline = gsap.timeline()
const textTimeline = gsap.timeline()
const timer = ref(0)
const isAnimationRunning = shallowRef(false)
const isPlaying = shallowRef(false)
let timerInterval = null;
let timerStart = 0;

const throttleTimeout = null;
const throttleToggleText = throttle(toggleText, 500)

async function toggleText(value) {
    textTimeline.kill();
    textTimeline.clear();

    if(value) {
        console.log('show Click')
        gsap.to(".play", { duration: 0.3, rotateX: 90})
        gsap.to(".click", {duration: 0.5, rotateX: 0, ease: 'bounce.out' })
        return
    } 

    console.log('show Play')
    gsap.to(".play", { duration: 0.5, rotateX: 0, ease: 'bounce.out' })
    gsap.to(".click", {duration: 0.3, rotateX: -90})
}

const toggleAnimationThrottle = await throttle(toggleAnimation, 500)

async function toggleAnimation() {

    // If animation is playing
    if(isPlaying.value){
        isPlaying.value = false

        throttleToggleText()

        timeline.pause()
        return
    }

    // If animation is paused but active
    if(isAnimationRunning.value && !isPlaying.value){
        isPlaying.value = true

        throttleToggleText(true)

        timeline.resume()
        return
    }

    // If animation is playing, but doesn't work
    // with pause and play (for now)
    if (throttleTimeout){
        return
    }

    isAnimationRunning.value = true
    isPlaying.value = true

    throttleToggleText(true)

    timer.value = 0;
    timerStart = performance.now();
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timer.value = ((performance.now() - timerStart) / 1000).toFixed(3);
    }, 10);

    // Clear timeline before replaying
    timeline.clear();
    await timeline.to(".box", { rotation: 360, x: 400, duration: 1.5 })
        .to(".box", { rotation: 0, x: -400, y: -350, duration: 1.5, opacity: 0}, "-=0.5")
        .to(".box", { rotation: 360, x: 0, y: -300, duration: 1.5, opacity: 1}, "-=0.75")
        .to(".box", { rotation: 0, x: 0, y: 0, duration: 1.5 }, "-=0.5")
        // .eventCallback("onComplete", () => {
        //     if (timerInterval) clearInterval(timerInterval);
        //     timerInterval = null;
        //     throttleTimeout = null;
        //     console.log('event callback worked')
        // });

    isPlaying.value = false
    isAnimationRunning.value = false
}

</script>

<style lang="scss" scoped>
.wrapper {
    display: flex;
    align-items: center;
    background-color: #fff;
    justify-content: center;
    width: 100%;
    overflow-x: hidden;
    height: 100vh;
}

.box {
    display: flex;
    justify-content: center;
    cursor: pointer;
    text-align: center;
    align-items: center;
    width: 250px;
    height: 150px;
    background: linear-gradient( to left top, rgb(223, 55, 55) 20%, rgb(16, 233, 186));
    border: 5px solid rgb(96, 47, 124);
    box-shadow: 0 0 20px 5px rgb(141, 59, 189);
    
    & h1 {
        position: absolute;
        display: inline-block;
        color: white;
        font-size: 2rem;
        user-select: none;

        &.play {
            transform-origin: center top;
        }

        &.click {
            transform-origin: center bottom;
            transform: rotateX(-90deg);
        }
    }
}
</style>
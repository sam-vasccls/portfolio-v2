import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin"

export default defineNuxtPlugin(() => {

    gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin)

    return {
        provide: {
            gsap
        }
    }

})

// USE --------------------------------

// const { $gsap: gsap } = useNuxtApp()

// onMounted(() => {
//     gsap.to(".box", { x: 200 })
// })

// Now GSAP is globally available.
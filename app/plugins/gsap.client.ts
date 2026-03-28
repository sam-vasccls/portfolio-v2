import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin"
import { Observer } from "gsap/Observer"
import { SplitText } from "gsap/SplitText"

/*
 * defineNuxtPlugin() is a Nuxt utility that registers a plugin which runs once
 * when the application boots — before any page or component renders.
 * The function receives the Nuxt app context (we don't need it here, so we ignore it).
 *
 * Plugins are the correct place to set up third-party libraries that need to be
 * globally available across the entire app, so you don't re-initialize them
 * in every component or page.
 */
export default defineNuxtPlugin(() => {

    /*
     * GSAP plugins are separate modules that extend the core library.
     * They must be explicitly "registered" before use — this is a GSAP requirement.
     * Under the hood, registerPlugin() links the plugin to the GSAP engine so
     * it knows how to handle animations or events that depend on it.
     *
     * - ScrollTrigger: ties animations to the browser's scroll position.
     * - MorphSVGPlugin: animates SVG path morphing between shapes.
     * - Observer: a lightweight, unified input listener for wheel, touch, and pointer events.
     *   We're using Observer here instead of a raw 'wheel' event listener because it:
     *   normalises delta values across devices (mouse wheel, trackpad, touch),
     *   handles preventDefault safely, and integrates naturally with the GSAP ecosystem.
     */
    gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin, Observer, SplitText)

    /*
     * The return value of defineNuxtPlugin() with a "provide" object makes these
     * values available everywhere in the app via `useNuxtApp()`.
     *
     * For example, in any component or page you can do:
     *   const { $gsap } = useNuxtApp()
     *   const { $observer } = useNuxtApp()
     *
     * Nuxt automatically prefixes provided keys with "$" to distinguish plugin
     * injections from your own composables and states.
     *
     * We provide the raw Observer class (not an instance) so that pages can call
     * Observer.create({ ... }) themselves to configure it per use-case.
     */
    return {
        provide: {
            gsap,
            observer: Observer
        }
    }

})

// USE --------------------------------

// const { $gsap: gsap } = useNuxtApp()

// onMounted(() => {
//     gsap.to(".box", { x: 200 })
// })

// Now GSAP is globally available.
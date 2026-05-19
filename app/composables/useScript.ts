export function useScript(cookie: boolean) {
    const LONG_LINE_TIMER = 800
    const MID_LINE_TIMER = 400
    const SHORT_LINE_TIMER = 200

    const script = [
        { prefix: "~ $", type: "type", text: "git clone https://github.com/sam-vasccls/portfolio-repo" },
        { prefix: ">", type: "loading", text: "cloning", duration: 2000, color: 'text-warning' },
        { prefix: ">", type: "success", text: "✓ Repository ready", duration: LONG_LINE_TIMER, color: 'text-success' },

        { prefix: "~ $", type: "type", text: "cd portfolio-repo" },
        { prefix: "~/portfolio-repo $", type: "type", text: "npm install" },
        { prefix: ">", type: "loading", text: "installing dependencies", duration: LONG_LINE_TIMER, color: 'text-warning' },
        { prefix: ">", type: "loading", text: "resolving dependencies", duration: LONG_LINE_TIMER, color: 'text-warning' },
        { prefix: ">", type: "loading", text: "building modules", duration: LONG_LINE_TIMER, color: 'text-warning' },
        { prefix: ">", type: "success", text: "✓ Dependencies installed", duration: SHORT_LINE_TIMER, color: 'text-success' },
        { prefix: ">", type: "success", text: "✓ Modules installed", duration: MID_LINE_TIMER, color: 'text-success' },

        { prefix: "~/portfolio-repo $", type: "type", text: "npm run dev" },
        { prefix: ">", type: "loading", text: "compiling project", duration: LONG_LINE_TIMER, color: 'text-warning' },

        { prefix: ">", type: "loading", text: "starting development server", duration: LONG_LINE_TIMER, color: 'text-warning' },
        { prefix: ">", type: "output", text: "✓ Vite v5.0.0 ready in 450ms", duration: MID_LINE_TIMER, color: 'text-success' },
        { prefix: ">", type: "output", text: "Nuxt 4.3.0 (with Nitro 2.13.1, Vite 7.3.1 and Vue 3.5.27)", duration: SHORT_LINE_TIMER, color: 'text-success' },
        { prefix: ">", type: "output", text: cookie ? "Cool animation intro... 👀" : "I should hire this guy! 👀", duration: SHORT_LINE_TIMER, color: 'text-success' },
        { prefix: ">", type: "output", text: "✓ Updated App.vue in 120ms", duration: SHORT_LINE_TIMER, color: 'text-success' },
        { prefix: ">", type: "success", text: "Server ready at http://localhost:3000", duration: SHORT_LINE_TIMER },
        { prefix: ">", type: "output", text: "[HMR] connected.", duration: MID_LINE_TIMER, color: 'text-success' },
        { prefix: ">", type: "output", text: "➜ Local:    http://localhost:3000/", duration: MID_LINE_TIMER, color: 'text-success' },
        { prefix: ">", type: "output", text: "➜ Network:  use --host to expose", duration: MID_LINE_TIMER },
    ]

    return { script }
}
export function useTheme() {
    const activeTheme = useState<string>('theme', () => 'dark')
    const activeColors = useState<string[]>('colors', () => ['white', 'oklch(58% 0.233 277.117)', 'oklch(65% 0.241 354.308)', 'oklch(77% 0.152 181.912)', 'oklch(21.15% 0.012 254.09)'])
    const isThemeApplied = useState<boolean>('isThemeApplied', () => false)
    const isDarkTheme = useState<boolean>('isDarkTheme', () => false)

    const titlesStyle = computed(() => {
        switch (activeTheme.value) {
            case 'cupcake':
                return 'section-title--cupcake'
            case 'bumblebee':
                return 'section-title--bee'
            case 'cyberpunk':
                return 'section-title--cyber'
            case 'aqua':
                return 'section-title--aqua'
            default:
                return isDarkTheme.value ? 'section-title--dark' : 'section-title--light'
        }
    })

    const darkThemes = ['dark', 'synthwave', 'halloween', 'dracula', 'business', 'night', 'coffee', 'abyss']

    const colors = {
        light: ['oklch(45% 0.24 277.023)', 'oklch(65% 0.241 354.308)', 'oklch(77% 0.152 181.912)', 'oklch(14% 0.005 285.823)', 'oklch(100% 0 0)'],
        dark: ['white', 'oklch(58% 0.233 277.117)', 'oklch(65% 0.241 354.308)', 'oklch(77% 0.152 181.912)', 'oklch(21.15% 0.012 254.09)'],
        cupcake: ['oklch(27% 0.006 286.033)', 'oklch(85% 0.138 181.071)', 'oklch(89% 0.061 343.231)', 'oklch(90% 0.076 70.697)', 'oklch(97.788% 0.004 56.375)'],
        bumblebee: ['oklch(85% 0.199 91.936)', 'oklch(0% 0 0)', 'oklch(75% 0.183 55.934)', 'oklch(37% 0.01 67.558)', 'oklch(97.788% 0.004 56.375)'],
        synthwave: ['oklch(75% 0.09 281.288)', 'oklch(71% 0.202 349.761)', 'oklch(45% 0.24 277.023)', 'oklch(75% 0.183 55.934)', 'oklch(15% 0.09 281.288)'],
        halloween: ['oklch(84.955% 0 0)', 'oklch(77.48% 0.204 60.62)', 'oklch(45.98% 0.248 305.03)', 'oklch(64.8% 0.223 136.073)', 'oklch(21% 0.006 56.043)'],
        dracula: ['oklch(75.461% 0.183 346.812)', 'oklch(74.202% 0.148 301.883)', 'oklch(83.392% 0.124 66.558)', 'oklch(39.445% 0.032 275.524)', 'oklch(28.822% 0.022 277.508)'],
        business: ['oklch(41.703% 0.099 251.473)', 'oklch(64.092% 0.027 229.389)', 'oklch(67.271% 0.167 35.791)', 'oklch(27.441% 0.013 253.041)', 'oklch(24.353% 0 0)'],
        night: ['oklch(84.153% 0.007 265.754)', 'oklch(75.351% 0.138 232.661)', 'oklch(68.011% 0.158 276.934)', 'oklch(72.36% 0.176 350.048)', 'oklch(27.949% 0.036 260.03)'],
        winter: ['oklch(19.616% 0.063 257.651)', 'oklch(56.86% 0.255 257.57)', 'oklch(42.551% 0.161 282.339)', 'oklch(59.939% 0.191 335.171)', 'oklch(100% 0 0)'],
        coffee: ['oklch(71.996% 0.123 62.756)', 'oklch(34.465% 0.029 199.194)', 'oklch(42.621% 0.074 224.389)', 'oklch(21% 0.021 329.708)', 'oklch(24% 0.023 329.708)'],
        ice: ['oklch(80% 0.105 251.813)', 'oklch(0% 0 0)', 'oklch(81% 0.111 293.571)', 'oklch(39% 0.07 227.392)', 'oklch(98% 0.019 200.873)'],
        aqua: ['oklch(85.661% 0.144 198.645)', 'oklch(60.682% 0.108 309.782)', 'oklch(93.426% 0.102 94.555)', 'oklch(27% 0.146 265.522)', 'oklch(37% 0.146 265.522)'],
        cyberpunk: ['oklch(74.22% 0.209 6.35)', 'oklch(83.33% 0.184 204.72)', 'oklch(71.86% 0.217 310.43)', 'oklch(23.04% 0.065 269.31)', 'oklch(94.51% 0.179 104.32)'],
        abyss: ['oklch(92% 0.2653 125)', 'oklch(83.27% 0.0764 298.3)', 'oklch(43% 0 0)', 'oklch(30% 0.08 209)', 'oklch(20% 0.08 209)'],
    } as Record<string, string[]>

    const applyTheme = (theme: string) => {
        activeTheme.value = theme
        if (import.meta.client) {
            localStorage.setItem('theme', theme)
        }
        activeColors.value = colors[theme] as string[]
        isDarkTheme.value = darkThemes.includes(activeTheme.value)
    }

    const initThemeFromStorage = () => {
        if (!import.meta.client) return
        const stored = localStorage.getItem('theme')
        if (stored && stored.trim().length > 0) {
            activeTheme.value = stored
            activeColors.value = colors[stored] as string[]

            isDarkTheme.value = darkThemes.includes(activeTheme.value)
        } else {
            applyTheme('dark')
        }

        setTimeout(() => isThemeApplied.value = true, 1000)
    }

    function defineTheme([key]: [string, string[]]) {
        applyTheme(key)
    }

    onMounted(() => {
        initThemeFromStorage()
    })

    return { activeTheme, colors, activeColors, titlesStyle, isThemeApplied, isDarkTheme, defineTheme, applyTheme, initThemeFromStorage }
}
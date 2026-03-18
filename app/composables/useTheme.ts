export function useTheme() {
    const activeTheme = useState<string>('theme', () => 'dark')
    const activeColors = useState<string[]>('colors', () => ['white', 'oklch(58% 0.233 277.117)', 'oklch(65% 0.241 354.308)', 'oklch(77% 0.152 181.912)', 'oklch(21.15% 0.012 254.09)'])
    const isThemeApplied = useState<boolean>('isThemeApplied', () => false)
    const isDarkTheme = useState<boolean>('isDarkTheme', () => false)

    const darkThemes = ['dark', 'synthwave', 'halloween', 'luxury', 'dracula', 'business', 'night', 'coffe', 'abyss']

    const colors = {
        light: ['oklch(45% 0.24 277.023)', 'oklch(65% 0.241 354.308)', 'oklch(77% 0.152 181.912)', 'oklch(14% 0.005 285.823)', 'oklch(100% 0 0)'],
        dark: ['white', 'oklch(58% 0.233 277.117)', 'oklch(65% 0.241 354.308)', 'oklch(77% 0.152 181.912)', 'oklch(21.15% 0.012 254.09)'],
        cupcake: ['oklch(27% 0.006 286.033)', 'oklch(85% 0.138 181.071)', 'oklch(89% 0.061 343.231)', 'oklch(90% 0.076 70.697)', 'oklch(97.788% 0.004 56.375)'],
        bumblebee: ['oklch(85% 0.199 91.936)', 'oklch(0% 0 0)', 'oklch(75% 0.183 55.934)', 'oklch(37% 0.01 67.558)', 'oklch(97.788% 0.004 56.375)'],
        emerald: ['oklch(76.662% 0.135 153.45)', 'oklch(61.302% 0.202 261.294)', 'oklch(72.772% 0.149 33.2)', 'oklch(35.519% 0.032 262.988)', 'oklch(97.788% 0.004 56.375)'],
        synthwave: ['oklch(75% 0.09 281.288)', 'oklch(71% 0.202 349.761)', 'oklch(45% 0.24 277.023)', 'oklch(75% 0.183 55.934)', 'oklch(15% 0.09 281.288)'],
        retro: ['oklch(80% 0.114 19.571)', 'oklch(92% 0.084 155.995)', 'oklch(68% 0.162 75.834)', 'oklch(44% 0.011 73.639)', 'oklch(91.637% 0.034 90.515)'],
        cyberpunk: ['oklch(74.22% 0.209 6.35)', 'oklch(83.33% 0.184 204.72)', 'oklch(71.86% 0.217 310.43)', 'oklch(23.04% 0.065 269.31)', 'oklch(94.51% 0.179 104.32)'],
        halloween: ['oklch(84.955% 0 0)', 'oklch(77.48% 0.204 60.62)', 'oklch(45.98% 0.248 305.03)', 'oklch(64.8% 0.223 136.073)', 'oklch(21% 0.006 56.043)'],
        aqua: ['oklch(85.661% 0.144 198.645)', 'oklch(60.682% 0.108 309.782)', 'oklch(93.426% 0.102 94.555)', 'oklch(27% 0.146 265.522)', 'oklch(37% 0.146 265.522)'],
        fantasy: ['oklch(93% 0 0)', 'oklch(37.45% 0.189 325.02)', 'oklch(53.92% 0.162 241.36)', 'oklch(75.98% 0.204 56.72)', 'oklch(100% 0 0)'],
        luxury: ['oklch(75.687% 0.123 76.89)', 'oklch(100% 0 0)', 'oklch(27.581% 0.064 261.069)', 'oklch(36.674% 0.051 338.825)', 'oklch(14.076% 0.004 285.822)'],
        dracula: ['oklch(75.461% 0.183 346.812)', 'oklch(74.202% 0.148 301.883)', 'oklch(83.392% 0.124 66.558)', 'oklch(39.445% 0.032 275.524)', 'oklch(28.822% 0.022 277.508)'],
        autumn: ['oklch(40.723% 0.161 17.53)', 'oklch(61.676% 0.169 23.865)', 'oklch(73.425% 0.094 60.729)', 'oklch(54.367% 0.037 51.902)', 'oklch(96% 0.007 247.896)'],
        business: ['oklch(41.703% 0.099 251.473)', 'oklch(64.092% 0.027 229.389)', 'oklch(67.271% 0.167 35.791)', 'oklch(27.441% 0.013 253.041)', 'oklch(24.353% 0 0)'],
        night: ['oklch(84.153% 0.007 265.754)', 'oklch(75.351% 0.138 232.661)', 'oklch(68.011% 0.158 276.934)', 'oklch(72.36% 0.176 350.048)', 'oklch(27.949% 0.036 260.03)'],
        coffee: ['oklch(71.996% 0.123 62.756)', 'oklch(34.465% 0.029 199.194)', 'oklch(42.621% 0.074 224.389)', 'oklch(21% 0.021 329.708)', 'oklch(24% 0.023 329.708)'],
        winter: ['oklch(19.616% 0.063 257.651)', 'oklch(56.86% 0.255 257.57)', 'oklch(42.551% 0.161 282.339)', 'oklch(59.939% 0.191 335.171)', 'oklch(100% 0 0)'],
        ice: ['oklch(80% 0.105 251.813)', 'oklch(0% 0 0)', 'oklch(81% 0.111 293.571)', 'oklch(39% 0.07 227.392)', 'oklch(98% 0.019 200.873)'],
        caramellatte: ['oklch(90% 0.076 70.697)', 'oklch(0% 0 0)', 'oklch(22.45% 0.075 37.85)', 'oklch(46.44% 0.111 37.85)', 'oklch(98% 0.016 73.684)'],
        abyss: ['oklch(92% 0.2653 125)', 'oklch(83.27% 0.0764 298.3)', 'oklch(43% 0 0)', 'oklch(30% 0.08 209)', 'oklch(20% 0.08 209)'],
        silk: ['oklch(23.27% 0.0249 284.3)', 'oklch(23.27% 0.0249 284.3)', 'oklch(23.27% 0.0249 284.3)', 'oklch(20% 0 0)', 'oklch(97% 0.0035 67.78)'],
        donald: ['oklch(0.401 0.322 20.087)', 'oklch(69% 0.17 162.48)', 'oklch(82% 0.189 84.429)', 'oklch(21% 0.006 285.885)', 'oklch(0.571 0.222 20.087)']
    } as Record<string, string[]>

    const applyTheme = (theme: string) => {
        activeTheme.value = theme
        if (import.meta.client) {
            localStorage.setItem('theme', theme)
        }
        activeColors.value = colors[theme] as string[]

        if (darkThemes.includes(activeTheme.value)) {
            console.log('Updating isDarkTheme', isDarkTheme.value)
            isDarkTheme.value = true
        } else {
            isDarkTheme.value = false
        }
    }

    const initThemeFromStorage = () => {
        if (!import.meta.client) return
        const stored = localStorage.getItem('theme')
        if (stored && stored.trim().length > 0) {
            activeTheme.value = stored
            activeColors.value = colors[stored] as string[]

            if (darkThemes.includes(activeTheme.value)) {
                isDarkTheme.value = true
            }
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

    return { activeTheme, colors, activeColors, isThemeApplied, isDarkTheme, defineTheme, applyTheme, initThemeFromStorage }
}
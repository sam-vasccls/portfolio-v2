export default function useScreenSize() {
    const isMobile = useState<boolean>('isMobile', () => false)
    const isNarrowMobile = useState<boolean>('isNarrowMobile', () => false)

    const updateIsMobile = () => {
        isMobile.value = window.innerWidth < 768
    }

    const updateIsNarrowMobile = () => {
        isNarrowMobile.value = window.innerWidth < 375
    }

    onMounted(() => {
        updateIsMobile()
        updateIsNarrowMobile()
        window.addEventListener('resize', updateIsMobile)
        window.addEventListener('resize', updateIsNarrowMobile)
    })

    onUnmounted(() => {
        window.removeEventListener('resize', updateIsMobile)
        window.removeEventListener('resize', updateIsNarrowMobile)
    })

    return {
        isMobile,
        isNarrowMobile
    }
}
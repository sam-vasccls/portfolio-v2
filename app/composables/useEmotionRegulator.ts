export function useEmotionRegulator() {
    const sentiment = useState<number>('sentiment', () => 100)
    const count = useState<number>('count', () => 0)

    const delay = (ms: number) => new Promise(r => setTimeout(r, ms))

    async function makeSad() {
        if (sentiment.value === 0) return

        count.value = sentiment.value

        for (let i = 0; i < 50; i++) {
            count.value -= 1
            await delay(10)
            if (count.value > 150) break
            sentiment.value = count.value
        }

        if (sentiment.value < 0) sentiment.value = 0
    }

    async function makeHappy() {
        if (sentiment.value === 150) return

        count.value = sentiment.value

        for (let i = 0; i < 50; i++) {
            count.value += 1
            await delay(10)
            if (count.value > 150) break
            sentiment.value = count.value
        }

        if (sentiment.value > 150) sentiment.value = 150
    }

    return {
        sentiment,
        makeSad,
        makeHappy
    }
}
<template>
    <section class="fixed top-0 left-0 w-full h-full bg-base-100 z-9999" data-theme="dark">
        <div v-if="!isReady" class="w-full h-full flex items-center justify-center">
            <span class="loading loading-infinity text-primary loading-xl"/>
        </div>

        <div v-else class="fade-in w-full h-full flex items-center justify-center flex-col gap-6 px-2 sm:px-4">
            <div class="font-bold w-full text-center">
                <span class="skeleton skeleton-text text-lg">Loading App (Not Really)</span>
            </div>
    
            <div ref="terminalEl" class="terminal w-full sm:w-2.5 md:w-1/2 2xl:w-1/3">
                <div class="btns">
                    <span/>
                    <span/>
                    <span/>
                </div>
                <span v-for="line in lines" :key="line.text" :data-prefix="line.prefix" :class="[line.color || '']">
                    <code class="px-4 flex content-start items-center">
                        <span class="mr-2">{{ line.prefix || '$' }}</span>
                        <span>{{ line.text }}</span>
                    </code>
                </span>
            </div>
    
            <div v-if="cookie" class="w-full flex flex-col items-center content-center h-12 pt-6" >
                <button
                    class="fade-in-skip-btn app-btn app-btn-soft app-btn-ghost btn-lg app-btn-primary flex items-center"
                    @click="closeLoadingAnimationScreen"
                >
                    <span>Skip Animation</span>
                    <Icon name="material-symbols:skip-next-outline-rounded" size="20"/>
                </button>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
const props = defineProps<{
    cookie: boolean
}>()

const { cookie } = toRefs(props)
const { script } = useScript(cookie.value)
const emit = defineEmits(['loading:finished'])

const terminalEl = ref<HTMLElement | null>(null)
const isReady = shallowRef(false)
const lines = ref<ScriptLine[]>([])
const scriptList = reactive<ScriptLine[]>(script as ScriptLine[])
const TYPING_TIMER = 40

const handlers = {
    type: typeWriter,
    loading: loadingAnimation,
    success: showSuccess,
    output: showOutput
}

function closeLoadingAnimationScreen(){
    emit('loading:finished')
}

const delay = (ms: number) => new Promise(r => setTimeout(r, ms))

type ScriptLine = {
    prefix: '$' | '>' | ' ',
    type?: string,
    text?: string,
    duration?: number,
    color?: string
}

function scrollTerminal() {
    if(terminalEl.value)
        terminalEl.value.scrollTop = terminalEl.value.scrollHeight
}

async function runScript() {
    for (const step of scriptList) {
        if (!step.type) continue
        await handlers[step.type as keyof typeof handlers](step)
    }

    if(terminalEl.value) {
        terminalEl.value.style.paddingBottom = '0.5rem'
    }

    await delay(500)
    closeLoadingAnimationScreen()
}

function addEmptyLine(prefix: '$' | '>' | ' ') {
    lines.value.push({
        prefix,
        type: '',
        text: ''
    })

    scrollTerminal()
}

async function typeWriter(line: ScriptLine) {
    addEmptyLine(line.prefix)

    for (let i = 0; i < (line.text?.length ?? 0); i++) {
        if(line.text && line.text.length > 0){
            appendCharacter(line.text[i]!)
        }
        await delay(TYPING_TIMER)
    }

    await delay(TYPING_TIMER * 2)

    scrollTerminal()
}

function appendCharacter(character: string) {
    const last = lines.value.at(-1)
    if (last) {
        last.text += character
    }
}

async function loadingAnimation(line: ScriptLine) {
    addEmptyLine(line.prefix)

    const index = lines.value.length - 1
    const baseText = line.text ?? ''
    const duration = line.duration ?? 2000

    if(line.color){
        lines.value[index]!.color = line.color
    }

    const start = Date.now()
    let dots = 0

    while (Date.now() - start < duration) {
        dots = (dots + 1) % 4
        lines.value[index]!.text = baseText + '.'.repeat(dots)
        await delay(400)
    }

    lines.value[index]!.text = baseText + '...'
    if(line.color){
        lines.value[index]!.color = ''
    }
    
    scrollTerminal()
}

async function showSuccess(line: ScriptLine) {
    lines.value.push({
        prefix: line.prefix,
        text: line.text ?? '',
        color: line.color ?? 'text-success'
    })

    if (line.duration) {
        await delay(line.duration)
    }

    scrollTerminal()
}

async function showOutput(line: ScriptLine) {
    const limitLines = 19
    const funLine = 15
    lines.value.push({
        prefix: line.prefix,
        text: line.text ?? '',
        color: line.color
    })

    if (line.duration) {
        await delay(line.duration)
    }

    const index = lines.value.length - 1

    if (index > limitLines && lines.value[funLine]?.text?.includes('guy')) {
        lines.value[funLine].text = 'What you looking for? 👀'
    }

    scrollTerminal()
}

onMounted(() => {
    isReady.value = true
    runScript()
})
</script>

<style lang="scss" scoped>
.terminal {
    position: relative;
    font-family: monospace;
    background: var(--color-neutral);
    border-radius: 12px;
    overflow-x: hidden;
    overflow-y: auto;
    height: 142px;
    min-height: 142px;
    padding-bottom: 2rem;
    max-height: 142px;
    scrollbar-width: none;
    -ms-overflow-style: none;
    scroll-behavior: smooth;

    &::-webkit-scrollbar {
        display: none;
    }

    @media (min-width: 425px) {
        min-width: 400px;
    }

    & .btns {
        width: 100%;
        position: sticky;
        top: 0rem;
        left: 0rem;
        padding: 1rem;
        height: 20px;
        z-index: 2;
        background-color: var(--color-neutral);

        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 8px;

        & span {
            border-radius: 50px;
            width: 0.75rem;
            height: 0.75rem;
            background-color: var(--color-base-100);
        }
    }
}
</style>
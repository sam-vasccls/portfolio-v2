<template>
    <button :class="['app-btn gap-3 fade-in', isLocked ? 'app-btn-error' : 'app-btn-success']" @click.stop="toggleLockButton">
        <span>Access</span>
        <div :class="['locker animate-pulse', {'active': isLocked}]">
            <svg
                width="24"
                height="24"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <!-- Shackle -->
                <path
                    :class="['shackle', isLocked ? 'locked' : 'unlocked']"
                    :d="`M8.4 10V7.9 C8.4 5.8 9.9 4.4 11.7 4.4 C13.5 4.4 15 5.8 15 ${isLocked ? '7.6V10' : '7.6V11'}`"
                    :stroke="isLocked ? 'var(--color-error-content)' : 'var(--color-success-content)'"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    fill="none"
                />

                <!-- Body -->
                <rect
                    x="5"
                    y="10"
                    width="12.8"
                    height="11"
                    rx="1.5"
                    :stroke="isLocked ? 'var(--color-error-content)' : 'var(--color-success-content)'"
                    stroke-width="1.7"
                    fill="none"
                />

                <!-- Dot -->
                <circle
                    cx="11.25"
                    cy="15.5"
                    r="1.8"
                    :fill="isLocked ? 'var(--color-error-content)' : 'var(--color-success-content)'"
                />
            </svg>
        </div>
    </button>
</template>

<script setup lang="ts">
const isLocked = ref(true)

const emit = defineEmits(['access:granted'])
const TIMER = 1000
function toggleLockButton() {
    isLocked.value = !isLocked.value
    setTimeout(() => {
        emit('access:granted')
    }, TIMER)
}
</script>

<style lang="scss" scoped>
.locker {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 16px;
    
    &.active {
        animation: bodyLock 250ms 600ms ease-in-out both;
        transition: 400ms ease-in-out;
        transform-origin: center center;
    }

    & .shackle {
        transform: translate(-0.2px, -1px);
        animation: lock 200ms ease-in-out both;
        transition: 400ms ease-in-out;
        transform-origin: center center;
        
        &.unlocked {
            animation: unlock 600ms 200ms cubic-bezier(0,0.98,0.76,1.2) both;
        }

        &.locked {
            animation: lock 500ms 200ms ease-in-out both;
        }
    }
}

@keyframes unlock {

    0% {
        transform: perspective(100px) translate(-0.2px, -1px) rotateY(0deg);
    }

    50% {
        transform: perspective(100px) translate(-0.2px, -2px) rotateY(0deg);
    }

    100% {
        transform: perspective(100px) translate(3px, -2px) rotateY(-180deg);
    }
}
@keyframes lock {

    0% {
        transform: perspective(100px) translate(3px, -2px) rotateY(-180deg);
    }

    50% {
        transform: perspective(100px) translate(-0.2px, -2px) rotateY(0deg);
    }

    100% {
        transform: translate(-0.2px, -1px);
    }
}
@keyframes bodyLock {

    0%, 100% {
        transform: rotateX(0deg) scale(1.05);
    }

    70% {
        transform: rotateX(35deg) scale(1.1);
    }
}

</style>
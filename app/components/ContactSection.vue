<template>
    <section class="section section-contact">
            <h2 :class="['section-title', titlesStyle]">Get In Touch</h2>
            <p class="section-subtitle">Let's build something together</p>

            <div class="contact-grid">
                <form class="contact-form" @submit.prevent="submitContactForm">
                    <div class="contact-form__field">
                        <label for="contact-name">Name</label>
                        <input
                            id="contact-name" 
                            v-model="contact.name"
                            name="name" 
                            :class="{'input-error': nameError}" 
                            type="text"
                            placeholder="Your name" 
                            autocomplete="name"
                        >
                        <span v-if="nameError" class="contact-error">{{ nameError }}</span>
                    </div>
                    <div class="contact-form__field">
                        <label for="contact-email">Email</label>
                        <input 
                            id="contact-email"
                            v-model="contact.email"
                            name="email"
                            :class="{'input-error': emailError}"
                            type="email"
                            placeholder="you@email.com"
                            autocomplete="email"
                        >
                        <span v-if="emailError" class="contact-error">{{ emailError }}</span>
                    </div>
                    <div class="contact-form__field">
                        <label for="contact-message">Message</label>
                        <textarea
                            id="contact-message"
                            v-model="contact.message"
                            name="message"
                            rows="5"
                            :class="{'input-error': messageError}"
                            placeholder="Tell me about your ideas..."
                        />
                        <span v-if="messageError" class="contact-error">{{ messageError }}</span>
                    </div>
                    <AppButton type="submit">
                        <Icon name="material-symbols:send-rounded" size="20" class="icon"/>
                        {{isSendingEmail ? 'Sending...' : 'Send Message'}}
                    </AppButton>
                </form>

                <div class="contact-info">
                    <div class="contact-info__block">
                        <Icon name="material-symbols:mail-outline-rounded" size="24" />
                        <div>
                            <h4>Email</h4>
                            <p>sam.vasconcelos.dev@gmail.com</p>
                        </div>
                    </div>
                    <div class="contact-info__block">
                        <Icon name="material-symbols:location-on-outline-rounded" size="24" />
                        <div>
                            <h4>Location</h4>
                            <p>Available remotely, worldwide</p>
                        </div>
                    </div>
                    <div class="contact-info__socials">
                        <a href="https://github.com/sam-vasccls" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                            <Icon name="tdesign:logo-github-filled" size="28" :class="['icon-dark', isDarkTheme && 'icon-light']" />
                        </a>
                        <a href="https://www.linkedin.com/in/sam-vasconcelos/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <Icon name="ant-design:linkedin-filled" size="28" :class="['icon-dark', isDarkTheme && 'icon-light']" />
                        </a>
                        <a href="https://www.instagram.com/sam.vasccls" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <Icon name="tdesign:logo-instagram" size="28" :class="['icon-dark',isDarkTheme && 'icon-light']"/>
                        </a>
                    </div>
                </div>
            </div>
        </section>
</template>

<script setup lang="ts">
const { isDarkTheme, titlesStyle } = useTheme()
const toast = useAppToast()

const contact = reactive({
    name: '',
    email: '',
    message: ''
})

const emailError = ref("")
const nameError = ref("")
const messageError = ref("")

function validateEmail(email: string) {
    return /^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/.test(email)
}

const isSendingEmail = shallowRef(false)
async function submitContactForm() {
    let valid = true
    nameError.value = ""
    emailError.value = ""
    messageError.value = ""

    if (!contact.name.trim()) {
        nameError.value = "Name is required"
        valid = false
    }
    if (!contact.email.trim()) {
        emailError.value = "Email is required"
        valid = false
    } else if (!validateEmail(contact.email)) {
        emailError.value = "Please enter a valid email address"
        valid = false
    }
    if (!contact.message.trim()) {
        messageError.value = "Message is required"
        valid = false
    }
    if (!valid) return

    isSendingEmail.value = true

    try {
        const response = await $fetch('/api/contact', {
            method: 'POST',
            body: { name: contact.name, email: contact.email, message: contact.message }
        })

        if(response.error) {
            throw new Error(response.error)
        }

        toast.success("Message sent successfully!")
    } catch (error) {
        console.error("Error sending contact form:", error)
        toast.error("Failed to send message. Try again later.")
        isSendingEmail.value = false
        return
    }

    
    contact.name = ""
    contact.email = ""
    contact.message = ""
    isSendingEmail.value = false
}


</script>

<style lang="scss" scoped>

.section-contact {
    background: var(--color-base-100);

    &::before {
        content: '';
        position: absolute;
        top: 2rem;
        left: 60%;
        width: 16rem;
        height: 16rem;
        background: var(--color-accent);
        filter: blur(110px);
        opacity: 0.12;
        pointer-events: none;
    }
}

.contact-grid {
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    gap: 3rem;
    max-width: 900px;
    width: 100%;
    z-index: 1;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
}

.contact-form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;

    &__field {
        display: flex;
        flex-direction: column;
        gap: 0.35rem;

        & label {
            font-size: 0.85rem;
            font-weight: 600;
            color: color-mix(in srgb, var(--color-base-content), transparent 20%);
        }

        & input, & textarea {
            padding: 0.75rem 1rem;
            border-radius: var(--radius-box);
            border: 1px solid color-mix(in srgb, var(--color-base-content), transparent 85%);
            background: var(--color-base-200);
            color: var(--color-base-content);
            font-family: inherit;
            font-size: 0.95rem;
            transition: border-color 0.2s, box-shadow 0.2s;
            outline: none;

            &:focus {
                border-color: var(--color-primary);
                box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary), transparent 80%);
            }

            &::placeholder {
                color: color-mix(in srgb, var(--color-base-content), transparent 60%);
            }
        }

        & textarea {
            resize: none;
            height: 150px;
            min-height: 150px;
        }

        & .contact-error {
            color: crimson; 
            font-size: 0.75rem; 
            margin-top: 0.25rem;
            font-weight: 600;
            // text-shadow: 0 0 2px color-mix(in srgb, crimson, transparent 60%);
        }

        & .input-error {
            border: 1px solid crimson;
            box-shadow: 0 0 0 3px color-mix(in srgb, crimson, transparent 80%);

            &:focus {
                box-shadow: 0 0 0 3px color-mix(in srgb, crimson, transparent 80%);
            }
        }
    }

    &__submit {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        padding: 0.85rem 2rem;
        border: none;
        border-radius: var(--radius-box);
        background: var(--color-primary);
        color: var(--color-primary-content);
        font-weight: 700;
        font-size: 1rem;
        cursor: pointer;
        transition: all 0.25s ease;
        align-self: flex-start;
        transform: translateY(12px);

        &:hover {
            transform: translateY(8px);
            box-shadow: 0 6px 20px color-mix(in srgb, var(--color-primary), transparent 50%);
        }

        &:active {
            transform: translateY(14px);
        }
    }
}

.contact-info {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    justify-content: center;

    &__block {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        color: var(--color-primary);

        & h4 {
            font-weight: 700;
            font-size: 0.95rem;
            color: var(--color-base-content);
        }

        & p {
            font-size: 0.9rem;
            color: color-mix(in srgb, var(--color-base-content), transparent 30%);
            margin: 0.15rem 0 0;
        }
    }

    &__socials {
        display: flex;
        gap: 1rem;
        align-items: center;
        padding-top: 1rem;

        @media(max-width: 768px) {
            justify-content: center;
        }

        & a {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background: var(--color-base-200);
            color: var(--color-base-content);
            transition: all 0.25s ease;
            user-select: none;

            &:hover {
                background: var(--color-primary);
                transform: translateY(-3px);
                box-shadow: 0 6px 16px color-mix(in srgb, var(--color-primary), transparent 50%);

                & .icon-dark {
                    color: white;
                }
            }
        }
    }

    &__social-icon {
        width: 28px;
        height: 28px;
        object-fit: contain;
    }
}
</style>
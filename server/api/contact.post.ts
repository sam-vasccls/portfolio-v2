import { Resend } from 'resend'
import { readBody } from '#imports';


export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const resend = new Resend(process.env.API_KEY)

    const response = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'sam.vasconcelos.dev@gmail.com',
        replyTo: `${body.email}`,
        subject: `Portfolio Contact - ${body.name} `,
        html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2 style="color: oklch(45% 0.24 277.023);">Portfolio Contact</h2>
            <p><strong>Name:</strong> ${body.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${body.email}" style="color: oklch(45% 0.24 277.023); text-decoration: none;">${body.email}</a></p>
            <p><strong>Message:</strong></p>
            <div style="background: oklch(93% 0.034 272.788); padding: 10px; border: 1px solid oklch(95% 0 0); border-radius: 5px;">
                <p>${body.message}</p>
            </div>
        </div>`,
    });

    if (response.error) {
        throw createError({
            statusCode: 500,
            message: 'Error sending email',
        });
    }

    console.log('RESPONSE:', response)

    return response;
});
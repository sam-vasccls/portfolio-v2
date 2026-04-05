import { Resend } from 'resend'
import { readBody } from '#imports';


export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const resend = new Resend(process.env.API_KEY)

    const response = await resend.emails.send({
        from: `${body.email}`,
        to: 'sam.vasconcelos.dev@gmail.com',
        subject: `Portfolio Contact - Name: ${body.name} `,
        html: `
        <strong>Name: ${body.name}</strong>
        <br/>
        <strong>Email: ${body.email}</strong>
        <br/>
        <strong>Message:</strong>
        <br/><br/>
        <p>${body.message}</p>`,
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
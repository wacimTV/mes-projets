import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json()

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Tous les champs sont requis." }, { status: 400 })
    }

    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["w.ammouche13@gmail.com"],
      subject: `[Portfolio] ${subject}`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f9fafb; border-radius: 12px;">
          <h2 style="color: #111827; margin-bottom: 24px;">Nouveau message de ton portfolio</h2>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-weight: 600; width: 100px;">Nom</td>
              <td style="padding: 8px 0; color: #111827;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Email</td>
              <td style="padding: 8px 0; color: #111827;">
                <a href="mailto:${email}" style="color: #6366f1;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Sujet</td>
              <td style="padding: 8px 0; color: #111827;">${subject}</td>
            </tr>
          </table>
          
          <div style="margin-top: 24px; padding: 16px; background: #fff; border-radius: 8px; border: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-weight: 600; margin: 0 0 8px;">Message</p>
            <p style="color: #111827; margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
          
          <p style="margin-top: 24px; color: #9ca3af; font-size: 12px;">
            Répondre directement à cet email pour contacter ${name}.
          </p>
        </div>
      `,
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json({ error: "Échec de l'envoi du mail." }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Contact API error:", err)
    return NextResponse.json({ error: "Erreur interne du serveur." }, { status: 500 })
  }
}

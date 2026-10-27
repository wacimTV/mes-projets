import { Appointment } from "@/types";
import { GARAGE_CONFIG } from "@/config/garage";

export async function sendAppointmentNotifications(appointment: Appointment): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;

  const subjectClient = `Confirmation de votre demande de rendez-vous - ${GARAGE_CONFIG.name}`;
  const subjectGarage = `NOUVEAU RENDEZ-VOUS : ${appointment.client.firstName} ${appointment.client.lastName} - ${appointment.date} à ${appointment.time}`;

  console.log(`[EMAIL NOTIFICATION] Preparation d'envoi pour RDV #${appointment.id}`);
  console.log(`  -> Client: ${appointment.client.email} (${subjectClient})`);
  console.log(`  -> Garage: ${GARAGE_CONFIG.contact.email} (${subjectGarage})`);

  if (!apiKey) {
    console.log(
      `[EMAIL NOTICE] Clé RESEND_API_KEY non configurée. Les notifications sont simulées avec succès en mode local.`
    );
    return true;
  }

  try {
    // Si Resend est configuré ultérieurement
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `Run Auto <notifications@runauto-marseille.fr>`,
        to: [appointment.client.email],
        subject: subjectClient,
        html: `
          <div style="font-family: sans-serif; background: #0A0A0B; color: #F5F4F0; padding: 30px; border-radius: 8px;">
            <h2 style="color: #C6A875;">RUN AUTO - MARSEILLE</h2>
            <p>Bonjour ${appointment.client.firstName} ${appointment.client.lastName},</p>
            <p>Nous avons bien reçu votre demande de rendez-vous pour votre véhicule <strong>${appointment.vehicle.make} ${appointment.vehicle.model}</strong>.</p>
            <div style="background: #17191D; padding: 20px; border-left: 4px solid #C6A875; margin: 20px 0;">
              <p><strong>Prestation :</strong> ${appointment.serviceName}</p>
              <p><strong>Date souhaitée :</strong> ${appointment.date} à ${appointment.time}</p>
              <p><strong>Statut :</strong> Demande enregistrée, en attente de confirmation par nos équipes.</p>
            </div>
            <p>Notre atelier à Marseille (52 boulevard de Roux, 13004) vous recontactera sous 2h ouvrées au <strong>${appointment.client.phone}</strong>.</p>
            <p>Cordialement,<br>L'équipe Run Auto</p>
          </div>
        `,
      }),
    });

    return res.ok;
  } catch (error) {
    console.error("[EMAIL ERROR] Erreur lors de l'envoi de l'e-mail:", error);
    return false;
  }
}

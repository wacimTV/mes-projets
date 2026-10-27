import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/storage";
import { isSlotAvailable } from "@/lib/availability";
import { verifyAdminSession } from "@/lib/auth";
import { sendAppointmentNotifications } from "@/lib/email";
import { Appointment } from "@/types";

export async function GET() {
  const isAdmin = await verifyAdminSession();
  if (!isAdmin) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const appointments = storage.getAppointments();
  return NextResponse.json({ appointments });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Protection anti-spam honeypot
    if (body.website_trap && body.website_trap.length > 0) {
      return NextResponse.json({ error: "Requête suspecte rejetée" }, { status: 400 });
    }

    const {
      serviceId,
      serviceName,
      isCustomRequest,
      problemDescription,
      vehicle,
      client,
      date,
      time,
    } = body;

    // Validation des données requises
    if (!serviceName || !date || !time) {
      return NextResponse.json(
        { error: "Veuillez renseigner le service, la date et l'heure." },
        { status: 400 }
      );
    }

    if (!vehicle || !vehicle.make || !vehicle.model) {
      return NextResponse.json(
        { error: "Veuillez renseigner la marque et le modèle du véhicule." },
        { status: 400 }
      );
    }

    if (!client || !client.firstName || !client.lastName || !client.phone || !client.email) {
      return NextResponse.json(
        { error: "Veuillez renseigner vos coordonnées complètes (nom, prénom, téléphone et e-mail)." },
        { status: 400 }
      );
    }

    // Validation basique téléphone et email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(client.email)) {
      return NextResponse.json(
        { error: "Adresse e-mail invalide." },
        { status: 400 }
      );
    }

    const phoneClean = client.phone.replace(/[\s.-]/g, "");
    if (phoneClean.length < 8) {
      return NextResponse.json(
        { error: "Numéro de téléphone incomplet." },
        { status: 400 }
      );
    }

    // Vérification de la disponibilité effective du créneau
    const availabilityCheck = isSlotAvailable(date, time);
    if (!availabilityCheck.available) {
      return NextResponse.json(
        { error: availabilityCheck.error || "Ce créneau n'est pas disponible." },
        { status: 409 }
      );
    }

    const appointmentId = `APT-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    const newAppointment: Appointment = {
      id: appointmentId,
      createdAt: new Date().toISOString(),
      serviceId: serviceId || "custom",
      serviceName,
      isCustomRequest: Boolean(isCustomRequest),
      problemDescription: problemDescription || "",
      vehicle: {
        make: vehicle.make.trim(),
        model: vehicle.model.trim(),
        year: vehicle.year?.trim() || "",
        fuel: vehicle.fuel?.trim() || "",
        licensePlate: vehicle.licensePlate?.trim() || "",
      },
      client: {
        firstName: client.firstName.trim(),
        lastName: client.lastName.trim(),
        phone: client.phone.trim(),
        email: client.email.trim().toLowerCase(),
        preferredContact: client.preferredContact || "phone",
      },
      date,
      time,
      status: "pending",
      ipAddress: request.headers.get("x-forwarded-for") || "local",
    };

    // Sauvegarde atomique avec protection double réservation
    storage.createAppointment(newAppointment);

    // Déclenchement de la notification (non-bloquant)
    sendAppointmentNotifications(newAppointment).catch((err) =>
      console.error("[NOTIFICATION FAILURE]", err)
    );

    return NextResponse.json(
      {
        success: true,
        message: "Votre demande de rendez-vous a été enregistrée avec succès.",
        appointment: newAppointment,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("[APPOINTMENT POST ERROR]", error);
    const msg = error instanceof Error ? error.message : "Erreur interne du serveur";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/storage";
import { verifyAdminSession } from "@/lib/auth";
import { ContactMessage } from "@/types";

export async function GET() {
  const isAdmin = await verifyAdminSession();
  if (!isAdmin) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const contacts = storage.getContacts();
  return NextResponse.json({ contacts });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Anti-spam honeypot
    if (body.website_trap && body.website_trap.length > 0) {
      return NextResponse.json({ error: "Requête suspecte" }, { status: 400 });
    }

    const { name, email, phone, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Veuillez renseigner votre nom, votre e-mail et votre message." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Adresse e-mail non valide." },
        { status: 400 }
      );
    }

    const contactId = `MSG-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    const newContact: ContactMessage = {
      id: contactId,
      createdAt: new Date().toISOString(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || "",
      subject: subject?.trim() || "Demande d'information",
      message: message.trim(),
      status: "new",
      ipAddress: request.headers.get("x-forwarded-for") || "local",
    };

    storage.createContact(newContact);

    console.log(`[CONTACT SUBMITTED] Nouveau message de ${newContact.name} (${newContact.email}) - Sujet: ${newContact.subject}`);

    return NextResponse.json(
      {
        success: true,
        message: "Votre message a bien été envoyé. Notre équipe vous répondra dans les plus brefs délais.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[CONTACT POST ERROR]", error);
    return NextResponse.json({ error: "Erreur interne" }, { status: 500 });
  }
}

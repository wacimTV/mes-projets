import { NextRequest, NextResponse } from "next/server";
import { validatePassword, setAdminSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!password || !validatePassword(password)) {
      return NextResponse.json(
        { error: "Mot de passe d'administration incorrect." },
        { status: 401 }
      );
    }

    await setAdminSession();
    return NextResponse.json({ success: true, message: "Authentification réussie" });
  } catch {
    return NextResponse.json({ error: "Erreur de traitement" }, { status: 500 });
  }
}

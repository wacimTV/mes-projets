import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/storage";
import { verifyAdminSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const isAdmin = await verifyAdminSession();
  if (!isAdmin) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { date } = await request.json();
  if (!date) {
    return NextResponse.json({ error: "Date requise" }, { status: 400 });
  }

  const isNowBlocked = storage.toggleBlockedDate(date);
  return NextResponse.json({
    success: true,
    isBlocked: isNowBlocked,
    message: isNowBlocked ? `Date ${date} bloquée` : `Date ${date} débloquée`,
  });
}

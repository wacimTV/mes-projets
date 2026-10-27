import { cookies } from "next/headers";

const ADMIN_COOKIE_NAME = "run_auto_admin_session";
const DEFAULT_ADMIN_PASS = process.env.ADMIN_PASSWORD || "RunAuto2026!";

// Simple deterministic hash token for session
function createToken(): string {
  return Buffer.from(`run-auto-admin:${DEFAULT_ADMIN_PASS}:${new Date().toDateString()}`).toString("base64");
}

export async function verifyAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_COOKIE_NAME);
  if (!session?.value) return false;

  const validToken = createToken();
  return session.value === validToken;
}

export async function setAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  const token = createToken();
  cookieStore.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 jours
  });
}

export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}

export function validatePassword(password: string): boolean {
  return password === DEFAULT_ADMIN_PASS;
}

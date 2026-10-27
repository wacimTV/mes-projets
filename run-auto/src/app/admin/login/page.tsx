"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Key, AlertCircle, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Mot de passe erroné");
      }

      router.push("/admin");
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erreur de connexion";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#0A0A0B] px-4 py-16">
      <div className="w-full max-w-md p-8 rounded-2xl bg-[#17191D] border border-[#292C32] shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-[#292C32] border border-[#C6A875]/40 flex items-center justify-center text-[#C6A875] mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-[#F5F4F0]">Espace Gestion Atelier</h1>
          <p className="text-xs text-[#A7A9AE]">
            Accès sécurisé réservé au responsable du garage Run Auto.
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/30 flex items-center gap-2 text-red-200 text-xs">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#F5F4F0] uppercase tracking-wider mb-2">
              Mot de passe administrateur
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Entrez votre mot de passe"
                className="w-full bg-[#0A0A0B] border border-[#292C32] rounded-xl px-4 py-3 pl-10 text-sm text-[#F5F4F0] placeholder-[#555A64] focus:outline-none focus:border-[#C6A875]"
              />
              <Key className="w-4 h-4 text-[#A7A9AE] absolute left-3.5 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-champagne w-full py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Vérification...</span>
              </>
            ) : (
              <span>Se connecter au tableau de bord</span>
            )}
          </button>
        </form>

        <div className="pt-4 border-t border-[#23272F] text-center">
          <p className="text-[11px] text-[#A7A9AE]">
            Mot de passe initial de démonstration : <code className="text-[#C6A875] font-mono">RunAuto2026!</code>
          </p>
        </div>
      </div>
    </div>
  );
}

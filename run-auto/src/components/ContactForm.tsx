"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Demande de devis d'entretien",
    message: "",
  });

  const [honeypot, setHoneypot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          website_trap: honeypot,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Une erreur est survenue lors de l'envoi.");
      }

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "Demande de devis d'entretien",
        message: "",
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erreur de connexion";
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#17191D] border border-[#292C32] rounded-2xl p-6 sm:p-10 shadow-2xl relative">
      <h3 className="text-2xl font-bold text-[#F5F4F0] mb-2">Envoyez-nous un message</h3>
      <p className="text-xs text-[#A7A9AE] mb-8">
        Une question sur une pièce, un devis de révision ou un conseil technique ? Nous vous répondons rapidement.
      </p>

      {/* Honeypot field for anti-spam */}
      <input
        type="text"
        name="website_trap"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-500/30 flex items-start gap-3 text-red-200 text-xs">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <p>{error}</p>
        </div>
      )}

      {success ? (
        <div className="p-8 text-center rounded-xl bg-[#0A0A0B] border border-[#C6A875]/30 space-y-4">
          <CheckCircle2 className="w-12 h-12 text-[#C6A875] mx-auto" />
          <h4 className="text-lg font-bold text-[#F5F4F0]">Message envoyé avec succès !</h4>
          <p className="text-xs text-[#A7A9AE]">
            Nous avons bien reçu votre demande et vous recontacterons dans les plus brefs délais pendant nos heures d'ouverture.
          </p>
          <button
            onClick={() => setSuccess(false)}
            className="btn-outline-champagne px-5 py-2 rounded-xl text-xs font-semibold mt-2"
          >
            Envoyer un autre message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#F5F4F0] uppercase tracking-wider mb-1.5">
                Nom complet *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Votre nom et prénom"
                className="w-full bg-[#0A0A0B] border border-[#292C32] rounded-xl px-4 py-3 text-sm text-[#F5F4F0] placeholder-[#555A64] focus:outline-none focus:border-[#C6A875]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#F5F4F0] uppercase tracking-wider mb-1.5">
                Téléphone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="06 12 34 56 78"
                className="w-full bg-[#0A0A0B] border border-[#292C32] rounded-xl px-4 py-3 text-sm text-[#F5F4F0] placeholder-[#555A64] focus:outline-none focus:border-[#C6A875]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#F5F4F0] uppercase tracking-wider mb-1.5">
              Adresse e-mail *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="votre.email@domaine.fr"
              className="w-full bg-[#0A0A0B] border border-[#292C32] rounded-xl px-4 py-3 text-sm text-[#F5F4F0] placeholder-[#555A64] focus:outline-none focus:border-[#C6A875]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#F5F4F0] uppercase tracking-wider mb-1.5">
              Objet de votre demande
            </label>
            <select
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full bg-[#0A0A0B] border border-[#292C32] rounded-xl px-4 py-3 text-sm text-[#F5F4F0] focus:outline-none focus:border-[#C6A875]"
            >
              <option value="Demande de devis d'entretien">Demande de devis d'entretien</option>
              <option value="Question sur un diagnostic de panne">Question sur un diagnostic de panne</option>
              <option value="Devis freinage / distribution / embrayage">Devis freinage / distribution / embrayage</option>
              <option value="Renseignement sur la prise en charge">Renseignement sur la prise en charge</option>
              <option value="Autre demande">Autre demande</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#F5F4F0] uppercase tracking-wider mb-1.5">
              Votre message *
            </label>
            <textarea
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Indiquez le modèle de votre véhicule et toute précision utile..."
              className="w-full bg-[#0A0A0B] border border-[#292C32] rounded-xl px-4 py-3 text-sm text-[#F5F4F0] placeholder-[#555A64] focus:outline-none focus:border-[#C6A875]"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-champagne w-full py-3.5 px-6 rounded-xl text-sm font-bold flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Envoi en cours...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Envoyer le message</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}

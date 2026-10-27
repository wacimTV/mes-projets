"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Calendar,
  Clock,
  Car,
  User,
  Phone,
  Mail,
  CheckCircle2,
  XCircle,
  AlertCircle,
  LogOut,
  CalendarDays,
  MessageSquare,
  Wrench,
  Trash2,
  ShieldCheck,
  Search,
  Filter,
} from "lucide-react";
import { Appointment, ContactMessage, AppointmentStatus } from "@/types";
import { GARAGE_CONFIG } from "@/config/garage";

interface AdminDashboardClientProps {
  initialAppointments: Appointment[];
  initialContacts: ContactMessage[];
  initialBlockedDates: string[];
}

export default function AdminDashboardClient({
  initialAppointments,
  initialContacts,
  initialBlockedDates,
}: AdminDashboardClientProps) {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [contacts, setContacts] = useState<ContactMessage[]>(initialContacts);
  const [blockedDates, setBlockedDates] = useState<string[]>(initialBlockedDates);

  const [activeTab, setActiveTab] = useState<"appointments" | "contacts" | "calendar" | "services">("appointments");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedApt, setSelectedApt] = useState<Appointment | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Date à bloquer manuellement
  const [newBlockedDate, setNewBlockedDate] = useState("");

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const handleUpdateStatus = async (id: string, newStatus: AppointmentStatus) => {
    setIsUpdating(true);
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setAppointments((prev) =>
          prev.map((apt) => (apt.id === id ? { ...apt, status: newStatus } : apt))
        );
        if (selectedApt && selectedApt.id === id) {
          setSelectedApt({ ...selectedApt, status: newStatus });
        }
      }
    } catch (err) {
      console.error("Erreur lors de la mise à jour", err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteAppointment = async (id: string) => {
    if (!confirm("Voulez-vous vraiment supprimer définitivement ce rendez-vous ?")) return;

    try {
      const res = await fetch(`/api/appointments/${id}`, { method: "DELETE" });
      if (res.ok) {
        setAppointments((prev) => prev.filter((a) => a.id !== id));
        if (selectedApt?.id === id) setSelectedApt(null);
      }
    } catch (err) {
      console.error("Erreur suppression", err);
    }
  };

  const handleToggleBlockedDate = async (dateStr: string) => {
    if (!dateStr) return;
    try {
      const res = await fetch("/api/admin/toggle-date", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: dateStr }),
      });
      const data = await res.json();
      if (data.success) {
        if (data.isBlocked) {
          setBlockedDates((prev) => [...prev, dateStr]);
        } else {
          setBlockedDates((prev) => prev.filter((d) => d !== dateStr));
        }
        setNewBlockedDate("");
      }
    } catch (err) {
      console.error("Erreur toggle date", err);
    }
  };

  // KPIs
  const todayStr = new Date().toISOString().split("T")[0];
  const pendingCount = appointments.filter((a) => a.status === "pending").length;
  const todayCount = appointments.filter((a) => a.date === todayStr && a.status !== "cancelled").length;
  const confirmedCount = appointments.filter((a) => a.status === "confirmed").length;
  const contactsCount = contacts.length;

  // Filtered Appointments
  const filteredAppointments = appointments.filter((apt) => {
    const matchStatus = statusFilter === "all" || apt.status === statusFilter;
    const query = searchQuery.toLowerCase();
    const matchQuery =
      apt.client.lastName.toLowerCase().includes(query) ||
      apt.client.firstName.toLowerCase().includes(query) ||
      apt.client.phone.includes(query) ||
      apt.vehicle.make.toLowerCase().includes(query) ||
      apt.vehicle.model.toLowerCase().includes(query) ||
      (apt.vehicle.licensePlate && apt.vehicle.licensePlate.toLowerCase().includes(query)) ||
      apt.id.toLowerCase().includes(query);

    return matchStatus && matchQuery;
  });

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#F5F4F0] pt-6 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Top Bar Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#23272F] mb-8">
          <div>
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C6A875] animate-pulse" />
              <h1 className="text-2xl font-black tracking-wide uppercase">
                Tableau de Bord Atelier • Run Auto
              </h1>
            </div>
            <p className="text-xs text-[#A7A9AE] mt-1">
              52 boulevard de Roux, 13004 Marseille • Gestion des réservations et des disponibilités
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="btn-outline-champagne px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Déconnexion</span>
          </button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-[#17191D] border border-[#C6A875]/40 shadow-xl">
            <span className="text-xs font-bold text-[#D7BC8C] uppercase tracking-wider block mb-1">
              En Attente de Validation
            </span>
            <span className="text-3xl font-extrabold text-[#F5F4F0]">{pendingCount}</span>
            <span className="text-[11px] text-[#A7A9AE] block mt-1">Demandes à confirmer</span>
          </div>

          <div className="p-5 rounded-2xl bg-[#17191D] border border-[#292C32]">
            <span className="text-xs font-bold text-[#A7A9AE] uppercase tracking-wider block mb-1">
              Rendez-vous Aujourd'hui
            </span>
            <span className="text-3xl font-extrabold text-[#F5F4F0]">{todayCount}</span>
            <span className="text-[11px] text-[#A7A9AE] block mt-1">Véhicules attendus</span>
          </div>

          <div className="p-5 rounded-2xl bg-[#17191D] border border-[#292C32]">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-1">
              Confirmés
            </span>
            <span className="text-3xl font-extrabold text-[#F5F4F0]">{confirmedCount}</span>
            <span className="text-[11px] text-[#A7A9AE] block mt-1">Dossiers validés</span>
          </div>

          <div className="p-5 rounded-2xl bg-[#17191D] border border-[#292C32]">
            <span className="text-xs font-bold text-[#A7A9AE] uppercase tracking-wider block mb-1">
              Messages Reçus
            </span>
            <span className="text-3xl font-extrabold text-[#F5F4F0]">{contactsCount}</span>
            <span className="text-[11px] text-[#A7A9AE] block mt-1">Demandes de devis</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-[#23272F] pb-3 mb-8 overflow-x-auto">
          {[
            { id: "appointments", label: "Demandes de Rendez-vous", icon: Calendar },
            { id: "contacts", label: "Messages de Contact", icon: MessageSquare },
            { id: "calendar", label: "Fermetures & Disponibilités", icon: CalendarDays },
            { id: "services", label: "Prestations Configurées", icon: Wrench },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 shrink-0 transition-all ${
                  isActive
                    ? "bg-[#C6A875] text-[#0A0A0B] shadow-md shadow-[#C6A875]/20 font-bold"
                    : "bg-[#17191D] text-[#A7A9AE] hover:text-[#F5F4F0] hover:bg-[#292C32]"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: APPOINTMENTS */}
        {activeTab === "appointments" && (
          <div className="space-y-6">
            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[#17191D] p-4 rounded-2xl border border-[#23272F]">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#A7A9AE] absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher par client, immatriculation, véhicule, réf..."
                  className="w-full bg-[#0A0A0B] border border-[#292C32] rounded-xl pl-10 pr-4 py-2 text-xs text-[#F5F4F0] focus:outline-none focus:border-[#C6A875]"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto">
                <Filter className="w-3.5 h-3.5 text-[#A7A9AE] shrink-0" />
                {[
                  { id: "all", label: "Tous" },
                  { id: "pending", label: "En attente" },
                  { id: "confirmed", label: "Confirmés" },
                  { id: "completed", label: "Terminés" },
                  { id: "cancelled", label: "Annulés" },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setStatusFilter(f.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      statusFilter === f.id
                        ? "bg-[#C6A875] text-[#0A0A0B] font-bold"
                        : "bg-[#0A0A0B] text-[#A7A9AE] hover:text-[#F5F4F0]"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Appointments Table */}
            {filteredAppointments.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-[#17191D] border border-[#23272F] text-sm text-[#A7A9AE]">
                Aucun rendez-vous correspondant au filtre.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {filteredAppointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="p-5 rounded-2xl bg-[#17191D] border border-[#23272F] hover:border-[#353941] transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
                  >
                    {/* Status & Date */}
                    <div className="flex items-start gap-4 min-w-[200px]">
                      <div className="w-12 h-12 rounded-xl bg-[#0A0A0B] border border-[#292C32] flex flex-col items-center justify-center shrink-0">
                        <span className="text-[10px] uppercase text-[#A7A9AE]">
                          {apt.date.split("-")[2]}
                        </span>
                        <span className="text-xs font-bold text-[#C6A875]">{apt.time}</span>
                      </div>
                      <div>
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full inline-block mb-1 ${
                            apt.status === "pending"
                              ? "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                              : apt.status === "confirmed"
                              ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                              : apt.status === "completed"
                              ? "bg-blue-500/15 text-blue-300 border border-blue-500/30"
                              : "bg-red-500/15 text-red-300 border border-red-500/30"
                          }`}
                        >
                          {apt.status === "pending" && "En attente"}
                          {apt.status === "confirmed" && "Confirmé"}
                          {apt.status === "completed" && "Terminé"}
                          {apt.status === "cancelled" && "Annulé"}
                        </span>
                        <p className="text-xs text-[#A7A9AE]">{apt.date}</p>
                        <p className="text-[10px] font-mono text-[#555A64]">{apt.id}</p>
                      </div>
                    </div>

                    {/* Service & Problem */}
                    <div className="flex-1">
                      <p className="text-sm font-bold text-[#F5F4F0]">{apt.serviceName}</p>
                      {apt.problemDescription && (
                        <p className="text-xs text-[#A7A9AE] mt-1 italic line-clamp-2">
                          « {apt.problemDescription} »
                        </p>
                      )}
                    </div>

                    {/* Vehicle */}
                    <div className="min-w-[180px]">
                      <p className="text-xs font-semibold text-[#F5F4F0]">
                        {apt.vehicle.make} {apt.vehicle.model}
                      </p>
                      <p className="text-[11px] text-[#A7A9AE]">{apt.vehicle.fuel}</p>
                      {apt.vehicle.licensePlate && (
                        <span className="text-[10px] font-mono text-[#C6A875] bg-[#0A0A0B] px-1.5 py-0.5 rounded border border-[#292C32] inline-block mt-0.5">
                          {apt.vehicle.licensePlate}
                        </span>
                      )}
                    </div>

                    {/* Client */}
                    <div className="min-w-[200px]">
                      <p className="text-xs font-semibold text-[#F5F4F0]">
                        {apt.client.firstName} {apt.client.lastName}
                      </p>
                      <a
                        href={`tel:${apt.client.phone}`}
                        className="text-xs text-[#C6A875] hover:underline flex items-center gap-1 mt-0.5"
                      >
                        <Phone className="w-3 h-3" />
                        <span>{apt.client.phone}</span>
                      </a>
                      <p className="text-[11px] text-[#555A64]">{apt.client.email}</p>
                    </div>

                    {/* Quick Action Buttons */}
                    <div className="flex items-center gap-2 shrink-0">
                      {apt.status === "pending" && (
                        <button
                          onClick={() => handleUpdateStatus(apt.id, "confirmed")}
                          className="px-3 py-1.5 rounded-lg bg-emerald-600/20 text-emerald-300 border border-emerald-500/40 text-xs font-semibold hover:bg-emerald-600 hover:text-white transition-colors"
                        >
                          Confirmer
                        </button>
                      )}

                      {apt.status === "confirmed" && (
                        <button
                          onClick={() => handleUpdateStatus(apt.id, "completed")}
                          className="px-3 py-1.5 rounded-lg bg-blue-600/20 text-blue-300 border border-blue-500/40 text-xs font-semibold hover:bg-blue-600 hover:text-white transition-colors"
                        >
                          Terminé
                        </button>
                      )}

                      {apt.status !== "cancelled" && (
                        <button
                          onClick={() => handleUpdateStatus(apt.id, "cancelled")}
                          className="px-3 py-1.5 rounded-lg bg-amber-600/20 text-amber-300 border border-amber-500/40 text-xs font-semibold hover:bg-amber-600 hover:text-white transition-colors"
                        >
                          Annuler
                        </button>
                      )}

                      <button
                        onClick={() => handleDeleteAppointment(apt.id)}
                        className="p-2 rounded-lg text-red-400 hover:bg-red-950/40 border border-transparent hover:border-red-500/30 transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: CONTACT MESSAGES */}
        {activeTab === "contacts" && (
          <div className="space-y-4">
            {contacts.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-[#17191D] border border-[#23272F] text-sm text-[#A7A9AE]">
                Aucun message de contact pour l'instant.
              </div>
            ) : (
              contacts.map((msg) => (
                <div
                  key={msg.id}
                  className="p-6 rounded-2xl bg-[#17191D] border border-[#23272F] space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#23272F] pb-3">
                    <div>
                      <span className="text-xs font-bold text-[#F5F4F0]">{msg.name}</span>
                      <span className="text-xs text-[#A7A9AE] ml-3">
                        ({msg.email} {msg.phone ? `• ${msg.phone}` : ""})
                      </span>
                    </div>
                    <span className="text-[11px] text-[#555A64]">
                      {new Date(msg.createdAt).toLocaleString("fr-FR")}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-[#D7BC8C]">Objet : {msg.subject}</p>
                  <p className="text-sm text-[#F5F4F0]/90 leading-relaxed bg-[#0A0A0B] p-4 rounded-xl border border-[#23272F]">
                    {msg.message}
                  </p>

                  <div className="flex items-center gap-4 pt-2">
                    <a
                      href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                      className="btn-outline-champagne px-4 py-1.5 rounded-lg text-xs font-semibold"
                    >
                      Répondre par e-mail
                    </a>
                    {msg.phone && (
                      <a
                        href={`tel:${msg.phone}`}
                        className="text-xs text-[#C6A875] hover:underline"
                      >
                        Appeler ({msg.phone})
                      </a>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 3: CALENDAR & EXCEPTIONS */}
        {activeTab === "calendar" && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-[#17191D] border border-[#292C32] space-y-4">
              <h3 className="text-lg font-bold text-[#F5F4F0]">
                Bloquer une date exceptionnelle (fermeture atelier, congé, inventaire)
              </h3>
              <p className="text-xs text-[#A7A9AE]">
                Les dates bloquées n'apparaitront plus dans les créneaux disponibles du site public.
              </p>

              <div className="flex items-center gap-3">
                <input
                  type="date"
                  value={newBlockedDate}
                  onChange={(e) => setNewBlockedDate(e.target.value)}
                  className="bg-[#0A0A0B] border border-[#292C32] rounded-xl px-4 py-2.5 text-xs text-[#F5F4F0] focus:outline-none focus:border-[#C6A875]"
                />
                <button
                  type="button"
                  onClick={() => handleToggleBlockedDate(newBlockedDate)}
                  disabled={!newBlockedDate}
                  className="btn-champagne px-5 py-2.5 rounded-xl text-xs font-bold disabled:opacity-50"
                >
                  Bloquer / Débloquer cette date
                </button>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#17191D] border border-[#23272F]">
              <h4 className="text-sm font-bold text-[#F5F4F0] mb-3">Dates actuellement bloquées</h4>
              {blockedDates.length === 0 ? (
                <p className="text-xs text-[#A7A9AE]">Aucune date n'est actuellement bloquée.</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {blockedDates.map((dateStr) => (
                    <div
                      key={dateStr}
                      className="px-3 py-1.5 rounded-xl bg-red-950/40 border border-red-500/30 text-red-200 text-xs flex items-center gap-2"
                    >
                      <span>{dateStr}</span>
                      <button
                        onClick={() => handleToggleBlockedDate(dateStr)}
                        className="text-red-400 hover:text-white"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: SERVICES OVERVIEW */}
        {activeTab === "services" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {GARAGE_CONFIG.services.map((srv) => (
              <div
                key={srv.id}
                className="p-5 rounded-2xl bg-[#17191D] border border-[#23272F] space-y-2"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-[#F5F4F0]">{srv.title}</h4>
                  <span className="text-xs font-bold text-[#C6A875]">~{srv.estimatedDurationMinutes} min</span>
                </div>
                <p className="text-xs text-[#A7A9AE]">{srv.shortDescription}</p>
                <p className="text-[11px] text-[#D7BC8C] font-semibold">{srv.priceNotice}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

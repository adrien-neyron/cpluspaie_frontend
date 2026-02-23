import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useApi } from "../../hooks/useApi";
import { LogoutButton } from "../../components/auth/LogoutButton";
import logo from "../../images/LOGO_COULEUR.svg";

import DevisForm from "../../components/client/DevisForm";
import OptimizationAIForm from "../../components/client/OptimizationAIForm";
import RequestsHistory from "../../components/client/RequestsHistory";

export default function ClientDashboard() {
  const { user } = useAuthContext();
  const { apiCall } = useApi();
  const [activeTab, setActiveTab] = useState("devis");

  /* ---------- HANDLERS ---------- */

  const submitDevis = async (data) => {
    await apiCall("/requests/devis", { method: "POST", data });
    alert("Demande de devis envoyée");
  };

  const submitOptimization = async (data) => {
    const result = await apiCall("/ai/optimization", {
      method: "POST",
      data,
    });
    alert("Analyse IA terminée");
    console.log(result);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}

      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center font-black text-2xl">
              <img src={logo} alt="logo" className="w-20 mx-6" />
            </Link>

            <div>
              <h1 className="text-2xl font-bold">Espace Client</h1>
              <p className="text-sm text-gray-600">Bienvenue, {user?.name || user?.email}</p>
            </div>
          </div>
          <LogoutButton />
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <Tab label="Demande de devis" active={activeTab === "devis"} onClick={() => setActiveTab("devis")} />
          <Tab label="Optimisation IA" active={activeTab === "ai"} onClick={() => setActiveTab("ai")} />
          <Tab label="Historique" active={activeTab === "history"} onClick={() => setActiveTab("history")} />
        </div>

        {/* Views */}
        <div className="bg-white rounded-xl shadow p-8">
          {activeTab === "devis" && <DevisForm onSubmit={submitDevis} />}
          {activeTab === "ai" && <OptimizationAIForm onAnalyze={submitOptimization} />}
          {activeTab === "history" && <RequestsHistory />}
        </div>
      </main>
    </div>
  );
}

/* ---------- UI COMPONENT ---------- */
function Tab({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2 rounded-lg font-medium transition ${
        active ? "bg-red-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}>
      {label}
    </button>
  );
}

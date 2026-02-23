import React, { useState } from "react";

export default function DevisForm({ onSubmit, isSubmitting = false }) {
  const [formData, setFormData] = useState({
    company_name: "",
    email: "",
    telephone: "",
    ccn: "",
    effectif: "",
    type_contrat: "mixte",
    cycle_paie: "mensuel",
    duree_mission: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6">
        Demande de devis paie
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Société */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">
            Nom de la société
          </label>
          <input
            name="company_name"
            required
            value={formData.company_name}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:outline-none focus:ring-red-500"
            placeholder="Ex : SARL Dupont"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:outline-none focus:ring-red-500"
            placeholder="contact@societe.fr"
          />
        </div>

        {/* Téléphone */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Téléphone
          </label>
          <input
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:outline-none focus:ring-red-500"
            placeholder="06 00 00 00 00"
          />
        </div>

        {/* CCN */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Convention collective (CCN)
          </label>
          <input
            name="ccn"
            value={formData.ccn}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:outline-none focus:ring-red-500"
            placeholder="Ex : Syntec, BTP, HCR…"
          />
        </div>

        {/* Effectif */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Nombre de salariés
          </label>
          <input
            type="number"
            name="effectif"
            required
            value={formData.effectif}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:outline-none focus:ring-red-500"
            placeholder="Ex : 12"
          />
        </div>

        {/* Type de contrats */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Type de contrats
          </label>
          <select
            name="type_contrat"
            value={formData.type_contrat}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:outline-none focus:ring-red-500"
          >
            <option value="cdi">CDI uniquement</option>
            <option value="cdd">CDD uniquement</option>
            <option value="mixte">Mixte (CDI / CDD)</option>
          </select>
        </div>

        {/* Cycle de paie */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Cycle de paie
          </label>
          <select
            name="cycle_paie"
            value={formData.cycle_paie}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:outline-none focus:ring-red-500"
          >
            <option value="mensuel">Mensuel</option>
            <option value="bimensuel">Bimensuel</option>
            <option value="autre">Autre</option>
          </select>
        </div>

        {/* Durée mission */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1 ">
            Durée estimée de la mission
          </label>
          <input
            name="duree_mission"
            value={formData.duree_mission}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:outline-none focus:ring-red-500"
            placeholder="Ex : mission récurrente / 6 mois / ponctuelle"
          />
        </div>

        {/* Message */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">
            Besoin spécifique / contexte
          </label>
          <textarea
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 resize-none focus:ring-2 focus:outline-none focus:ring-red-500"
            placeholder="Ex : reprise de dossier, sécurisation URSSAF, changement de CCN…"
          />
        </div>

        {/* Submit */}
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition"
          >
            {isSubmitting ? "Envoi en cours..." : "Demander un devis"}
          </button>
        </div>

      </form>
    </div>
  );
}

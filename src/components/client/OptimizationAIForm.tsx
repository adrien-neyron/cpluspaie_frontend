import React, { useState, ChangeEvent, FormEvent } from "react";
import { useApi } from "../../hooks/useApi";
import { PaymentForm } from "../client/PaymentForm";
import { useAuthContext } from "../../context/AuthContext";

type FormData = {
  ccn: string;
  effectif: number | "";
  secteur: string;
  typeContrats: string[];
  objectifs: string[];
  problemes: string;
  priorite: "economies" | "securite" | "equilibre";
};

export default function OptimizationAIForm() {
  const { user } = useAuthContext();
  const [formData, setFormData] = useState<FormData>({
    ccn: "",
    effectif: "",
    secteur: "",
    typeContrats: [],
    objectifs: [],
    problemes: "",
    priorite: "equilibre",
  });
  const [result, setResult] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPayment, setShowPayment] = useState(false);

  const { analyseAI, apiCall } = useApi();

  const OBJECTIFS = [
    { id: "charges", label: "Réduction des charges sociales" },
    { id: "securite", label: "Sécurisation juridique & sociale" },
    { id: "temps", label: "Gain de temps RH / Paie" },
    { id: "externalisation", label: "Externalisation de la paie" },
  ];
  const CONTRATS = ["CDI", "CDD", "Alternance", "Intérim"];

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "effectif" ? Number(value) || "" : value,
    }));
  };

  const handleCheckboxChange = (field: "typeContrats" | "objectifs", value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value) ? prev[field].filter((v) => v !== value) : [...prev[field], value],
    }));
  };

  const handleAnalyze = async () => {
    try {
      setIsLoading(true);
      if (!user) return;

      const res = await analyseAI(formData);
      setResult(res.result);

      // Débiter un crédit côté serveur
      await apiCall("/users/use-credit", { method: "POST" });
    } catch (err) {
      console.error(err);
      setResult("Erreur lors de l’analyse IA.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (user?.credits && user?.credits > 0) {
      handleAnalyze();
    } else {
      setShowPayment(true);
    }
  };

  const handlePaymentSuccess = async () => {
    if (!user) return;

    // Ajouter 1 crédit après paiement
    await apiCall("/users/add-credit", { method: "POST", data: { amount: 1 } });
    setShowPayment(false);
    handleAnalyze(); // lancer l'analyse automatiquement
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Analyse & optimisation paie (IA)</h2>
        <p className="text-sm text-gray-600">
          Crédits disponibles: <span className="font-semibold">{user?.credits || 0}</span>
        </p>
      </div>

      <p className="text-sm text-gray-600 mb-6">
        Ces informations permettent de générer des recommandations adaptées à votre situation, dans le respect du cadre
        légal et conventionnel.
      </p>

      {!showPayment ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* CCN */}
          <div>
            <label className="block text-sm font-medium mb-1">Convention collective (CCN)</label>
            <input
              name="ccn"
              value={formData.ccn}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none focus:ring-red-500"
              placeholder="Ex : Syntec, Bâtiment, HCR"
            />
          </div>

          {/* Secteur & effectif */}
          <div className="grid md:grid-cols-2 gap-4">
            <input
              name="secteur"
              value={formData.secteur}
              onChange={handleChange}
              className="px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none focus:ring-red-500"
              placeholder="Secteur d’activité"
            />
            <input
              name="effectif"
              type="number"
              min={1}
              value={formData.effectif}
              onChange={handleChange}
              required
              className="px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none focus:ring-red-500"
              placeholder="Effectif"
            />
          </div>

          {/* Types de contrats */}
          <div>
            <label className="block text-sm font-medium mb-2">Types de contrats</label>
            <div className="flex flex-wrap gap-4">
              {CONTRATS.map((c) => (
                <label key={c} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.typeContrats.includes(c)}
                    onChange={() => handleCheckboxChange("typeContrats", c)}
                    className="accent-red-500"
                  />
                  {c}
                </label>
              ))}
            </div>
          </div>

          {/* Objectifs */}
          <div>
            <label className="block text-sm font-medium mb-2">Objectifs</label>
            <div className="grid sm:grid-cols-2 gap-3">
              {OBJECTIFS.map((o) => (
                <label key={o.id} className="flex items-center gap-2 ">
                  <input
                    type="checkbox"
                    checked={formData.objectifs.includes(o.id)}
                    onChange={() => handleCheckboxChange("objectifs", o.id)}
                    className="accent-red-500"
                  />
                  {o.label}
                </label>
              ))}
            </div>
          </div>

          {/* Priorité */}
          <select
            name="priorite"
            value={formData.priorite}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none focus:ring-red-500">
            <option value="economies">Économies</option>
            <option value="securite">Sécurité juridique</option>
            <option value="equilibre">Équilibre</option>
          </select>

          {/* Problèmes */}
          <textarea
            name="problemes"
            value={formData.problemes}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none focus:ring-red-500"
            placeholder="Difficultés rencontrées..."
          />

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-lg font-semibold ${
              user?.credits && user?.credits > 0
                ? "bg-red-600 text-white disabled:opacity-50"
                : "bg-gray-700 text-white disabled:opacity-50"
            }`}>
            {isLoading
              ? "Analyse en cours..."
              : user?.credits && user?.credits > 0
              ? "Lancer l’analyse IA"
              : "Payer pour lancer l’IA"}
          </button>
        </form>
      ) : (
        <div>
          <p className="mb-4 text-red-600 font-medium">
            Vous n’avez pas assez de crédits. Veuillez effectuer un paiement pour continuer.
          </p>
 {showPayment && user && (
  <PaymentForm
    userId={user.id}
    amount={1} // nombre de crédits à acheter
    onSuccess={handlePaymentSuccess} 
  />
)}

        </div>
      )}

      {result && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-bold mb-2">Recommandations IA</h3>
          <p className="whitespace-pre-line">{result}</p>
        </div>
      )}
    </div>
  );
}

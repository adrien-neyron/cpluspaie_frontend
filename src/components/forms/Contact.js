import React, { useState } from "react";
import { Link } from "react-router-dom";
import { publicPost, errorMessage } from "../../hooks/useApi";
import { Alert } from "../portal/ui";
import PortraitFrame from "../misc/PortraitFrame.js";
import portrait from "../../images/carole-portrait.jpg";

const empty = { name: "", email: "", phone: "", ccn: "", nbr_salaries: "", duree_mission: "", message: "", consent: false, website: "" };

export default function Contact({
  heading = <>Expliquez-moi <span className="mark">votre situation</span></>,
  description = "Un projet, une question, un besoin de remplacement ? Remplissez ce formulaire : je vous réponds rapidement avec une estimation adaptée à votre entreprise.",
}) {
  const [f, setF] = useState(empty);
  const [state, setState] = useState({ status: "idle", text: "" });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setState({ status: "sending", text: "" });
    const details = [
      f.ccn && `Convention collective : ${f.ccn}`,
      f.nbr_salaries && `Nombre de salariés : ${f.nbr_salaries}`,
      f.duree_mission && `Durée de la mission : ${f.duree_mission}`,
    ].filter(Boolean);
    try {
      await publicPost("/public/contact", {
        name: f.name,
        email: f.email,
        phone: f.phone,
        message: [f.message, ...(details.length ? ["", ...details] : [])].join("\n"),
        consent: f.consent,
        website: f.website,
      });
      setF(empty);
      setState({ status: "ok", text: "Merci, votre message a bien été envoyé. Je vous recontacte très bientôt." });
    } catch (err) {
      setState({ status: "error", text: errorMessage(err, "L'envoi a échoué. Vérifiez vos informations et réessayez.") });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-ardoise-50 via-white to-corail-50 px-4 pb-20 pt-32">
      <div className="mx-auto flex max-w-screen-xl flex-col justify-between md:flex-row">
        <aside className="flex flex-shrink-0 flex-col items-center md:w-5/12">
          <div className="w-full max-w-xs px-5">
            <PortraitFrame src={portrait} alt="Carole Forestier, consultante en paie" />
          </div>
          <ul className="mt-14 w-full max-w-sm space-y-3 text-sm font-bold text-encre-700">
            {["Un seul interlocuteur, du devis au suivi", "Une estimation adaptée à votre situation", "Vos données restent confidentielles"].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <svg width="22" height="22" viewBox="0 0 20 20" aria-hidden="true" className="shrink-0"><circle cx="10" cy="10" r="10" fill="#FFE3E1" /><path d="M5.5 10.4l3 3 6-6.4" fill="none" stroke="#B13632" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                {t}
              </li>
            ))}
          </ul>
        </aside>

        <div className="mt-12 md:mx-4 md:mt-0 md:w-7/12">
          <h1 className="mb-4 text-center text-3xl font-black leading-tight text-encre-800 sm:text-4xl md:text-left lg:text-5xl">{heading}</h1>
          <p className="mb-8 text-center text-base font-medium text-encre-700 md:text-left lg:text-lg">{description}</p>

          <form onSubmit={submit} className="card relative grid max-w-xl grid-cols-1 gap-4 p-6 text-sm sm:grid-cols-2 sm:p-8" noValidate={false}>
            <div>
              <label htmlFor="c-name" className="label">Nom / société *</label>
              <input id="c-name" required maxLength={255} autoComplete="organization" className="field" value={f.name} onChange={set("name")} />
            </div>
            <div>
              <label htmlFor="c-email" className="label">E-mail *</label>
              <input id="c-email" type="email" required autoComplete="email" className="field" value={f.email} onChange={set("email")} />
            </div>
            <div>
              <label htmlFor="c-phone" className="label">Téléphone</label>
              <input id="c-phone" type="tel" maxLength={50} autoComplete="tel" className="field" value={f.phone} onChange={set("phone")} />
            </div>
            <div>
              <label htmlFor="c-ccn" className="label">Convention collective</label>
              <input id="c-ccn" className="field" value={f.ccn} onChange={set("ccn")} />
            </div>
            <div>
              <label htmlFor="c-nb" className="label">Nombre de salariés</label>
              <input id="c-nb" inputMode="numeric" className="field" value={f.nbr_salaries} onChange={set("nbr_salaries")} />
            </div>
            <div>
              <label htmlFor="c-duree" className="label">Durée de la mission</label>
              <input id="c-duree" className="field" value={f.duree_mission} onChange={set("duree_mission")} />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="c-msg" className="label">La mission demandée en quelques mots *</label>
              <textarea id="c-msg" required minLength={5} maxLength={4000} rows={5} className="field" value={f.message} onChange={set("message")} />
            </div>

            {/* Champ piège anti-robots : invisible et hors navigation clavier */}
            <div aria-hidden="true" style={{ position: "absolute", left: "-9999px" }}>
              <label>Ne pas remplir<input tabIndex={-1} autoComplete="off" value={f.website} onChange={set("website")} /></label>
            </div>

            <div className="sm:col-span-2">
              <label className="flex items-start gap-2 text-sm text-encre-700">
                <input type="checkbox" required className="mt-1 h-4 w-4" checked={f.consent} onChange={set("consent")} />
                <span>J'accepte que mes données soient utilisées pour répondre à ma demande, conformément à la{" "}
                  <Link to="/policy" className="font-semibold text-ardoise-700 underline">politique de confidentialité</Link>. *</span>
              </label>
            </div>

            {state.status === "ok" && <div className="sm:col-span-2"><Alert kind="success">{state.text}</Alert></div>}
            {state.status === "error" && <div className="sm:col-span-2"><Alert>{state.text}</Alert></div>}

            <div className="sm:col-span-2">
              <button type="submit" disabled={state.status === "sending"} className="btn-accent btn-lg w-full">
                {state.status === "sending" ? "Envoi en cours…" : "Envoyer"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

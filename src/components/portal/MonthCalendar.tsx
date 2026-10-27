import React, { useMemo } from 'react';
import type { Deadline } from '../../types/portal';
import { KIND_LABEL, KIND_SHORT, kindStyle, isOverdue, todayISO } from './ui';

const DAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
const pad = (n: number) => String(n).padStart(2, '0');

/**
 * Calendrier mensuel accessible : tableau sémantique (en-têtes, légende),
 * échéances en texte + pictogramme, navigation au clavier par boutons.
 */
export default function MonthCalendar({
  deadlines, month, onMonthChange, onSelect, showCompany = false,
}: {
  deadlines: Deadline[]; month: { y: number; m: number };
  onMonthChange: (m: { y: number; m: number }) => void;
  onSelect?: (d: Deadline) => void; showCompany?: boolean;
}) {
  const { y, m } = month;
  const today = todayISO();

  const weeks = useMemo(() => {
    const first = new Date(y, m, 1);
    const offset = (first.getDay() + 6) % 7; // lundi = 0
    const total = new Date(y, m + 1, 0).getDate();
    const cells: (string | null)[] = [...Array(offset).fill(null)];
    for (let d = 1; d <= total; d++) cells.push(`${y}-${pad(m + 1)}-${pad(d)}`);
    while (cells.length % 7) cells.push(null);
    const rows: (string | null)[][] = [];
    for (let i = 0; i < cells.length; i += 7) rows.push(cells.slice(i, i + 7));
    return rows;
  }, [y, m]);

  const byDay = useMemo(() => {
    const map: Record<string, Deadline[]> = {};
    deadlines.forEach((d) => { (map[d.due_date] ||= []).push(d); });
    return map;
  }, [deadlines]);

  const label = new Date(y, m, 1).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
  const go = (delta: number) => { const d = new Date(y, m + delta, 1); onMonthChange({ y: d.getFullYear(), m: d.getMonth() }); };

  return (
    <section aria-label="Calendrier mensuel">
      <div className="mb-3 flex items-center justify-between gap-2">
        <button type="button" className="btn-outline btn-sm" onClick={() => go(-1)} aria-label="Mois précédent">← Précédent</button>
        <h3 className="text-lg font-bold capitalize text-encre-800" aria-live="polite">{label}</h3>
        <button type="button" className="btn-outline btn-sm" onClick={() => go(1)} aria-label="Mois suivant">Suivant →</button>
      </div>

      <div className="relative hidden overflow-x-auto md:block">
        <table className="w-full table-fixed border-collapse text-sm">
          <caption className="sr-only">Échéances de paie de {label}</caption>
          <thead>
            <tr>{DAYS.map((d) => <th key={d} scope="col" className="border border-brume-300 bg-ardoise-700 px-2 py-2 text-left text-xs font-semibold uppercase tracking-wide text-white">{d}</th>)}</tr>
          </thead>
          <tbody>
            {weeks.map((w, i) => (
              <tr key={i}>
                {w.map((iso, j) => {
                  const items = iso ? byDay[iso] || [] : [];
                  return (
                    <td key={j} className={`h-28 align-top border border-brume-300 p-1.5 ${iso ? 'bg-white' : 'bg-brume-100'} ${iso === today ? 'ring-2 ring-inset ring-ardoise-500' : ''}`}>
                      {iso && (
                        <>
                          <div className={`mb-1 text-xs font-bold ${iso === today ? 'text-ardoise-700' : 'text-encre-600'}`}>
                            {Number(iso.slice(8))}{iso === today && <span className="sr-only"> (aujourd’hui)</span>}
                          </div>
                          <ul className="space-y-1">
                            {items.map((d) => <li key={d.id}><Chip d={d} onSelect={onSelect} showCompany={showCompany} /></li>)}
                          </ul>
                        </>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile : agenda en liste (un tableau 7 colonnes n'est pas lisible sur petit écran) */}
      <div className="md:hidden">
        {Object.keys(byDay).filter((k) => k.startsWith(`${y}-${pad(m + 1)}`)).sort().map((iso) => (
          <div key={iso} className="mb-3">
            <h4 className="mb-1 text-sm font-bold text-encre-700">{new Date(`${iso}T12:00:00`).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}</h4>
            <ul className="space-y-1">{byDay[iso].map((d) => <li key={d.id}><Chip d={d} onSelect={onSelect} showCompany={showCompany} /></li>)}</ul>
          </div>
        ))}
        {!Object.keys(byDay).some((k) => k.startsWith(`${y}-${pad(m + 1)}`)) && <p className="text-encre-600">Aucune échéance ce mois-ci.</p>}
      </div>

      <ul className="mt-3 flex flex-wrap gap-2 text-xs" aria-label="Légende">
        {(Object.keys(KIND_LABEL) as (keyof typeof KIND_LABEL)[]).map((k) => (
          <li key={k} className={`rounded border px-2 py-0.5 ${kindStyle(k)}`}>{KIND_LABEL[k]}</li>
        ))}
        <li className="rounded border border-encre-300 px-2 py-0.5">✓ terminé · ⚠ en retard</li>
      </ul>
    </section>
  );
}

function Chip({ d, onSelect, showCompany }: { d: Deadline; onSelect?: (d: Deadline) => void; showCompany: boolean }) {
  const overdue = isOverdue(d.due_date, d.status);
  const icon = d.status === 'done' ? '✓' : overdue ? '⚠' : d.status === 'in_progress' ? '◐' : '○';
  const text = `${KIND_SHORT[d.kind]}${showCompany && d.company_name ? ` · ${d.company_name}` : ''}`;
  const full = `${d.title}${d.company_name ? ` — ${d.company_name}` : ''}, ${d.status === 'done' ? 'terminé' : overdue ? 'en retard' : 'à faire'}`;
  const cls = `block w-full truncate rounded border px-1.5 py-0.5 text-left text-[11px] font-medium leading-tight ${kindStyle(d.kind)} ${d.status === 'done' ? 'opacity-70 line-through' : ''} ${overdue ? 'ring-2 ring-red-600' : ''}`;
  return onSelect ? (
    <button type="button" className={cls} onClick={() => onSelect(d)} title={full} aria-label={`${text} : ${full}`}>
      <span aria-hidden="true">{icon} </span>{text}
    </button>
  ) : (
    <span className={cls} title={full}><span aria-hidden="true">{icon} </span><span className="sr-only">{full}</span><span aria-hidden="true">{text}</span></span>
  );
}

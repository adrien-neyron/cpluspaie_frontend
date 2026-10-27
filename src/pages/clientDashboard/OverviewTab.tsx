import React, { useCallback, useEffect, useState } from 'react';
import { errorMessage, useApi } from '../../hooks/useApi';
import type { Deadline, DocumentMeta } from '../../types/portal';
import { Alert, EmptyState, extOf, fmtDate, fmtShort, fmtSize, isOverdue, kindStyle, KIND_LABEL, Spinner, StatusPill } from '../../components/portal/ui';

interface Dash { deadlines: Deadline[]; recentDocuments: DocumentMeta[]; counts: { overdue: number; upcoming: number } }

export default function OverviewTab({ onOpenCalendar, onOpenDocs }: { onOpenCalendar: () => void; onOpenDocs: () => void }) {
  const { apiCall, download } = useApi();
  const [data, setData] = useState<Dash | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState<string | null>(null);

  const load = useCallback(async () => {
    try { setData((await apiCall('/portal/dashboard')).data); setError(''); }
    catch (e) { setError(errorMessage(e, 'Impossible de charger le tableau de bord.')); }
  }, [apiCall]);
  useEffect(() => { load(); }, [load]);

  const markDone = async (d: Deadline) => {
    setBusy(d.id);
    try { await apiCall(`/portal/deadlines/${d.id}`, { method: 'PATCH', data: { status: 'done' } }); await load(); }
    catch (e) { setError(errorMessage(e)); }
    finally { setBusy(null); }
  };

  if (!data && !error) return <Spinner />;
  if (!data) return <Alert>{error}</Alert>;

  return (
    <div className="space-y-6">
      {error && <Alert>{error}</Alert>}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="card p-5">
          <p className="text-sm font-medium text-encre-600">Échéances en retard</p>
          <p className={`mt-1 text-3xl font-bold ${data.counts.overdue ? 'text-red-800' : 'text-encre-800'}`}>{data.counts.overdue}</p>
        </div>
        <div className="card p-5">
          <p className="text-sm font-medium text-encre-600">Prochaines échéances (45 jours)</p>
          <p className="mt-1 text-3xl font-bold text-ardoise-700">{data.counts.upcoming}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <section className="card p-5 lg:col-span-3" aria-labelledby="h-next">
          <div className="mb-3 flex items-center justify-between">
            <h2 id="h-next" className="text-lg font-bold text-encre-800">Prochaines échéances</h2>
            <button className="btn-outline btn-sm" onClick={onOpenCalendar}>Voir le calendrier</button>
          </div>
          {data.deadlines.length === 0 ? (
            <EmptyState title="Aucune échéance à venir">Votre calendrier de paie sera affiché ici dès qu’il aura été configuré.</EmptyState>
          ) : (
            <ul className="divide-y divide-brume-300">
              {data.deadlines.slice(0, 8).map((d) => (
                <li key={d.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                  <div className="min-w-0">
                    <p className="font-semibold text-encre-800">{d.title}</p>
                    <p className="text-sm text-encre-600">
                      <span className={`mr-2 rounded border px-1.5 py-0.5 text-xs ${kindStyle(d.kind)}`}>{KIND_LABEL[d.kind]}</span>
                      {fmtDate(d.due_date)}{d.company_name ? ` · ${d.company_name}` : ''}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusPill status={d.status} overdue={isOverdue(d.due_date, d.status)} />
                    {d.kind === 'variables' && d.status !== 'done' && (
                      <button className="btn-primary btn-sm" disabled={busy === d.id} onClick={() => markDone(d)}
                        aria-label={`Variables transmises : ${d.title}`}>
                        {busy === d.id ? '…' : 'Variables transmises'}
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="card p-5 lg:col-span-2" aria-labelledby="h-docs">
          <div className="mb-3 flex items-center justify-between">
            <h2 id="h-docs" className="text-lg font-bold text-encre-800">Documents récents</h2>
            <button className="btn-outline btn-sm" onClick={onOpenDocs}>Tous les documents</button>
          </div>
          {data.recentDocuments.length === 0 ? (
            <EmptyState title="Aucun document pour le moment" />
          ) : (
            <ul className="divide-y divide-brume-300">
              {data.recentDocuments.map((d) => (
                <li key={d.id} className="flex items-center justify-between gap-3 py-3">
                  <div className="min-w-0">
                    <p className="truncate font-medium text-encre-800">{d.title}</p>
                    <p className="text-xs text-encre-600">{extOf(d.file_name)} · {fmtSize(d.size_bytes)} · {fmtShort(d.created_at)}</p>
                  </div>
                  <button className="btn-outline btn-sm shrink-0" aria-label={`Télécharger ${d.title}`}
                    onClick={() => download(`/portal/documents/${d.id}/download`, d.file_name).catch((e) => setError(errorMessage(e, 'Téléchargement impossible.')))}>
                    Télécharger
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}

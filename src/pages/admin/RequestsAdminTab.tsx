import React, { useCallback, useEffect, useState } from 'react';
import { errorMessage, useApi } from '../../hooks/useApi';
import type { RequestItem, RequestStatus } from '../../types/portal';
import { Alert, EmptyState, fmtShort, REQUEST_LABEL, RequestPill, Spinner } from '../../components/portal/ui';

interface Stats { total: number; new: number; in_progress: number; resolved: number; this_week: number }

export default function RequestsAdminTab({ onNewCount }: { onNewCount?: (n: number) => void }) {
  const { apiCall } = useApi();
  const [items, setItems] = useState<RequestItem[] | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [status, setStatus] = useState('');
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    try {
      const q = new URLSearchParams({ limit: '100', ...(status && { status }), ...(search && { search }) });
      const [l, s] = await Promise.all([apiCall(`/admin/contacts?${q}`), apiCall('/admin/stats')]);
      setItems(l.data.contacts); setStats(s.data.stats); onNewCount?.(s.data.stats.new); setError('');
    } catch (e) { setError(errorMessage(e, 'Impossible de charger les demandes.')); }
  }, [apiCall, status, search, onNewCount]);
  useEffect(() => { const t = setTimeout(load, 200); return () => clearTimeout(t); }, [load]);

  return (
    <div className="space-y-5">
      {stats && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[['Total', stats.total], ['Nouvelles', stats.new], ['En cours', stats.in_progress], ['Traitées', stats.resolved]].map(([l, v]) => (
            <div key={l as string} className="card p-4"><p className="text-sm text-encre-600">{l}</p><p className="text-2xl font-bold text-encre-800">{v}</p></div>
          ))}
        </div>
      )}
      <div className="card p-5">
        <div className="mb-4 flex flex-wrap items-end gap-3">
          <div className="min-w-[14rem] flex-1"><label htmlFor="rq-s" className="label">Rechercher</label><input id="rq-s" type="search" className="field" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Nom, e-mail ou message" /></div>
          <div><label htmlFor="rq-st" className="label">Statut</label><select id="rq-st" className="field" value={status} onChange={(e) => setStatus(e.target.value)}><option value="">Tous</option>{(Object.keys(REQUEST_LABEL) as RequestStatus[]).map((s) => <option key={s} value={s}>{REQUEST_LABEL[s]}</option>)}</select></div>
        </div>
        {error && <Alert>{error}</Alert>}
        {!items && !error ? <Spinner /> : items && items.length === 0 ? <EmptyState title="Aucune demande" /> : (
          <ul className="space-y-3">{items?.map((r) => <RequestRow key={r.id} r={r} reload={load} />)}</ul>
        )}
      </div>
    </div>
  );
}

function RequestRow({ r, reload }: { r: RequestItem; reload: () => void }) {
  const { apiCall } = useApi();
  const [notes, setNotes] = useState(r.admin_notes ?? '');
  const [msg, setMsg] = useState('');
  const patch = async (data: object, ok = 'Enregistré.') => {
    try { await apiCall(`/admin/contacts/${r.id}`, { method: 'PUT', data }); setMsg(ok); reload(); } catch (e) { setMsg(errorMessage(e)); }
  };
  const del = async () => { if (!window.confirm('Supprimer cette demande ?')) return; try { await apiCall(`/admin/contacts/${r.id}`, { method: 'DELETE' }); reload(); } catch (e) { setMsg(errorMessage(e)); } };
  return (
    <li className="rounded-lg border border-brume-300 p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-semibold text-encre-800">{r.name} <RequestPill status={r.status} /></p>
          <p className="text-sm text-encre-600"><a className="underline" href={`mailto:${r.email}`}>{r.email}</a>{r.phone ? ` · ${r.phone}` : ''} · {r.source === 'public_form' ? 'Formulaire du site' : 'Espace client'} · {fmtShort(r.created_at)}</p>
        </div>
        <div>
          <label htmlFor={`st-${r.id}`} className="sr-only">Statut de la demande de {r.name}</label>
          <select id={`st-${r.id}`} className="field" value={r.status} onChange={(e) => patch({ status: e.target.value }, 'Statut mis à jour.')}>
            {(Object.keys(REQUEST_LABEL) as RequestStatus[]).map((s) => <option key={s} value={s}>{REQUEST_LABEL[s]}</option>)}
          </select>
        </div>
      </div>
      <p className="mt-3 whitespace-pre-line text-sm text-encre-800">{r.message}</p>
      <div className="mt-3">
        <label htmlFor={`nt-${r.id}`} className="label">Notes internes</label>
        <textarea id={`nt-${r.id}`} rows={2} className="field" value={notes} onChange={(e) => setNotes(e.target.value)} />
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <button className="btn-outline btn-sm" onClick={() => patch({ admin_notes: notes }, 'Notes enregistrées.')}>Enregistrer les notes</button>
        <button className="btn-danger btn-sm" onClick={del}>Supprimer</button>
        <span role="status" className="text-sm text-encre-600">{msg}</span>
      </div>
    </li>
  );
}

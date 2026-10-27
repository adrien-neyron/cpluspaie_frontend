import React, { useCallback, useEffect, useState } from 'react';
import { errorMessage, useApi } from '../../hooks/useApi';
import type { Company } from '../../types/portal';
import { Alert, Dialog, EmptyState, fmtShort, Spinner } from '../../components/portal/ui';
import CompanyDetail from './CompanyDetail';

const STATUS: Record<Company['status'], string> = { prospect: 'Prospect', active: 'Client actif', archived: 'Archivé' };

export default function CompaniesTab() {
  const { apiCall } = useApi();
  const [list, setList] = useState<Company[] | null>(null);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [openId, setOpenId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  const load = useCallback(async () => {
    try {
      const q = new URLSearchParams({ ...(search && { search }), ...(status && { status }) });
      setList((await apiCall(`/admin/companies?${q}`)).data); setError('');
    } catch (e) { setError(errorMessage(e, 'Impossible de charger les entreprises.')); }
  }, [apiCall, search, status]);
  useEffect(() => { const t = setTimeout(load, 200); return () => clearTimeout(t); }, [load]);

  return (
    <div className="card p-5">
      <div className="mb-4 flex flex-wrap items-end gap-3">
        <div className="min-w-[14rem] flex-1">
          <label htmlFor="co-search" className="label">Rechercher une entreprise</label>
          <input id="co-search" type="search" className="field" placeholder="Nom ou SIRET" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div>
          <label htmlFor="co-status" className="label">Statut</label>
          <select id="co-status" className="field" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">Tous</option><option value="active">Clients actifs</option><option value="prospect">Prospects</option><option value="archived">Archivés</option>
          </select>
        </div>
        <button className="btn-primary" onClick={() => setCreating(true)}>+ Nouvelle entreprise</button>
      </div>
      {error && <Alert>{error}</Alert>}
      {!list && !error ? <Spinner /> : list && list.length === 0 ? (
        <EmptyState title="Aucune entreprise">Créez votre première entreprise cliente pour commencer.</EmptyState>
      ) : list && (
        <div className="relative overflow-x-auto">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">Entreprises clientes</caption>
            <thead className="border-b border-brume-300 text-encre-600">
              <tr><th scope="col" className="py-2 pr-3">Entreprise</th><th scope="col" className="py-2 pr-3">Statut</th><th scope="col" className="py-2 pr-3">Effectif</th><th scope="col" className="py-2 pr-3">Utilisateurs</th><th scope="col" className="py-2 pr-3">Prochaine échéance</th><th scope="col" className="py-2 pr-3">En retard</th></tr>
            </thead>
            <tbody className="divide-y divide-brume-300">
              {list.map((c) => (
                <tr key={c.id} className="hover:bg-brume-50">
                  <th scope="row" className="py-3 pr-3 text-left font-semibold">
                    <button className="text-left text-ardoise-700 underline underline-offset-2 hover:text-ardoise-900" onClick={() => setOpenId(c.id)}>{c.name}</button>
                    {c.ccn && <span className="block text-xs font-normal text-encre-600">{c.ccn}</span>}
                  </th>
                  <td className="py-3 pr-3">{STATUS[c.status]}</td>
                  <td className="py-3 pr-3">{c.headcount ?? '—'}</td>
                  <td className="py-3 pr-3">{c.members_count}</td>
                  <td className="py-3 pr-3">{c.next_due ? fmtShort(c.next_due) : '—'}</td>
                  <td className="py-3 pr-3">{c.overdue_count ? <span className="font-semibold text-red-800">⚠ {c.overdue_count}</span> : '0'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {creating && <CreateCompany onClose={() => setCreating(false)} onCreated={(id) => { setCreating(false); setOpenId(id); load(); }} />}
      {openId && <CompanyDetail id={openId} onClose={() => { setOpenId(null); load(); }} />}
    </div>
  );
}

function CreateCompany({ onClose, onCreated }: { onClose: () => void; onCreated: (id: string) => void }) {
  const { apiCall } = useApi();
  const [f, setF] = useState({ name: '', siret: '', ccn: '', headcount: '', status: 'active' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setBusy(true); setError('');
    try {
      const r = await apiCall('/admin/companies', { method: 'POST', data: { name: f.name, siret: f.siret || undefined, ccn: f.ccn || undefined, headcount: f.headcount === '' ? undefined : Number(f.headcount), status: f.status } });
      onCreated(r.data.id);
    } catch (err) { setError(errorMessage(err)); setBusy(false); }
  };
  return (
    <Dialog title="Nouvelle entreprise" onClose={onClose}>
      <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2"><label className="label" htmlFor="nc-name">Raison sociale *</label><input id="nc-name" required className="field" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} /></div>
        <div><label className="label" htmlFor="nc-siret">SIRET</label><input id="nc-siret" className="field" inputMode="numeric" value={f.siret} onChange={(e) => setF({ ...f, siret: e.target.value })} /></div>
        <div><label className="label" htmlFor="nc-ccn">Convention collective</label><input id="nc-ccn" className="field" value={f.ccn} onChange={(e) => setF({ ...f, ccn: e.target.value })} /></div>
        <div><label className="label" htmlFor="nc-hc">Effectif</label><input id="nc-hc" type="number" min={0} className="field" value={f.headcount} onChange={(e) => setF({ ...f, headcount: e.target.value })} /></div>
        <div><label className="label" htmlFor="nc-st">Statut</label><select id="nc-st" className="field" value={f.status} onChange={(e) => setF({ ...f, status: e.target.value })}><option value="active">Client actif</option><option value="prospect">Prospect</option></select></div>
        {error && <div className="sm:col-span-2"><Alert>{error}</Alert></div>}
        <div className="flex gap-3 sm:col-span-2"><button className="btn-primary" disabled={busy}>Créer l’entreprise</button><button type="button" className="btn-outline" onClick={onClose}>Annuler</button></div>
      </form>
    </Dialog>
  );
}

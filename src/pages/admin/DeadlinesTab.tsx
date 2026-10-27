import React, { useCallback, useEffect, useState } from 'react';
import { errorMessage, useApi } from '../../hooks/useApi';
import type { Company, Deadline } from '../../types/portal';
import MonthCalendar from '../../components/portal/MonthCalendar';
import { Alert, Spinner } from '../../components/portal/ui';
import DeadlineEditor from './DeadlineEditor';

const pad = (n: number) => String(n).padStart(2, '0');

export default function DeadlinesTab() {
  const { apiCall } = useApi();
  const now = new Date();
  const [month, setMonth] = useState({ y: now.getFullYear(), m: now.getMonth() });
  const [companies, setCompanies] = useState<Company[]>([]);
  const [companyId, setCompanyId] = useState('');
  const [status, setStatus] = useState('');
  const [items, setItems] = useState<Deadline[] | null>(null);
  const [error, setError] = useState('');
  const [edit, setEdit] = useState<Deadline | null>(null);

  useEffect(() => { apiCall('/admin/companies').then((r) => setCompanies(r.data)).catch(() => {}); }, [apiCall]);
  const load = useCallback(async () => {
    const from = `${month.y}-${pad(month.m + 1)}-01`;
    const to = `${month.y}-${pad(month.m + 1)}-${pad(new Date(month.y, month.m + 1, 0).getDate())}`;
    try {
      const q = new URLSearchParams({ from, to, ...(companyId && { company_id: companyId }), ...(status && { status }) });
      setItems((await apiCall(`/admin/deadlines?${q}`)).data); setError('');
    } catch (e) { setError(errorMessage(e, 'Impossible de charger les échéances.')); }
  }, [apiCall, month, companyId, status]);
  useEffect(() => { setItems(null); load(); }, [load]);

  return (
    <div className="card p-5">
      <div className="mb-4 flex flex-wrap items-end gap-3">
        <h2 className="mr-auto text-lg font-bold text-encre-800">Échéances de tous les clients</h2>
        <div><label htmlFor="dl-co" className="label">Entreprise</label>
          <select id="dl-co" className="field" value={companyId} onChange={(e) => setCompanyId(e.target.value)}><option value="">Toutes</option>{companies.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></div>
        <div><label htmlFor="dl-st" className="label">Statut</label>
          <select id="dl-st" className="field" value={status} onChange={(e) => setStatus(e.target.value)}><option value="">Tous</option><option value="todo">À faire</option><option value="in_progress">En cours</option><option value="done">Terminé</option></select></div>
      </div>
      {error && <Alert>{error}</Alert>}
      {!items && !error ? <Spinner /> : <MonthCalendar deadlines={items || []} month={month} onMonthChange={setMonth} onSelect={setEdit} showCompany />}
      {edit && <DeadlineEditor deadline={edit} onClose={() => setEdit(null)} onSaved={() => { setEdit(null); load(); }} />}
    </div>
  );
}

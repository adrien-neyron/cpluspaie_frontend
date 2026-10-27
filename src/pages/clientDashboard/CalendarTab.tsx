import React, { useCallback, useEffect, useState } from 'react';
import { errorMessage, useApi } from '../../hooks/useApi';
import type { Company, Deadline } from '../../types/portal';
import MonthCalendar from '../../components/portal/MonthCalendar';
import { Alert, Dialog, fmtDate, isOverdue, KIND_LABEL, Spinner, StatusPill } from '../../components/portal/ui';

const pad = (n: number) => String(n).padStart(2, '0');

export default function CalendarTab() {
  const { apiCall } = useApi();
  const now = new Date();
  const [month, setMonth] = useState({ y: now.getFullYear(), m: now.getMonth() });
  const [companies, setCompanies] = useState<Company[]>([]);
  const [companyId, setCompanyId] = useState('');
  const [items, setItems] = useState<Deadline[] | null>(null);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState<Deadline | null>(null);

  useEffect(() => { apiCall('/portal/companies').then((r) => setCompanies(r.data)).catch(() => {}); }, [apiCall]);

  const load = useCallback(async () => {
    const from = `${month.y}-${pad(month.m + 1)}-01`;
    const to = `${month.y}-${pad(month.m + 1)}-${pad(new Date(month.y, month.m + 1, 0).getDate())}`;
    try {
      const q = new URLSearchParams({ from, to, ...(companyId && { company_id: companyId }) });
      setItems((await apiCall(`/portal/deadlines?${q}`)).data); setError('');
    } catch (e) { setError(errorMessage(e, 'Impossible de charger le calendrier.')); }
  }, [apiCall, month, companyId]);
  useEffect(() => { setItems(null); load(); }, [load]);

  const markDone = async (d: Deadline) => {
    try { await apiCall(`/portal/deadlines/${d.id}`, { method: 'PATCH', data: { status: 'done' } }); setSelected(null); await load(); }
    catch (e) { setError(errorMessage(e)); }
  };

  return (
    <div className="card p-5">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <h2 className="text-lg font-bold text-encre-800">Calendrier de paie</h2>
        {companies.length > 1 && (
          <div>
            <label htmlFor="cal-company" className="label">Entreprise</label>
            <select id="cal-company" className="field" value={companyId} onChange={(e) => setCompanyId(e.target.value)}>
              <option value="">Toutes</option>
              {companies.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
        )}
      </div>
      {error && <Alert>{error}</Alert>}
      {!items && !error ? <Spinner /> : (
        <MonthCalendar deadlines={items || []} month={month} onMonthChange={setMonth} onSelect={setSelected} showCompany={companies.length > 1} />
      )}
      {selected && (
        <Dialog title={selected.title} onClose={() => setSelected(null)}>
          <dl className="space-y-2 text-sm">
            <div><dt className="font-semibold">Type</dt><dd>{KIND_LABEL[selected.kind]}</dd></div>
            <div><dt className="font-semibold">Date</dt><dd>{fmtDate(selected.due_date)}</dd></div>
            {selected.company_name && <div><dt className="font-semibold">Entreprise</dt><dd>{selected.company_name}</dd></div>}
            <div><dt className="font-semibold">Statut</dt><dd><StatusPill status={selected.status} overdue={isOverdue(selected.due_date, selected.status)} /></dd></div>
            {selected.notes && <div><dt className="font-semibold">Précisions</dt><dd className="whitespace-pre-line">{selected.notes}</dd></div>}
          </dl>
          {selected.kind === 'variables' && selected.status !== 'done' && (
            <button className="btn-primary mt-5" onClick={() => markDone(selected)}>Marquer les variables comme transmises</button>
          )}
        </Dialog>
      )}
    </div>
  );
}

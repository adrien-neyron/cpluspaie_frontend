import React, { useState } from 'react';
import { errorMessage, useApi } from '../../hooks/useApi';
import type { Deadline, DeadlineKind, DeadlineStatus } from '../../types/portal';
import { Alert, Dialog, KIND_LABEL, STATUS_LABEL } from '../../components/portal/ui';

export default function DeadlineEditor({ deadline, companyId, onClose, onSaved }: {
  deadline: Deadline | null; companyId?: string; onClose: () => void; onSaved: () => void;
}) {
  const { apiCall } = useApi();
  const [f, setF] = useState({
    title: deadline?.title ?? '', kind: (deadline?.kind ?? 'other') as DeadlineKind,
    due_date: deadline?.due_date ?? '', status: (deadline?.status ?? 'todo') as DeadlineStatus, notes: deadline?.notes ?? '',
  });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const save = async (e: React.FormEvent) => {
    e.preventDefault(); setBusy(true); setError('');
    try {
      if (deadline) await apiCall(`/admin/deadlines/${deadline.id}`, { method: 'PUT', data: f });
      else await apiCall('/admin/deadlines', { method: 'POST', data: { ...f, company_id: companyId } });
      onSaved();
    } catch (err) { setError(errorMessage(err)); setBusy(false); }
  };
  const del = async () => {
    if (!deadline || !window.confirm('Supprimer cette échéance ?')) return;
    try { await apiCall(`/admin/deadlines/${deadline.id}`, { method: 'DELETE' }); onSaved(); } catch (err) { setError(errorMessage(err)); }
  };

  return (
    <Dialog title={deadline ? 'Modifier l’échéance' : 'Nouvelle échéance'} onClose={onClose}>
      <form onSubmit={save} className="grid gap-4 sm:grid-cols-2">
        {deadline?.company_name && <p className="sm:col-span-2 text-sm text-encre-600">Entreprise : <strong>{deadline.company_name}</strong></p>}
        <div className="sm:col-span-2"><label htmlFor="de-t" className="label">Intitulé *</label><input id="de-t" required className="field" value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} /></div>
        <div><label htmlFor="de-k" className="label">Type</label><select id="de-k" className="field" value={f.kind} onChange={(e) => setF({ ...f, kind: e.target.value as DeadlineKind })}>{(Object.keys(KIND_LABEL) as DeadlineKind[]).map((k) => <option key={k} value={k}>{KIND_LABEL[k]}</option>)}</select></div>
        <div><label htmlFor="de-d" className="label">Date *</label><input id="de-d" type="date" required className="field" value={f.due_date} onChange={(e) => setF({ ...f, due_date: e.target.value })} /></div>
        {deadline && <div><label htmlFor="de-s" className="label">Statut</label><select id="de-s" className="field" value={f.status} onChange={(e) => setF({ ...f, status: e.target.value as DeadlineStatus })}>{(Object.keys(STATUS_LABEL) as DeadlineStatus[]).map((s) => <option key={s} value={s}>{STATUS_LABEL[s]}</option>)}</select></div>}
        <div className="sm:col-span-2"><label htmlFor="de-n" className="label">Précisions (visibles du client)</label><textarea id="de-n" rows={3} className="field" value={f.notes} onChange={(e) => setF({ ...f, notes: e.target.value })} /></div>
        {error && <div className="sm:col-span-2"><Alert>{error}</Alert></div>}
        <div className="flex flex-wrap gap-3 sm:col-span-2">
          <button className="btn-primary" disabled={busy}>Enregistrer</button>
          {deadline && <button type="button" className="btn-danger" onClick={del}>Supprimer</button>}
          <button type="button" className="btn-outline" onClick={onClose}>Annuler</button>
        </div>
      </form>
    </Dialog>
  );
}

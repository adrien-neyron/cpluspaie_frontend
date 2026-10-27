import React, { useCallback, useEffect, useState } from 'react';
import { errorMessage, useApi } from '../../hooks/useApi';
import type { AppUserRow, CompanyDetail as CD, Deadline, DocumentMeta } from '../../types/portal';
import { Alert, Dialog, EmptyState, extOf, fmtShort, fmtSize, isOverdue, KIND_LABEL, Spinner, StatusPill, Tabs } from '../../components/portal/ui';
import DeadlineEditor from './DeadlineEditor';
import DocumentUploadForm from './DocumentUploadForm';

type Sub = 'info' | 'contacts' | 'access' | 'calendar' | 'docs';

export default function CompanyDetail({ id, onClose }: { id: string; onClose: () => void }) {
  const { apiCall } = useApi();
  const [c, setC] = useState<CD | null>(null);
  const [error, setError] = useState('');
  const [sub, setSub] = useState<Sub>('info');

  const load = useCallback(async () => {
    try { setC((await apiCall(`/admin/companies/${id}`)).data); setError(''); }
    catch (e) { setError(errorMessage(e, "Impossible de charger l'entreprise.")); }
  }, [apiCall, id]);
  useEffect(() => { load(); }, [load]);

  return (
    <Dialog title={c ? c.name : 'Entreprise'} onClose={onClose} wide>
      {error && <Alert>{error}</Alert>}
      {!c ? <Spinner /> : (
        <>
          <Tabs label="Sections de l'entreprise" value={sub} onChange={setSub} tabs={[
            { id: 'info', label: 'Informations' }, { id: 'contacts', label: `Interlocuteurs (${c.contacts.length})` },
            { id: 'access', label: `Accès (${c.members.length})` }, { id: 'calendar', label: 'Calendrier' }, { id: 'docs', label: 'Documents' },
          ]} />
          <div role="tabpanel" id={`panel-${sub}`} aria-labelledby={`tab-${sub}`}>
            {sub === 'info' && <Info c={c} reload={load} onDeleted={onClose} />}
            {sub === 'contacts' && <Contacts c={c} reload={load} />}
            {sub === 'access' && <Access c={c} reload={load} />}
            {sub === 'calendar' && <CalendarSection c={c} reload={load} />}
            {sub === 'docs' && <CompanyDocs c={c} />}
          </div>
        </>
      )}
    </Dialog>
  );
}

function Info({ c, reload, onDeleted }: { c: CD; reload: () => void; onDeleted: () => void }) {
  const { apiCall } = useApi();
  const [f, setF] = useState({ name: c.name, siret: c.siret ?? '', ccn: c.ccn ?? '', headcount: c.headcount?.toString() ?? '', status: c.status, notes: c.notes ?? '' });
  const [msg, setMsg] = useState<{ k: 'success' | 'error'; t: string } | null>(null);
  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiCall(`/admin/companies/${c.id}`, { method: 'PUT', data: { name: f.name, siret: f.siret || undefined, ccn: f.ccn || undefined, headcount: f.headcount === '' ? undefined : Number(f.headcount), status: f.status, notes: f.notes } });
      setMsg({ k: 'success', t: 'Modifications enregistrées.' }); reload();
    } catch (err) { setMsg({ k: 'error', t: errorMessage(err) }); }
  };
  const del = async () => {
    if (!window.confirm(`Supprimer définitivement « ${c.name} » ainsi que ses échéances et ses documents ?`)) return;
    try { await apiCall(`/admin/companies/${c.id}`, { method: 'DELETE' }); onDeleted(); }
    catch (err) { setMsg({ k: 'error', t: errorMessage(err) }); }
  };
  return (
    <form onSubmit={save} className="grid gap-4 sm:grid-cols-2">
      <div className="sm:col-span-2"><label className="label" htmlFor="i-name">Raison sociale</label><input id="i-name" required className="field" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} /></div>
      <div><label className="label" htmlFor="i-siret">SIRET</label><input id="i-siret" className="field" value={f.siret} onChange={(e) => setF({ ...f, siret: e.target.value })} /></div>
      <div><label className="label" htmlFor="i-ccn">Convention collective</label><input id="i-ccn" className="field" value={f.ccn} onChange={(e) => setF({ ...f, ccn: e.target.value })} /></div>
      <div><label className="label" htmlFor="i-hc">Effectif</label><input id="i-hc" type="number" min={0} className="field" value={f.headcount} onChange={(e) => setF({ ...f, headcount: e.target.value })} /></div>
      <div><label className="label" htmlFor="i-st">Statut</label><select id="i-st" className="field" value={f.status} onChange={(e) => setF({ ...f, status: e.target.value as any })}><option value="active">Client actif</option><option value="prospect">Prospect</option><option value="archived">Archivé</option></select></div>
      <div className="sm:col-span-2"><label className="label" htmlFor="i-notes">Notes internes (jamais visibles par le client)</label><textarea id="i-notes" rows={4} className="field" value={f.notes} onChange={(e) => setF({ ...f, notes: e.target.value })} /></div>
      {msg && <div className="sm:col-span-2"><Alert kind={msg.k}>{msg.t}</Alert></div>}
      <div className="flex flex-wrap gap-3 sm:col-span-2"><button className="btn-primary">Enregistrer</button><button type="button" className="btn-danger" onClick={del}>Supprimer l’entreprise</button></div>
    </form>
  );
}

function Contacts({ c, reload }: { c: CD; reload: () => void }) {
  const { apiCall } = useApi();
  const [f, setF] = useState({ full_name: '', job_title: '', email: '', phone: '' });
  const [error, setError] = useState('');
  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    try { await apiCall(`/admin/companies/${c.id}/contacts`, { method: 'POST', data: f }); setF({ full_name: '', job_title: '', email: '', phone: '' }); setError(''); reload(); }
    catch (err) { setError(errorMessage(err)); }
  };
  const del = async (id: string) => {
    if (!window.confirm('Supprimer cet interlocuteur ?')) return;
    try { await apiCall(`/admin/company-contacts/${id}`, { method: 'DELETE' }); reload(); } catch (err) { setError(errorMessage(err)); }
  };
  return (
    <div className="space-y-5">
      {c.contacts.length === 0 ? <EmptyState title="Aucun interlocuteur" /> : (
        <ul className="divide-y divide-brume-300 rounded-lg border border-brume-300">
          {c.contacts.map((p) => (
            <li key={p.id} className="flex flex-wrap items-center justify-between gap-2 p-3 text-sm">
              <div><p className="font-semibold">{p.full_name}{p.job_title ? ` — ${p.job_title}` : ''}</p><p className="text-encre-600">{[p.email, p.phone].filter(Boolean).join(' · ') || '—'}</p></div>
              <button className="btn-danger btn-sm" onClick={() => del(p.id)} aria-label={`Supprimer ${p.full_name}`}>Supprimer</button>
            </li>
          ))}
        </ul>
      )}
      <form onSubmit={add} className="grid gap-3 rounded-lg bg-brume-100 p-4 sm:grid-cols-2" aria-label="Ajouter un interlocuteur">
        <div><label className="label" htmlFor="ct-n">Nom complet *</label><input id="ct-n" required className="field" value={f.full_name} onChange={(e) => setF({ ...f, full_name: e.target.value })} /></div>
        <div><label className="label" htmlFor="ct-j">Fonction</label><input id="ct-j" className="field" value={f.job_title} onChange={(e) => setF({ ...f, job_title: e.target.value })} /></div>
        <div><label className="label" htmlFor="ct-e">E-mail</label><input id="ct-e" type="email" className="field" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} /></div>
        <div><label className="label" htmlFor="ct-p">Téléphone</label><input id="ct-p" className="field" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} /></div>
        {error && <div className="sm:col-span-2"><Alert>{error}</Alert></div>}
        <div className="sm:col-span-2"><button className="btn-primary">Ajouter l’interlocuteur</button></div>
      </form>
    </div>
  );
}

function Access({ c, reload }: { c: CD; reload: () => void }) {
  const { apiCall } = useApi();
  const [users, setUsers] = useState<AppUserRow[]>([]);
  const [pick, setPick] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState<{ k: 'success' | 'error'; t: string } | null>(null);
  useEffect(() => { apiCall('/admin/users').then((r) => setUsers(r.data)).catch(() => {}); }, [apiCall]);
  const candidates = users.filter((u) => u.role === 'Client' && !c.members.some((m) => m.id === u.id));

  const run = async (fn: () => Promise<unknown>, ok: string) => {
    try { await fn(); setMsg({ k: 'success', t: ok }); reload(); } catch (err) { setMsg({ k: 'error', t: errorMessage(err) }); }
  };
  return (
    <div className="space-y-6">
      <section aria-labelledby="h-members">
        <h3 id="h-members" className="mb-2 font-bold">Utilisateurs de l’entreprise</h3>
        {c.members.length === 0 ? <EmptyState title="Aucun utilisateur rattaché" /> : (
          <ul className="divide-y divide-brume-300 rounded-lg border border-brume-300">
            {c.members.map((m) => (
              <li key={m.id} className="flex items-center justify-between gap-2 p-3 text-sm">
                <span>{m.name && m.name !== m.email ? `${m.name} — ` : ''}{m.email}</span>
                <button className="btn-danger btn-sm" aria-label={`Retirer ${m.email}`} onClick={() => run(() => apiCall(`/admin/companies/${c.id}/members/${m.id}`, { method: 'DELETE' }), 'Accès retiré.')}>Retirer</button>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-3 flex flex-wrap items-end gap-3">
          <div className="min-w-[16rem] flex-1"><label htmlFor="m-pick" className="label">Rattacher un utilisateur existant</label>
            <select id="m-pick" className="field" value={pick} onChange={(e) => setPick(e.target.value)}><option value="">Choisir…</option>{candidates.map((u) => <option key={u.id} value={u.id}>{u.email}</option>)}</select></div>
          <button className="btn-outline" disabled={!pick} onClick={() => run(() => apiCall(`/admin/companies/${c.id}/members`, { method: 'POST', data: { user_id: pick } }).then(() => setPick('')), 'Utilisateur rattaché.')}>Rattacher</button>
        </div>
      </section>

      <section aria-labelledby="h-inv" className="rounded-lg bg-brume-100 p-4">
        <h3 id="h-inv" className="mb-1 font-bold">Inviter un nouveau client</h3>
        <p className="mb-3 text-sm text-encre-700">L’inscription libre est désactivée : seule l’adresse invitée pourra accéder au portail, rattachée à cette entreprise. La personne doit aussi avoir un compte Auth0 créé par vos soins.</p>
        <div className="flex flex-wrap items-end gap-3">
          <div className="min-w-[16rem] flex-1"><label htmlFor="inv-email" className="label">Adresse e-mail</label><input id="inv-email" type="email" className="field" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
          <button className="btn-primary" disabled={!email} onClick={() => run(() => apiCall('/admin/invitations', { method: 'POST', data: { email, company_id: c.id } }).then(() => setEmail('')), 'Invitation enregistrée.')}>Inviter</button>
        </div>
        {c.invitations.length > 0 && (
          <ul className="mt-3 space-y-1 text-sm">
            {c.invitations.map((i) => (
              <li key={i.id} className="flex items-center justify-between gap-2">
                <span>{i.email} — {i.accepted_at ? `✓ acceptée le ${fmtShort(i.accepted_at)}` : 'en attente'}</span>
                {!i.accepted_at && <button className="btn-outline btn-sm" aria-label={`Annuler l'invitation de ${i.email}`} onClick={() => run(() => apiCall(`/admin/invitations/${i.id}`, { method: 'DELETE' }), 'Invitation annulée.')}>Annuler</button>}
              </li>
            ))}
          </ul>
        )}
      </section>
      {msg && <Alert kind={msg.k}>{msg.t}</Alert>}
    </div>
  );
}

function CalendarSection({ c, reload }: { c: CD; reload: () => void }) {
  const { apiCall } = useApi();
  const s = c.calendar_settings;
  const [days, setDays] = useState({ variables_day: s?.variables_day ?? 20, validation_day: s?.validation_day ?? 25, payment_day: s?.payment_day ?? 28, social_day: s?.social_day ?? 15 });
  const nextMonth = new Date(); nextMonth.setMonth(nextMonth.getMonth() + 1);
  const [start, setStart] = useState(`${nextMonth.getFullYear()}-${String(nextMonth.getMonth() + 1).padStart(2, '0')}`);
  const [months, setMonths] = useState(6);
  const [msg, setMsg] = useState<{ k: 'success' | 'error'; t: string } | null>(null);
  const [dl, setDl] = useState<Deadline[] | null>(null);
  const [edit, setEdit] = useState<Deadline | 'new' | null>(null);

  const loadDl = useCallback(async () => {
    try { setDl((await apiCall(`/admin/deadlines?company_id=${c.id}`)).data); } catch (e) { setMsg({ k: 'error', t: errorMessage(e) }); }
  }, [apiCall, c.id]);
  useEffect(() => { loadDl(); }, [loadDl]);

  const saveAndGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiCall(`/admin/companies/${c.id}/calendar-settings`, { method: 'PUT', data: days });
      const r = await apiCall(`/admin/companies/${c.id}/calendar/generate`, { method: 'POST', data: { start_month: start, months } });
      setMsg({ k: 'success', t: `Paramètres enregistrés. ${r.data.created} échéance(s) créée(s).` }); await loadDl(); reload();
    } catch (err) { setMsg({ k: 'error', t: errorMessage(err) }); }
  };
  const num = (k: keyof typeof days, label: string) => (
    <div><label className="label" htmlFor={`d-${k}`}>{label}</label><input id={`d-${k}`} type="number" min={1} max={31} required className="field" value={days[k]} onChange={(e) => setDays({ ...days, [k]: Number(e.target.value) })} /></div>
  );
  return (
    <div className="space-y-6">
      <form onSubmit={saveAndGenerate} className="rounded-lg bg-brume-100 p-4" aria-labelledby="h-gen">
        <h3 id="h-gen" className="font-bold">Calendrier personnalisé</h3>
        <p className="mb-3 text-sm text-encre-700">Indiquez le jour du mois de chaque étape, puis générez les échéances. Les dates existantes ne sont jamais dupliquées ; un jour 31 est ramené au dernier jour du mois.</p>
        <div className="grid gap-3 sm:grid-cols-4">
          {num('social_day', 'Échéances sociales (jour)')}{num('variables_day', 'Variables de paie (jour)')}{num('validation_day', 'Validation bulletins (jour)')}{num('payment_day', 'Virements (jour)')}
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-4">
          <div><label className="label" htmlFor="g-start">À partir du mois</label><input id="g-start" type="month" required className="field" value={start} onChange={(e) => setStart(e.target.value)} /></div>
          <div><label className="label" htmlFor="g-months">Nombre de mois</label><input id="g-months" type="number" min={1} max={24} className="field" value={months} onChange={(e) => setMonths(Number(e.target.value))} /></div>
          <div className="flex items-end"><button className="btn-primary">Enregistrer et générer</button></div>
        </div>
      </form>
      {msg && <Alert kind={msg.k}>{msg.t}</Alert>}
      <section aria-labelledby="h-dl">
        <div className="mb-2 flex items-center justify-between"><h3 id="h-dl" className="font-bold">Échéances de l’entreprise</h3><button className="btn-outline btn-sm" onClick={() => setEdit('new')}>+ Échéance manuelle</button></div>
        {!dl ? <Spinner /> : dl.length === 0 ? <EmptyState title="Aucune échéance" /> : (
          <div className="max-h-80 overflow-y-auto rounded-lg border border-brume-300">
            <table className="w-full text-left text-sm"><caption className="sr-only">Échéances</caption>
              <thead className="sticky top-0 bg-white text-encre-600"><tr><th scope="col" className="p-2">Date</th><th scope="col" className="p-2">Échéance</th><th scope="col" className="p-2">Statut</th><th scope="col" className="p-2"><span className="sr-only">Action</span></th></tr></thead>
              <tbody className="divide-y divide-brume-300">
                {dl.map((d) => (
                  <tr key={d.id}><td className="p-2 whitespace-nowrap">{fmtShort(d.due_date)}</td><td className="p-2">{d.title}<span className="block text-xs text-encre-600">{KIND_LABEL[d.kind]}</span></td><td className="p-2"><StatusPill status={d.status} overdue={isOverdue(d.due_date, d.status)} /></td><td className="p-2 text-right"><button className="btn-outline btn-sm" onClick={() => setEdit(d)} aria-label={`Modifier ${d.title}`}>Modifier</button></td></tr>
                ))}
              </tbody></table>
          </div>
        )}
      </section>
      {edit && <DeadlineEditor deadline={edit === 'new' ? null : edit} companyId={c.id} onClose={() => setEdit(null)} onSaved={() => { setEdit(null); loadDl(); reload(); }} />}
    </div>
  );
}

function CompanyDocs({ c }: { c: CD }) {
  const { apiCall, download } = useApi();
  const [docs, setDocs] = useState<DocumentMeta[] | null>(null);
  const [error, setError] = useState('');
  const load = useCallback(async () => {
    try { setDocs((await apiCall(`/admin/documents?company_id=${c.id}`)).data); } catch (e) { setError(errorMessage(e)); }
  }, [apiCall, c.id]);
  useEffect(() => { load(); }, [load]);
  const toggle = async (d: DocumentMeta) => { try { await apiCall(`/admin/documents/${d.id}`, { method: 'PUT', data: { published: !d.published } }); load(); } catch (e) { setError(errorMessage(e)); } };
  const del = async (d: DocumentMeta) => { if (!window.confirm(`Supprimer « ${d.title} » ?`)) return; try { await apiCall(`/admin/documents/${d.id}`, { method: 'DELETE' }); load(); } catch (e) { setError(errorMessage(e)); } };
  return (
    <div className="space-y-5">
      {error && <Alert>{error}</Alert>}
      {!docs ? <Spinner /> : docs.length === 0 ? <EmptyState title="Aucun document pour cette entreprise" /> : (
        <ul className="divide-y divide-brume-300 rounded-lg border border-brume-300">
          {docs.map((d) => (
            <li key={d.id} className="flex flex-wrap items-center justify-between gap-2 p-3 text-sm">
              <div><p className="font-semibold">{d.title}</p><p className="text-encre-600">{extOf(d.file_name)} · {fmtSize(d.size_bytes)} · {fmtShort(d.created_at)} · {d.published ? 'Publié' : 'Brouillon (invisible du client)'}</p></div>
              <div className="flex gap-2">
                <button className="btn-outline btn-sm" onClick={() => download(`/admin/documents/${d.id}/download`, d.file_name).catch((e) => setError(errorMessage(e)))}>Télécharger</button>
                <button className="btn-outline btn-sm" onClick={() => toggle(d)}>{d.published ? 'Dépublier' : 'Publier'}</button>
                <button className="btn-danger btn-sm" onClick={() => del(d)} aria-label={`Supprimer ${d.title}`}>Supprimer</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <DocumentUploadForm fixedCompanyId={c.id} onUploaded={load} />
    </div>
  );
}

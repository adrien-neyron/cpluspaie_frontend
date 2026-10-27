import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { errorMessage } from '../../hooks/useApi';
import type { Company } from '../../types/portal';
import { Alert } from '../../components/portal/ui';
import { useApi } from '../../hooks/useApi';

const MAX = 4 * 1024 * 1024;

/** Dépôt d'un document (PDF, DOCX, XLSX) : contrôlé côté navigateur ET revérifié côté serveur. */
export default function DocumentUploadForm({ fixedCompanyId, onUploaded }: { fixedCompanyId?: string; onUploaded: () => void }) {
  const { getAccessTokenSilently } = useAuth0();
  const { apiCall } = useApi();
  const fileRef = useRef<HTMLInputElement>(null);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [f, setF] = useState({ title: '', category: '', description: '', company_id: fixedCompanyId ?? '', published: true });
  const [msg, setMsg] = useState<{ k: 'success' | 'error'; t: string } | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => { if (!fixedCompanyId) apiCall('/admin/companies').then((r) => setCompanies(r.data)).catch(() => {}); }, [apiCall, fixedCompanyId]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const file = fileRef.current?.files?.[0];
    if (!file) { setMsg({ k: 'error', t: 'Choisissez un fichier.' }); return; }
    if (!/\.(pdf|docx|xlsx)$/i.test(file.name)) { setMsg({ k: 'error', t: 'Formats acceptés : PDF, DOCX, XLSX.' }); return; }
    if (file.size > MAX) { setMsg({ k: 'error', t: 'Fichier trop volumineux (4 Mo maximum).' }); return; }
    setBusy(true); setMsg(null);
    try {
      const body = new FormData();
      body.append('title', f.title);
      if (f.category) body.append('category', f.category);
      if (f.description) body.append('description', f.description);
      if (f.company_id) body.append('company_id', f.company_id);
      body.append('published', String(f.published));
      body.append('file', file);
      const token = await getAccessTokenSilently();
      await axios.post(`${process.env.REACT_APP_API_URL}/admin/documents`, body, { headers: { Authorization: `Bearer ${token}` } });
      setMsg({ k: 'success', t: f.published ? 'Document publié.' : 'Document enregistré (brouillon).' });
      setF({ ...f, title: '', category: '', description: '' }); if (fileRef.current) fileRef.current.value = '';
      onUploaded();
    } catch (err) { setMsg({ k: 'error', t: errorMessage(err, "L'envoi a échoué.") }); }
    finally { setBusy(false); }
  };

  return (
    <form onSubmit={submit} className="grid gap-3 rounded-lg bg-brume-100 p-4 sm:grid-cols-2" aria-label="Déposer un document">
      <h3 className="font-bold sm:col-span-2">Déposer un document</h3>
      <div><label htmlFor="up-t" className="label">Titre *</label><input id="up-t" required maxLength={255} className="field" value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} /></div>
      <div><label htmlFor="up-c" className="label">Catégorie</label><input id="up-c" maxLength={100} className="field" placeholder="Ex : Contrats, Bulletins, Modèles RH" value={f.category} onChange={(e) => setF({ ...f, category: e.target.value })} /></div>
      {!fixedCompanyId && (
        <div><label htmlFor="up-co" className="label">Destinataire</label>
          <select id="up-co" className="field" value={f.company_id} onChange={(e) => setF({ ...f, company_id: e.target.value })}>
            <option value="">Bibliothèque de modèles (tous les clients)</option>
            {companies.map((c) => <option key={c.id} value={c.id}>{c.name} uniquement</option>)}
          </select></div>
      )}
      <div><label htmlFor="up-f" className="label">Fichier (PDF, DOCX, XLSX — 4 Mo max) *</label><input id="up-f" ref={fileRef} type="file" required accept=".pdf,.docx,.xlsx" className="field bg-white" /></div>
      <div className="sm:col-span-2"><label htmlFor="up-d" className="label">Description</label><input id="up-d" maxLength={2000} className="field" value={f.description} onChange={(e) => setF({ ...f, description: e.target.value })} /></div>
      <label className="flex items-center gap-2 text-sm sm:col-span-2"><input type="checkbox" checked={f.published} onChange={(e) => setF({ ...f, published: e.target.checked })} /> Publier immédiatement (visible des clients concernés)</label>
      {msg && <div className="sm:col-span-2"><Alert kind={msg.k}>{msg.t}</Alert></div>}
      <div className="sm:col-span-2"><button className="btn-primary" disabled={busy}>{busy ? 'Envoi…' : 'Déposer'}</button></div>
    </form>
  );
}

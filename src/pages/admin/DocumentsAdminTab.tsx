import React, { useCallback, useEffect, useState } from 'react';
import { errorMessage, useApi } from '../../hooks/useApi';
import type { Company, DocumentMeta } from '../../types/portal';
import { Alert, EmptyState, extOf, fmtShort, fmtSize, Spinner } from '../../components/portal/ui';
import DocumentUploadForm from './DocumentUploadForm';

export default function DocumentsAdminTab() {
  const { apiCall, download } = useApi();
  const [docs, setDocs] = useState<DocumentMeta[] | null>(null);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [scope, setScope] = useState('');
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  useEffect(() => { apiCall('/admin/companies').then((r) => setCompanies(r.data)).catch(() => {}); }, [apiCall]);
  const load = useCallback(async () => {
    try {
      const q = new URLSearchParams({ ...(scope && { scope }), ...(search && { search }) });
      setDocs((await apiCall(`/admin/documents?${q}`)).data); setError('');
    } catch (e) { setError(errorMessage(e, 'Impossible de charger les documents.')); }
  }, [apiCall, scope, search]);
  useEffect(() => { const t = setTimeout(load, 200); return () => clearTimeout(t); }, [load]);

  const name = (id: string | null) => (id ? companies.find((c) => c.id === id)?.name ?? 'Entreprise' : 'Bibliothèque de modèles');
  const toggle = async (d: DocumentMeta) => { try { await apiCall(`/admin/documents/${d.id}`, { method: 'PUT', data: { published: !d.published } }); load(); } catch (e) { setError(errorMessage(e)); } };
  const del = async (d: DocumentMeta) => { if (!window.confirm(`Supprimer définitivement « ${d.title} » ?`)) return; try { await apiCall(`/admin/documents/${d.id}`, { method: 'DELETE' }); load(); } catch (e) { setError(errorMessage(e)); } };

  return (
    <div className="space-y-6">
      <DocumentUploadForm onUploaded={load} />
      <div className="card p-5">
        <div className="mb-4 flex flex-wrap items-end gap-3">
          <h2 className="mr-auto text-lg font-bold text-encre-800">Tous les documents</h2>
          <div><label htmlFor="da-s" className="label">Rechercher</label><input id="da-s" type="search" className="field" value={search} onChange={(e) => setSearch(e.target.value)} /></div>
          <div><label htmlFor="da-sc" className="label">Type</label><select id="da-sc" className="field" value={scope} onChange={(e) => setScope(e.target.value)}><option value="">Tous</option><option value="library">Modèles</option><option value="company">Propres à un client</option></select></div>
        </div>
        {error && <Alert>{error}</Alert>}
        {!docs && !error ? <Spinner /> : docs && docs.length === 0 ? <EmptyState title="Aucun document" /> : docs && (
          <div className="relative overflow-x-auto"><table className="w-full text-left text-sm"><caption className="sr-only">Documents</caption>
            <thead className="border-b border-brume-300 text-encre-600"><tr><th scope="col" className="py-2 pr-3">Document</th><th scope="col" className="py-2 pr-3">Destinataire</th><th scope="col" className="py-2 pr-3">Format</th><th scope="col" className="py-2 pr-3">Publication</th><th scope="col" className="py-2"><span className="sr-only">Actions</span></th></tr></thead>
            <tbody className="divide-y divide-brume-300">{docs.map((d) => (
              <tr key={d.id}>
                <th scope="row" className="py-3 pr-3 text-left font-medium">{d.title}<span className="block text-xs font-normal text-encre-600">{d.category || 'Sans catégorie'} · {fmtShort(d.created_at)}</span></th>
                <td className="py-3 pr-3">{name(d.company_id)}</td>
                <td className="py-3 pr-3">{extOf(d.file_name)} · {fmtSize(d.size_bytes)}</td>
                <td className="py-3 pr-3">{d.published ? '✓ Publié' : '○ Brouillon'}</td>
                <td className="py-3 text-right"><div className="flex justify-end gap-2">
                  <button className="btn-outline btn-sm" onClick={() => download(`/admin/documents/${d.id}/download`, d.file_name).catch((e) => setError(errorMessage(e)))} aria-label={`Télécharger ${d.title}`}>Télécharger</button>
                  <button className="btn-outline btn-sm" onClick={() => toggle(d)} aria-label={`${d.published ? 'Dépublier' : 'Publier'} ${d.title}`}>{d.published ? 'Dépublier' : 'Publier'}</button>
                  <button className="btn-danger btn-sm" onClick={() => del(d)} aria-label={`Supprimer ${d.title}`}>Supprimer</button></div></td>
              </tr>))}</tbody></table></div>
        )}
      </div>
    </div>
  );
}

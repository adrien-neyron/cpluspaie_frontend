import React, { useCallback, useEffect, useState } from 'react';
import { errorMessage, useApi } from '../../hooks/useApi';
import type { DocumentMeta } from '../../types/portal';
import { Alert, EmptyState, extOf, fmtShort, fmtSize, Spinner } from '../../components/portal/ui';

export default function DocumentsTab() {
  const { apiCall, download } = useApi();
  const [scope, setScope] = useState<'' | 'company' | 'library'>('');
  const [search, setSearch] = useState('');
  const [debounced, setDebounced] = useState('');
  const [docs, setDocs] = useState<DocumentMeta[] | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState('');

  useEffect(() => { const t = setTimeout(() => setDebounced(search), 250); return () => clearTimeout(t); }, [search]);

  const load = useCallback(async () => {
    try {
      const q = new URLSearchParams({ ...(scope && { scope }), ...(debounced && { search: debounced }) });
      setDocs((await apiCall(`/portal/documents?${q}`)).data); setError('');
    } catch (e) { setError(errorMessage(e, 'Impossible de charger les documents.')); }
  }, [apiCall, scope, debounced]);
  useEffect(() => { load(); }, [load]);

  const get = async (d: DocumentMeta) => {
    setBusy(d.id);
    try { await download(`/portal/documents/${d.id}/download`, d.file_name); }
    catch (e) { setError(errorMessage(e, 'Téléchargement impossible.')); }
    finally { setBusy(''); }
  };

  return (
    <div className="card p-5">
      <h2 className="mb-4 text-lg font-bold text-encre-800">Documents</h2>
      <div className="mb-4 flex flex-wrap items-end gap-3">
        <div className="min-w-[14rem] flex-1">
          <label htmlFor="doc-search" className="label">Rechercher</label>
          <input id="doc-search" type="search" className="field" placeholder="Titre ou nom de fichier" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div>
          <label htmlFor="doc-scope" className="label">Type</label>
          <select id="doc-scope" className="field" value={scope} onChange={(e) => setScope(e.target.value as any)}>
            <option value="">Tous les documents</option>
            <option value="company">Mes documents</option>
            <option value="library">Modèles à télécharger</option>
          </select>
        </div>
      </div>
      {error && <Alert>{error}</Alert>}
      <p className="sr-only" role="status" aria-live="polite">{docs ? `${docs.length} document(s) trouvé(s)` : ''}</p>
      {!docs && !error ? <Spinner /> : docs && docs.length === 0 ? (
        <EmptyState title="Aucun document trouvé">Modifiez votre recherche ou revenez plus tard.</EmptyState>
      ) : docs && (
        <div className="relative overflow-x-auto">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">Liste des documents disponibles</caption>
            <thead className="border-b border-brume-300 text-encre-600">
              <tr><th scope="col" className="py-2 pr-3">Document</th><th scope="col" className="py-2 pr-3">Catégorie</th><th scope="col" className="py-2 pr-3">Format</th><th scope="col" className="py-2 pr-3">Taille</th><th scope="col" className="py-2 pr-3">Date</th><th scope="col" className="py-2"><span className="sr-only">Action</span></th></tr>
            </thead>
            <tbody className="divide-y divide-brume-300">
              {docs.map((d) => (
                <tr key={d.id}>
                  <th scope="row" className="py-3 pr-3 font-medium text-encre-800">
                    {d.title}
                    <span className="block text-xs font-normal text-encre-600">{d.company_id ? 'Mon entreprise' : 'Modèle'}{d.description ? ` — ${d.description}` : ''}</span>
                  </th>
                  <td className="py-3 pr-3">{d.category || '—'}</td>
                  <td className="py-3 pr-3"><span className="rounded bg-brume-200 px-1.5 py-0.5 text-xs font-semibold">{extOf(d.file_name)}</span></td>
                  <td className="py-3 pr-3">{fmtSize(d.size_bytes)}</td>
                  <td className="py-3 pr-3">{fmtShort(d.created_at)}</td>
                  <td className="py-3 text-right">
                    <button className="btn-primary btn-sm" disabled={busy === d.id} onClick={() => get(d)} aria-label={`Télécharger ${d.title} (${extOf(d.file_name)})`}>
                      {busy === d.id ? '…' : 'Télécharger'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

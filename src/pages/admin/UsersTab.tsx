import React, { useEffect, useState } from 'react';
import { errorMessage, useApi } from '../../hooks/useApi';
import type { AppUserRow } from '../../types/portal';
import { Alert, EmptyState, fmtShort, Spinner } from '../../components/portal/ui';

export default function UsersTab() {
  const { apiCall } = useApi();
  const [users, setUsers] = useState<AppUserRow[] | null>(null);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  useEffect(() => {
    const t = setTimeout(async () => {
      try { setUsers((await apiCall(`/admin/users${search ? `?search=${encodeURIComponent(search)}` : ''}`)).data); setError(''); }
      catch (e) { setError(errorMessage(e, 'Impossible de charger les utilisateurs.')); }
    }, 200);
    return () => clearTimeout(t);
  }, [apiCall, search]);
  return (
    <div className="card p-5">
      <h2 className="mb-1 text-lg font-bold text-encre-800">Utilisateurs</h2>
      <p className="mb-4 text-sm text-encre-600">Pour inviter un client, ouvrez sa fiche entreprise puis l’onglet « Accès ».</p>
      <div className="mb-4 max-w-sm"><label htmlFor="us-s" className="label">Rechercher</label><input id="us-s" type="search" className="field" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="E-mail ou nom" /></div>
      {error && <Alert>{error}</Alert>}
      {!users && !error ? <Spinner /> : users && users.length === 0 ? <EmptyState title="Aucun utilisateur" /> : users && (
        <div className="relative overflow-x-auto"><table className="w-full text-left text-sm"><caption className="sr-only">Utilisateurs</caption>
          <thead className="border-b border-brume-300 text-encre-600"><tr><th scope="col" className="py-2 pr-3">E-mail</th><th scope="col" className="py-2 pr-3">Nom</th><th scope="col" className="py-2 pr-3">Rôle</th><th scope="col" className="py-2 pr-3">Entreprises</th><th scope="col" className="py-2">Créé le</th></tr></thead>
          <tbody className="divide-y divide-brume-300">{users.map((u) => (
            <tr key={u.id}><td className="py-3 pr-3">{u.email}</td><td className="py-3 pr-3">{u.name && u.name !== u.email ? u.name : '—'}</td><td className="py-3 pr-3">{u.role === 'Admin' ? 'Administrateur' : 'Client'}</td><td className="py-3 pr-3">{u.companies.length ? u.companies.map((c) => c.name).join(', ') : <span className="text-encre-600">Aucune</span>}</td><td className="py-3">{fmtShort(u.created_at)}</td></tr>))}</tbody></table></div>
      )}
    </div>
  );
}

import React, { useCallback, useEffect, useState } from 'react';
import { errorMessage, useApi } from '../../hooks/useApi';
import type { RequestItem } from '../../types/portal';
import { Alert, EmptyState, fmtShort, RequestPill, Spinner } from '../../components/portal/ui';
import { useAuthContext } from '../../context/AuthContext';

export default function RequestsTab() {
  const { apiCall } = useApi();
  const { user } = useAuthContext();
  const [items, setItems] = useState<RequestItem[] | null>(null);
  const [error, setError] = useState('');
  const [ok, setOk] = useState('');
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', message: '' });

  const load = useCallback(async () => {
    try { setItems((await apiCall('/portal/requests')).data.contacts); setError(''); }
    catch (e) { setError(errorMessage(e, "Impossible de charger l'historique.")); }
  }, [apiCall]);
  useEffect(() => { load(); }, [load]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true); setOk(''); setError('');
    try {
      await apiCall('/portal/requests', { method: 'POST', data: { name: form.name, phone: form.phone, email: user?.email, message: form.message } });
      setForm({ name: '', phone: '', message: '' });
      setOk('Votre demande a bien été enregistrée. Votre consultante reviendra vers vous.');
      await load();
    } catch (err) { setError(errorMessage(err, "L'envoi a échoué.")); }
    finally { setSending(false); }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <form onSubmit={submit} className="card space-y-4 p-5" aria-labelledby="h-new">
        <h2 id="h-new" className="text-lg font-bold text-encre-800">Nouvelle demande</h2>
        <div>
          <label htmlFor="rq-name" className="label">Objet de la demande</label>
          <input id="rq-name" required maxLength={255} className="field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ex : question sur un bulletin, entrée d'un salarié…" />
        </div>
        <div>
          <label htmlFor="rq-phone" className="label">Téléphone (facultatif)</label>
          <input id="rq-phone" type="tel" maxLength={50} className="field" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        </div>
        <div>
          <label htmlFor="rq-msg" className="label">Votre message</label>
          <textarea id="rq-msg" required rows={5} maxLength={5000} className="field" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
        </div>
        {error && <Alert>{error}</Alert>}
        {ok && <Alert kind="success">{ok}</Alert>}
        <button className="btn-primary" disabled={sending}>{sending ? 'Envoi…' : 'Envoyer la demande'}</button>
      </form>

      <section className="card p-5" aria-labelledby="h-hist">
        <h2 id="h-hist" className="mb-3 text-lg font-bold text-encre-800">Mes demandes</h2>
        {!items && !error ? <Spinner /> : items && items.length === 0 ? (
          <EmptyState title="Aucune demande pour le moment" />
        ) : (
          <ul className="space-y-3">
            {items?.map((r) => (
              <li key={r.id} className="rounded-lg border border-brume-300 p-4">
                <div className="flex items-start justify-between gap-3">
                  <p className="font-semibold text-encre-800">{r.name}</p>
                  <RequestPill status={r.status} />
                </div>
                <p className="mt-1 whitespace-pre-line text-sm text-encre-700">{r.message}</p>
                <p className="mt-2 text-xs text-encre-600">Envoyée le {fmtShort(r.created_at)}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

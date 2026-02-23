import React, { useCallback, useEffect, useState } from 'react';
import { useApi } from '../../hooks/useApi.ts';

const STATUS_LABELS = {
  new: { label: 'Nouveau', className: 'bg-blue-100 text-blue-800' },
  in_progress: { label: 'En cours', className: 'bg-yellow-100 text-yellow-800' },
  answered: { label: 'Répondu', className: 'bg-green-100 text-green-800' },
  closed: { label: 'Clôturé', className: 'bg-gray-100 text-gray-800' },
};

const TYPE_LABELS = {
  devis: 'Demande de devis',
  ai_optimization: 'Conseil IA',
};

export default function RequestsHistory() {
  const { apiCall } = useApi();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error] = useState(null);

  const loadRequests = useCallback(async () => {
  try {
    const data = await apiCall("/contacts");
    if (data.data?.contacts) {
      setRequests(data.data.contacts);
    }
  } catch (error) {
    console.error("Failed to load contacts:", error);
  } finally {
    setLoading(false);
  }
}, [apiCall]);

useEffect(() => {
    loadRequests();
  }, [loadRequests]);

  if (loading) {
    return <p className="text-gray-500">Chargement de l’historique…</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (requests.length === 0) {
    return (
      <p className="text-gray-500">
        Aucune demande enregistrée pour le moment.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {requests.map((req) => {
        const status = STATUS_LABELS[req.status] || STATUS_LABELS.new;

        return (
          <div
            key={req.id}
            className="border rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition"
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-lg text-gray-800">
                  {TYPE_LABELS[req.type]}
                </h3>
                <p className="text-sm text-gray-500">
                  Créée le{' '}
                  {new Date(req.created_at).toLocaleDateString('fr-FR')}
                </p>
              </div>

              <span
                className={`text-xs font-medium px-2 py-1 rounded ${status.className}`}
              >
                {status.label}
              </span>
            </div>

            {/* Contenu */}
            <div className="text-sm text-gray-700 space-y-1">
              {req.company_name && (
                <p>
                  <span className="font-medium">Société :</span>{' '}
                  {req.company_name}
                </p>
              )}

              {req.ccn && (
                <p>
                  <span className="font-medium">CCN :</span> {req.ccn}
                </p>
              )}

              {req.effectif && (
                <p>
                  <span className="font-medium">Effectif :</span>{' '}
                  {req.effectif} salarié(s)
                </p>
              )}

              {req.message && (
                <p className="mt-2 text-gray-600 italic">
                  “{req.message}”
                </p>
              )}
            </div>

            {/* Réponse cabinet / IA */}
            {req.response && (
              <div className="mt-4 p-3 bg-gray-50 border rounded-lg">
                <p className="text-sm font-medium text-gray-700 mb-1">
                  Réponse :
                </p>
                <p className="text-sm text-gray-600 whitespace-pre-line">
                  {req.response}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

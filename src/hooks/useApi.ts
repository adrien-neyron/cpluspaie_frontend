import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { useCallback } from 'react';

const API_URL = process.env.REACT_APP_API_URL;

export interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  data?: unknown;
  headers?: Record<string, string>;
}

/** Message d'erreur lisible à partir d'une erreur axios. */
export function errorMessage(err: any, fallback = 'Une erreur est survenue.'): string {
  const d = err?.response?.data;
  if (d?.details?.[0]?.msg) return `${d.error ?? 'Erreur'} : ${d.details[0].msg}`;
  return d?.error || fallback;
}

export const useApi = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const apiCall = useCallback(
    async (endpoint: string, options: ApiOptions = {}) => {
      const token = isAuthenticated ? await getAccessTokenSilently() : undefined;
      const response = await axios({
        method: options.method || 'GET',
        url: `${API_URL}${endpoint}`,
        data: options.data,
        headers: { ...(token && { Authorization: `Bearer ${token}` }), ...(options.headers || {}) },
      });
      return response.data;
    },
    [getAccessTokenSilently, isAuthenticated]
  );

  /** Téléchargement sécurisé : le fichier transite par l'API authentifiée (pas d'URL publique). */
  const download = useCallback(
    async (endpoint: string, fallbackName: string) => {
      const token = await getAccessTokenSilently();
      const response = await axios.get(`${API_URL}${endpoint}`, {
        responseType: 'blob',
        headers: { Authorization: `Bearer ${token}` },
      });
      const cd: string = response.headers['content-disposition'] || '';
      const m = /filename\*=UTF-8''([^;]+)/i.exec(cd);
      const name = m ? decodeURIComponent(m[1]) : fallbackName;
      const url = URL.createObjectURL(response.data);
      const a = document.createElement('a');
      a.href = url;
      a.download = name;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 10_000);
    },
    [getAccessTokenSilently]
  );

  const analyseAI = useCallback((formData: unknown) => apiCall('/ai/analyse', { method: 'POST', data: formData }), [apiCall]);

  return { apiCall, download, analyseAI };
};

/** Appel sans authentification (formulaire de contact public). */
export async function publicPost(endpoint: string, data: unknown) {
  const response = await axios.post(`${API_URL}${endpoint}`, data);
  return response.data;
}

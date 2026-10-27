import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useApi } from '../hooks/useApi';

export type AppUser = { id: string; email: string; name?: string | null; role: 'Admin' | 'Client'; credits?: number };
type AuthContextType = {
  user: AppUser | null;
  loading: boolean;
  /** 'forbidden' = compte Auth0 valide mais non invité (inscription libre interdite). */
  error: null | 'forbidden' | 'unavailable';
};

const AuthContext = createContext<AuthContextType>({ user: null, loading: true, error: null });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth0();
  const { apiCall } = useApi();
  const [user, setUser] = useState<AppUser | null>(null);
  const [error, setError] = useState<AuthContextType['error']>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const sync = async () => {
      try {
        const me = await apiCall('/auth/me');
        if (!cancelled) { setUser(me); setError(null); }
      } catch (err: any) {
        if (cancelled) return;
        setUser(null);
        setError(err?.response?.status === 403 ? 'forbidden' : 'unavailable');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    if (isLoading) return;
    if (isAuthenticated) sync();
    else { setUser(null); setError(null); setLoading(false); }
    return () => { cancelled = true; };
  }, [isAuthenticated, isLoading, apiCall]);

  if (isLoading || loading) {
    return (
      <div role="status" aria-live="polite" className="flex min-h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-ardoise-600" aria-hidden="true" />
        <span className="sr-only">Chargement…</span>
      </div>
    );
  }
  return <AuthContext.Provider value={{ user, loading, error }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);

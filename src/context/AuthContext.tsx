import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useApi } from "../hooks/useApi";

type AppUser = {
  id: string;
  email: string;
  name?: string;
  role: "Admin" | "Client";
  credits: number;
};

type AuthContextType = {
  user: AppUser | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

type AuthProviderProps = { children: ReactNode };

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const { apiCall } = useApi();
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const syncUser = async () => {
      try {
  const res = await apiCall("/auth/me");
        setUser(res);
      } catch (err) {
        console.error("❌ User sync failed", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) syncUser();
    else if (!isLoading) {
      setUser(null);
      setLoading(false);
    }
  }, [isAuthenticated, isLoading, getAccessTokenSilently, apiCall]);

  if (isLoading || loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-600" />
      </div>
    );

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);

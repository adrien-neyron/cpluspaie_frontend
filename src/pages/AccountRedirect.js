import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useAuthContext } from "../context/AuthContext";
import AccessDenied from "../components/auth/AccessDenied";

/** /espace : oriente l'utilisateur connecté selon son rôle (appliqué côté serveur). */
export default function AccountRedirect() {
  const { isAuthenticated } = useAuth0();
  const { user, error } = useAuthContext();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (error === "forbidden") return <AccessDenied reason="invitation" />;
  if (!user) return <AccessDenied reason="unavailable" />;
  return <Navigate to={user.role === "Admin" ? "/admin" : "/dashboard"} replace />;
}

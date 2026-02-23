import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

import SaaSProductLandingPage from "./landingPage/LandingPage";
import LegalNotices from "./pages/LegalNotices";
import PrivacyPolicyPage from "./pages/RGPDPolicy";
import ContactUsPage from "./pages/ContactUs";
import ScrollToTop from "./helpers/ScrollToTop";
import ClientDashboard from "./pages/clientDashboard/ClientDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import { LoginButton } from "./components/auth/LoginButton";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />

        <Routes>
          {/* Routes publiques */}
          <Route path="/" element={<SaaSProductLandingPage />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/legalnotices" element={<LegalNotices />} />
          <Route path="/policy" element={<PrivacyPolicyPage />} />
          <Route path="/callback" element={<LoginButton />} />


          {/* Routes protégées - Client */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute requiredRole="Client">
                <ClientDashboard />
              </ProtectedRoute>
            }
          />

          {/* Routes protégées - Admin */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="Admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Non autorisé */}
          <Route
            path="/unauthorized"
            element={
              <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-red-600 mb-4">
                    Accès Refusé
                  </h1>
                  <p className="text-gray-600">
                    Vous n'avez pas les permissions nécessaires.
                  </p>
                  <a
                    href="/"
                    className="text-blue-600 hover:underline mt-4 inline-block"
                  >
                    Retour à l'accueil
                  </a>
                </div>
              </div>
            }
          />

          {/* 404 */}
          <Route
            path="*"
            element={
              <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                  <p className="text-gray-600">Page non trouvée</p>
                  <a
                    href="/"
                    className="text-blue-600 hover:underline mt-4 inline-block"
                  >
                    Retour à l'accueil
                  </a>
                </div>
              </div>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

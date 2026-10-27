import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

import LandingPage from "./landingPage/LandingPage";
import ServicesPage from "./pages/Services";
import AboutPage from "./pages/About";
import LegalNotices from "./pages/LegalNotices";
import PrivacyPolicyPage from "./pages/RGPDPolicy";
import ContactUsPage from "./pages/ContactUs";
import LoginPage from "./pages/Login";
import AccountRedirect from "./pages/AccountRedirect";
import ScrollToTop from "./helpers/ScrollToTop";
import ClientDashboard from "./pages/clientDashboard/ClientDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";

const Message = ({ title, text }) => (
  <main id="contenu" className="flex min-h-screen items-center justify-center bg-brume-100 px-4">
    <div className="text-center">
      <h1 className="mb-4 text-4xl font-bold text-encre-800">{title}</h1>
      <p className="text-encre-600">{text}</p>
      <Link to="/" className="btn-primary mt-6">Retour à l'accueil</Link>
    </div>
  </main>
);

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />
        <Routes>
          {/* Site vitrine public */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/a-propos" element={<AboutPage />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/legalnotices" element={<LegalNotices />} />
          <Route path="/policy" element={<PrivacyPolicyPage />} />

          {/* Authentification */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/callback" element={<AccountRedirect />} />
          <Route path="/espace" element={<AccountRedirect />} />

          {/* Portail client (rôle contrôlé côté serveur) */}
          <Route path="/dashboard" element={<ProtectedRoute requiredRole="Client"><ClientDashboard /></ProtectedRoute>} />
          {/* Administration */}
          <Route path="/admin" element={<ProtectedRoute requiredRole="Admin"><AdminDashboard /></ProtectedRoute>} />

          <Route path="/unauthorized" element={<Message title="Accès refusé" text="Vous n'avez pas les permissions nécessaires." />} />
          <Route path="*" element={<Message title="404" text="Page non trouvée" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

import React from "react";
import Header from "../components/headers/Header.js";
import ContactUsForm from "../components/forms/Contact.js";
import Footer from "../components/footers/MiniCenteredFooter.js";
import { useDocumentTitle } from "../components/portal/ui";

export default function ContactUsPage() {
  useDocumentTitle("Contact");
  return (
    <>
      <Header />
      <main id="contenu"><ContactUsForm /></main>
      <Footer />
    </>
  );
}

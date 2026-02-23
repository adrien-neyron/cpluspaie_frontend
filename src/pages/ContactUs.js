import React from "react";
import { motion } from "framer-motion";
import Header from "../components/headers/Header.js"; // <-- IMPORT HEADER (chemin relatif)
import ContactUsForm from "../components/forms/Contact.js";
import Footer from "../components/footers/MiniCenteredFooter.js";

const ContactUsPage = () => {
  return (
    <>
      <Header />

      <motion.div
        id="contact"
        className="px-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900">
              {/* Titre ici si nécessaire */}
            </h2>
          </div>
          <ContactUsForm />
        </div>
      </motion.div>

      <Footer />
    </>
  );
};

export default ContactUsPage;

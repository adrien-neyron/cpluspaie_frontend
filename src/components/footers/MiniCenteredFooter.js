import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/LOGO_COULEUR.svg";
import { ReactComponent as LinkedinIcon } from "../../images/linkedin-icon.svg";

export default function Footer() {
  return (
    <footer className="bg-white shadow-md text-secondary-200">
      <div className="max-w-screen-xl mx-4 md:mx-auto lg:py-8 text-center">

        <div className="flex flex-col md:flex-row items-center justify-between">

          {/* Bloc gauche : Logo */}
          <div className="flex items-center md:justify-start mb-4 md:mb-0">
            <img src={logo} alt="logo" className="w-48" />
          </div>

          {/* Bloc central : Liens + texte */}
          <div className="flex flex-col items-center">
            <div className="flex flex-wrap justify-center items-center font-medium mt-4">
              <Link
                to="/"
                className="border-b-2 border-transparent hover:text-secondary-200 hover:border-gray-300 pb-1 transition duration-300 mt-2 mx-4"
              >
                Home
              </Link>
              <Link
                to="/contact"
                className="border-b-2 border-transparent hover:text-secondary-200 hover:border-gray-300 pb-1 transition duration-300 mt-2 mx-4"
              >
                Contact
              </Link>
              <Link
                to="/legalnotices"
                className="border-b-2 border-transparent hover:text-secondary-200 hover:border-gray-300 pb-1 transition duration-300 mt-2 mx-4"
              >
                Mentions Légales
              </Link>
              <Link
                to="/policy"
                className="border-b-2 border-transparent hover:text-secondary-200 hover:border-gray-300 pb-1 transition duration-300 mt-2 mx-4"
              >
                Politique de Confidentialité
              </Link>
            </div>
            <p className="mt-4 text-sm text-gray-400 text-center">
              © 2023 Adrien Neyron — Développé avec React, Tailwind CSS et Webpack
            </p>
          </div>

          {/* Bloc droit : Réseaux sociaux */}
          <div className="mt-5 md:mt-0 flex items-center">
            <a
              href="https://www.linkedin.com/in/carole-forestier/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-secondary-200 hover:text-red-500 transition duration-300 mx-4"
            >
              <LinkedinIcon className="w-5 h-5" />
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}

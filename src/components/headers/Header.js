import React, { useState } from "react";
import { HashLink } from 'react-router-hash-link';
import { motion } from "framer-motion";
import logo from "../../images/LOGO_COULEUR.svg";
import { ReactComponent as MenuIcon } from "feather-icons/dist/icons/menu.svg";
import { ReactComponent as CloseIcon } from "feather-icons/dist/icons/x.svg";
import UserMenu from "../UserMenu";

const Header = () => {
  const [showNav, setShowNav] = useState(false);

  const toggleNav = () => setShowNav(!showNav);

  const navLinks = (
    <>
      <HashLink smooth to="/#home" className="text-lg font-semibold text-gray-700 hover:text-red-500 border-b-2 border-transparent hover:border-red-500 px-2 py-1">Accueil</HashLink>
      <HashLink smooth to="/#missions" className="text-lg font-semibold text-gray-700 hover:text-red-500 border-b-2 border-transparent hover:border-red-500 px-2 py-1">Missions</HashLink>
      <HashLink smooth to="/#about" className="text-lg font-semibold text-gray-700 hover:text-red-500 border-b-2 border-transparent hover:border-red-500 px-2 py-1">Expertise</HashLink>
      <HashLink smooth to="/#steps" className="text-lg font-semibold text-gray-700 hover:text-red-500 border-b-2 border-transparent hover:border-red-500 px-2 py-1">Process</HashLink>
      <HashLink smooth to="/#values" className="text-lg font-semibold text-gray-700 hover:text-red-500 border-b-2 border-transparent hover:border-red-500 px-2 py-1">Valeurs</HashLink>
      <HashLink smooth to="/#returns" className="text-lg font-semibold text-gray-700 hover:text-red-500 border-b-2 border-transparent hover:border-red-500 px-2 py-1">Témoignages</HashLink>
      <HashLink smooth to="/contact" className="text-lg font-semibold text-gray-700 hover:text-red-500 border-b-2 border-transparent hover:border-red-500 px-2 py-1">Contact</HashLink>
    </>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 flex justify-between items-center px-4 py-4 max-w-screen mx-auto shadow-md">
      {/* Logo */}
      <HashLink smooth to="/" className="flex items-center font-black text-2xl">
        <img src={logo} alt="logo" className="w-20 mx-6" />
      
      </HashLink>
      {/* Desktop Nav */}
      <nav className="hidden lg:flex space-x-4 items-center">
        {navLinks}
      </nav>
<UserMenu />

      {/* Mobile Nav Toggle */}
      <div className="lg:hidden">
        <button onClick={toggleNav} className="focus:outline-none text-gray-700">
          {showNav ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {showNav && (
        <motion.nav
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          className="fixed top-0 right-0 z-40 w-64 h-full bg-white p-6 shadow-lg flex flex-col items-center space-y-4 lg:hidden"
        >
          {navLinks}
        </motion.nav>
      )}
    </header>
  );
};

export default Header;

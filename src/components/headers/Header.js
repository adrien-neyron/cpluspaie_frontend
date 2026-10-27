import React, { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import logo from "../../images/LOGO_COULEUR.svg";
import UserMenu from "../UserMenu";
import { useAuth0 } from "@auth0/auth0-react";
import { useAuthContext } from "../../context/AuthContext";

const links = [
  { to: "/", label: "Accueil", end: true },
  { to: "/services", label: "Services" },
  { to: "/a-propos", label: "À propos" },
  { to: "/contact", label: "Contact" },
];

const pill = ({ isActive }) =>
  `relative rounded-full px-4 py-2 text-sm font-bold transition duration-200 ${
    isActive
      ? "bg-white text-ardoise-800 shadow-sm after:absolute after:bottom-1 after:left-1/2 after:h-1 after:w-1 after:-translate-x-1/2 after:rounded-full after:bg-corail-500"
      : "text-encre-600 hover:bg-white/70 hover:text-ardoise-800"
  }`;

const mobileLink = ({ isActive }) =>
  `flex items-center justify-between rounded-xl px-4 py-3.5 text-lg font-bold transition ${
    isActive ? "bg-ardoise-50 text-ardoise-800" : "text-encre-700 hover:bg-brume-100"
  }`;

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const { isAuthenticated } = useAuth0();
  const { user } = useAuthContext();
  const isAdmin = isAuthenticated && user?.role === "Admin";

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <a href="#contenu" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[70] focus:rounded-xl focus:bg-white focus:px-4 focus:py-2 focus:font-bold focus:shadow-lift">
        Aller au contenu
      </a>
      <header className={`fixed inset-x-0 top-0 z-50 border-b transition duration-300 ${scrolled ? "border-encre-200 bg-white/95 shadow-soft backdrop-blur-md" : "border-transparent bg-white/80 backdrop-blur-md"}`}>
        <div className="mx-auto flex max-w-screen-xl items-center justify-between gap-4 px-4 py-2.5">
          <Link to="/" aria-label="C+Paie — accueil" className="flex shrink-0 items-center rounded-lg">
            <img src={logo} alt="C+Paie" className="h-11 w-auto sm:h-12" />
          </Link>

          <nav aria-label="Navigation principale" className="hidden items-center gap-1 rounded-full bg-ardoise-50 p-1 ring-1 ring-ardoise-100 lg:flex">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.end} className={pill}>{l.label}</NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            {isAdmin && (
              <Link to="/admin" className="btn-accent hidden sm:inline-flex">Back-office</Link>
            )}
            <div className="hidden sm:block"><UserMenu /></div>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-encre-300 bg-white text-encre-800 transition hover:bg-ardoise-50 lg:hidden"
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              onClick={() => setOpen(!open)}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          </div>
        </div>

        {open && (
          <nav id="menu-mobile" aria-label="Navigation principale" className="animate-fade-up border-t border-encre-200 bg-white px-4 pb-5 pt-3 lg:hidden">
            <ul className="flex flex-col gap-1">
              {links.map((l) => (
                <li key={l.to}>
                  <NavLink to={l.to} end={l.end} className={mobileLink}>
                    {({ isActive }) => (<><span>{l.label}</span>{isActive && <span className="h-2 w-2 rounded-full bg-corail-500" aria-hidden="true" />}</>)}
                  </NavLink>
                </li>
              ))}
              {isAdmin && <li><Link to="/admin" className="btn-accent mt-2 w-full">Back-office</Link></li>}
            </ul>
            <div className="mt-4 border-t border-encre-200 pt-4 sm:hidden [&_.btn-primary]:w-full [&_.btn-outline]:w-full"><UserMenu /></div>
          </nav>
        )}
      </header>
    </>
  );
};

export default Header;

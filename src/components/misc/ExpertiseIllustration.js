import React from "react";
import { ReactComponent as SvgDotPattern } from "../../images/dot-pattern.svg";

/** Illustration originale (bulletin de paie, échéancier, conformité) dans le même cadre « arche » que le portrait. */
export default function ExpertiseIllustration({ label = "Illustration : bulletin de paie, échéancier et conformité", className = "" }) {
  return (
    <div className={`relative mx-auto w-full max-w-sm sm:max-w-md ${className}`}>
      <div aria-hidden="true" className="absolute -left-4 -top-4 h-full w-full rounded-t-[999px] rounded-b-[2.5rem] bg-ardoise-200/80 sm:-left-6 sm:-top-6" />
      <div aria-hidden="true" className="absolute -bottom-5 -right-5 h-full w-full rounded-t-[999px] rounded-b-[2.5rem] bg-corail-500/90" />
      <SvgDotPattern aria-hidden="true" className="absolute -bottom-8 -left-8 z-0 h-24 w-24 fill-current text-ardoise-300" />
      <figure className="relative z-10 overflow-hidden rounded-t-[999px] rounded-b-[2.5rem] shadow-lift ring-8 ring-white">
        <svg viewBox="0 0 400 500" role="img" aria-label={label} className="block aspect-[4/5] w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="exp-bg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#6f8bad" />
              <stop offset="1" stopColor="#3b516b" />
            </linearGradient>
          </defs>
          <rect width="400" height="500" fill="url(#exp-bg)" />
          <circle cx="330" cy="120" r="150" fill="#fff" opacity=".07" />
          <circle cx="40" cy="430" r="130" fill="#ea5d58" opacity=".18" />

          {/* Bulletin de paie */}
          <g transform="rotate(-5 200 270)">
            <rect x="92" y="130" width="216" height="270" rx="18" fill="#fff" />
            <rect x="92" y="130" width="216" height="52" rx="18" fill="#587499" />
            <rect x="92" y="164" width="216" height="18" fill="#587499" />
            <rect x="112" y="147" width="84" height="12" rx="6" fill="#fff" />
            <circle cx="282" cy="156" r="10" fill="#ea5d58" />
            {[0, 1, 2, 3].map((i) => (
              <g key={i}>
                <rect x="112" y={206 + i * 32} width={96 - (i % 2) * 20} height="9" rx="4.5" fill="#d3dbe6" />
                <rect x="244" y={206 + i * 32} width="44" height="9" rx="4.5" fill="#a9b8cc" />
              </g>
            ))}
            <rect x="112" y="344" width="176" height="1.5" fill="#d3dbe6" />
            <rect x="112" y="360" width="62" height="11" rx="5.5" fill="#587499" />
            <rect x="226" y="358" width="62" height="15" rx="7.5" fill="#ea5d58" />
          </g>

          {/* Calendrier / échéance */}
          <g transform="rotate(6 90 90)">
            <rect x="40" y="48" width="104" height="96" rx="16" fill="#fff" />
            <rect x="40" y="48" width="104" height="30" rx="16" fill="#ea5d58" />
            <rect x="40" y="62" width="104" height="16" fill="#ea5d58" />
            <rect x="62" y="38" width="8" height="22" rx="4" fill="#fff" />
            <rect x="114" y="38" width="8" height="22" rx="4" fill="#fff" />
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <rect key={i} x={56 + (i % 4) * 22} y={92 + Math.floor(i / 4) * 22} width="14" height="14" rx="4" fill={i === 5 ? "#587499" : "#d3dbe6"} />
            ))}
          </g>

          {/* Bouclier conformité */}
          <g transform="translate(262 336)">
            <path d="M52 0 L100 18 V62 C100 92 80 112 52 124 C24 112 4 92 4 62 V18 Z" fill="#fff" />
            <path d="M52 12 L90 26 V62 C90 86 74 102 52 112 C30 102 14 86 14 62 V26 Z" fill="#587499" />
            <path d="M34 62 L48 76 L72 48" fill="none" stroke="#fff" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
          </g>

          {/* Pastilles */}
          <g transform="translate(250 70)">
            <rect width="110" height="40" rx="20" fill="#fff" />
            <circle cx="22" cy="20" r="8" fill="#ea5d58" />
            <rect x="38" y="14" width="56" height="12" rx="6" fill="#a9b8cc" />
          </g>
        </svg>
      </figure>
    </div>
  );
}

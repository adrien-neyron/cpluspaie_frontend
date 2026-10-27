import React from "react";
import { ReactComponent as SvgDotPattern } from "../../images/dot-pattern.svg";

/** Photo dans un cadre « arche » aux couleurs de la charte (forme corail décalée + motif de points). */
export default function PortraitFrame({ src, alt = "", caption, role, className = "" }) {
  return (
    <div className={`relative mx-auto w-full max-w-sm sm:max-w-md ${className}`}>
      <div aria-hidden="true" className="absolute -right-4 -top-4 h-full w-full rounded-t-[999px] rounded-b-[2.5rem] bg-corail-500/90 sm:-right-6 sm:-top-6" />
      <div aria-hidden="true" className="absolute -bottom-5 -left-5 h-full w-full rounded-t-[999px] rounded-b-[2.5rem] bg-ardoise-200/70" />
      <SvgDotPattern aria-hidden="true" className="absolute -bottom-8 -right-8 z-0 h-24 w-24 fill-current text-ardoise-300" />
      <figure className="relative z-10 overflow-hidden rounded-t-[999px] rounded-b-[2.5rem] bg-ardoise-100 shadow-lift ring-8 ring-white">
        <img src={src} alt={alt} width="960" height="1200" className="aspect-[4/5] w-full object-cover object-[50%_20%]" />
      </figure>
      {caption && (
        <div className="absolute -bottom-6 left-1/2 z-20 w-[88%] -translate-x-1/2 rounded-2xl bg-white px-5 py-3.5 shadow-lift ring-1 ring-encre-200 sm:left-auto sm:right-[-1.5rem] sm:w-auto sm:translate-x-0">
          <p className="text-base font-extrabold text-encre-800">{caption}</p>
          {role && <p className="text-sm font-semibold text-corail-700">{role}</p>}
        </div>
      )}
    </div>
  );
}

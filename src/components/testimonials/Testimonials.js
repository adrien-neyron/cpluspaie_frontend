import React, { useState } from "react";
import { ReactComponent as StarIcon } from "../../images/star-icon.svg";
import { ReactComponent as ArrowLeftIcon } from "../../images/arrow-left-3-icon.svg";
import { ReactComponent as ArrowRightIcon } from "../../images/arrow-right-3-icon.svg";

/* Carrousel simple et accessible : une seule citation affichée à la fois,
   boutons précédent/suivant nommés, annonce par lecteur d'écran (aria-live). */
export default ({
  id,
  subheading = "Témoignages",
  heading = "",
  description = "",
  textOnLeft = false,
  testimonials = []
}) => {
  const [index, setIndex] = useState(0);
  const count = testimonials.length;
  const current = count ? testimonials[index % count] : null;
  const go = (delta) => setIndex((i) => (i + delta + count) % count);
  const headingId = `${id || "temoignages"}-titre`;

  return (
    <section id={id} aria-labelledby={headingId} className="mx-auto max-w-screen-xl overflow-x-clip px-4 py-16 md:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">{subheading}</p>
        <h2 id={headingId} className="section-title mt-4">{heading}</h2>
        {description && <p className="lead mt-5">{description}</p>}
      </div>

      {current && (
        <div className="relative mx-auto mt-12 max-w-3xl">
          <div aria-hidden="true" className="absolute -inset-3 -z-10 rotate-1 rounded-4xl bg-corail-100/70" />
          <figure className="card relative rounded-4xl p-8 sm:p-12">
            <svg aria-hidden="true" width="56" height="56" viewBox="0 0 24 24" className="absolute -top-6 left-8 text-corail-500 drop-shadow">
              <path fill="currentColor" d="M7.2 6C4.9 6 3 7.9 3 10.2V18h7.2v-7.8H6.6c0-1.3 1-2.4 2.3-2.4V6H7.2zm9.6 0c-2.3 0-4.2 1.9-4.2 4.2V18h7.2v-7.8h-3.6c0-1.3 1-2.4 2.3-2.4V6h-1.7z" />
            </svg>
            <div aria-live="polite" aria-atomic="true">
              <div className="flex" role="img" aria-label={`${current.stars || 5} étoiles sur 5`}>
                {Array.from({ length: current.stars || 5 }).map((_, i) => (
                  <StarIcon key={i} aria-hidden="true" className="mr-1 h-5 w-5 fill-current text-corail-500" />
                ))}
              </div>
              <p className="mt-5 text-xs font-extrabold uppercase tracking-widest text-ardoise-600">{current.heading}</p>
              <blockquote className="mt-3 text-lg font-semibold leading-relaxed text-encre-800 sm:text-xl">{current.quote}</blockquote>
              <figcaption className="mt-7 flex items-center gap-4">
                <img src={current.profileImageSrc} alt="" className="h-16 w-16 rounded-full object-cover ring-4 ring-ardoise-100" />
                <span>
                  <span className="block text-lg font-extrabold text-encre-800">{current.customerName}</span>
                  <span className="block font-semibold text-encre-600">{current.customerTitle}</span>
                </span>
              </figcaption>
            </div>
            {count > 1 && (
              <div className="mt-8 flex items-center justify-end gap-2 border-t border-encre-200 pt-6">
                <button type="button" onClick={() => go(-1)} aria-label="Témoignage précédent"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-encre-300 bg-white text-ardoise-700 transition hover:bg-ardoise-500 hover:text-white">
                  <ArrowLeftIcon aria-hidden="true" className="h-4 w-4" />
                </button>
                <span className="w-12 text-center text-sm font-bold text-encre-600" aria-hidden="true">{(index % count) + 1} / {count}</span>
                <button type="button" onClick={() => go(1)} aria-label="Témoignage suivant"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-encre-300 bg-white text-ardoise-700 transition hover:bg-ardoise-500 hover:text-white">
                  <ArrowRightIcon aria-hidden="true" className="h-4 w-4" />
                </button>
              </div>
            )}
          </figure>
        </div>
      )}
    </section>
  );
};

import React, { useRef } from "react";
import emailjs from '@emailjs/browser';
import { ReactComponent as EmailIllustrationSrc} from "../../images/email-illustration.svg";

export default function Contact({
  subheading = "CONTACT",
  heading = <>Expliquez moi <span className="text-red-400">Votre Situation</span></>,
  description = "Vous avez un projet en tête ? Obtenez dès maintenant un devis personnalisé en quelques clics. Remplissez simplement mon formulaire en ligne en indiquant vos besoins spécifiques, et je vous fournis rapidement une estimation détaillée adaptée à votre projet.",
  submitButtonText = "Envoyer",
  textOnLeft = true,
}) {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm('service_dl9djrv', 'template_ovql93k', form.current, 'MD6rY0SPz1H_153O_')
      .then(
        () => { console.log('SUCCESS!'); alert('Merci, je vous contacte très bientôt!'); },
        (error) => { console.log('FAILED...', error.text); }
      );
  };

  return (
    <section className="relative min-h-screen pt-20 px-4">
      <div className={`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto ${textOnLeft ? "" : "md:flex-row-reverse"}`}>
        {/* Image */}
        <div className="md:w-5/12 flex-shrink-0 flex justify-center items-center">
          <EmailIllustrationSrc style={{ height: "30rem", color: 'rgba(239, 68, 68, 1)' }} />
        </div>

        {/* Form & Text */}
        <div className="md:w-7/12 mt-16 md:mt-0 md:mx-4">
          {subheading && <p className="text-center md:text-left text-red-500 font-semibold mb-4">{subheading}</p>}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-center md:text-left leading-tight mb-4">{heading}</h2>
          {description && <p className="mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium text-gray-700 mb-8">{description}</p>}

          <form ref={form} onSubmit={sendEmail} className="grid grid-cols-2 gap-x-4 gap-y-4 max-w-lg mx-auto md:mx-0 text-sm">
            <input type="text" name="name" placeholder="Nom de société" className="border-b-2 py-3 focus:outline-none font-medium transition duration-300 focus:border-red-500" />
            <input type="email" name="user_email" placeholder="E-mail" required className="border-b-2 py-3 focus:outline-none font-medium transition duration-300 focus:border-red-500" />
            <input type="text" name="telephone" placeholder="Téléphone" className="border-b-2 py-3 focus:outline-none font-medium transition duration-300 focus:border-red-500" />
            <input type="text" name="ccn" placeholder="CCN" className="border-b-2 py-3 focus:outline-none font-medium transition duration-300 focus:border-red-500" />
            <input type="text" name="nbr_salaries" placeholder="Nombre de salariés" className="border-b-2 py-3 focus:outline-none font-medium transition duration-300 focus:border-red-500" />
            <input type="text" name="duree_mission" placeholder="Durée de la mission" className="border-b-2 py-3 focus:outline-none font-medium transition duration-300 focus:border-red-500" />
            <textarea name="message" placeholder="La mission demandée en quelques mots" className="border-b-2 py-3 focus:outline-none font-medium transition duration-300 focus:border-red-500 col-span-2 h-24"></textarea>
            <button type="submit" className="col-span-2 mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded transition duration-300"> {submitButtonText} </button>
          </form>
        </div>
      </div>
    </section>
  );
}

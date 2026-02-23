import React, { useRef } from "react";
import emailjs from '@emailjs/browser';
import Header from "../headers/Header.js";

import { ReactComponent as DesignIllustration } from "../../images/design-illustration-2.svg";
import CustomersLogoStripImage from "../../images/customers-logo-strip.png";

export default ({ roundedHeaderButton }) => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm('service_dl9djrv', 'template_ovql93k', form.current, 'MD6rY0SPz1H_153O_')
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
    alert('Merci, je vous contacte très bientôt!');
  };

  return (
    <>
      <Header roundedHeaderButton={roundedHeaderButton} />
      <div id="home" className="relative min-h-screen pt-20">
        {/* Two Columns */}
        <div className="flex flex-col lg:flex-row lg:items-center max-w-screen-xl mx-4 md:mx-auto ">
          {/* Left Column */}
          <div className="relative md:w-6/12 text-center max-w-lg mx-auto lg:max-w-none lg:text-left">
            <h1 className="font-bold text-3xl md:text-3xl lg:text-4xl xl:text-5xl text-gray-900 leading-tight">
              Votre partenaire en gestion de paie! <span className="text-primary-500"></span>
            </h1>
            
            <p className="my-5 lg:my-8 text-base xl:text-lg">
              Découvrez un partenaire en gestion de paie, offrant des solutions personnalisées pour répondre aux
              besoins uniques de chaque entreprise. Avec une approche sur mesure, mon service s'adapte parfaitement à
              votre structure et à vos exigences, assurant une gestion efficace et sans souci de la paie. Simplifiez vos
              processus et optimisez votre gestion grâce à notre partenariat dédié à votre réussite.
            </p>

            {/* Form */}
            <div className="relative max-w-md text-center mx-auto lg:mx-0">
              <form ref={form} onSubmit={sendEmail} className="relative">
                <input
                  type="email"
                  name="user_email"
                  placeholder="Votre adresse e-mail"
                  className="sm:pr-48 pl-8 py-4 sm:py-5 rounded-full border-2 w-full font-medium focus:outline-none transition duration-300 focus:border-primary-500 hover:border-gray-500"
                />
                <button
                  type="submit"
                  className="w-full sm:absolute right-0 top-0 bottom-0 bg-secondary-200 text-gray-100 font-bold mr-2 my-4 sm:my-2 rounded-full py-4 flex items-center justify-center sm:w-40 sm:leading-none focus:outline-none hover:bg-red-500 transition duration-300"
                >
                  C'est parti
                </button>
              </form>
            </div>

            {/* Customers Logo */}
            <div className="mt-8">
              <p className="uppercase text-sm lg:text-xs tracking-wider font-bold text-gray-500">
                Ils m'ont fait confiance
              </p>
              <img src={CustomersLogoStripImage} alt="Our Customers" className="mt-4 w-full lg:pr-16 xl:pr-32 opacity-50" />
            </div>
          </div>

          {/* Right Column */}
          <div className="relative md:w-6/12 flex flex-col justify-center">
            <div className="flex justify-center lg:justify-end">
              <DesignIllustration style={{ height: "30rem", color: 'rgba(239, 68, 68, 1)' }} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

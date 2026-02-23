import "slick-carousel/slick/slick.css";
import React, { useState } from "react";
import Slider from "react-slick";
import { ReactComponent as LoveIllustrationImageSrc } from "../../images/professional-illustration.svg";
import { ReactComponent as StarIcon } from "../../images/star-icon.svg";
import { ReactComponent as ArrowLeftIcon } from "../../images/arrow-left-3-icon.svg";
import { ReactComponent as ArrowRightIcon } from "../../images/arrow-right-3-icon.svg";

export default ({
  id,
  subheading = "Testimonials",
  heading = "",
  description = "En tant que responsable paie expérimenté, je m'engage à entretenir une relation étroite avec mes clients, offrant un soutien personnalisé et une expertise approfondie pour répondre à leurs besoins en matière de gestion des salaires et de conformité réglementaire.",
  textOnLeft = false,
  testimonials = []
}) => {
  const [sliderRef, setSliderRef] = useState(null);

  return (
    <div id={id} className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center">
        {/* Image Column */}
        <div className="md:w-5/12 xl:w-6/12 flex justify-center items-center">
          <LoveIllustrationImageSrc className="h-72 md:h-96 text-red-600" />
        </div>

        {/* Text Column */}
        <div className={`md:w-7/12 xl:w-6/12 mt-16 md:mt-0 ${textOnLeft ? 'md:pr-12 lg:pr-16 md:order-first' : 'md:pl-12 lg:pl-16 md:order-last'}`}>
          <h5 className="text-lg text-gray-500 text-center md:text-left">{subheading}</h5>
          <h2 className="mt-4 font-black text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight">{heading}</h2>
          <p className="mt-6 text-sm md:text-base lg:text-lg font-medium leading-relaxed text-gray-600 text-center md:text-left">{description}</p>

          {/* Slider */}
          <Slider ref={setSliderRef} arrows={false} className="mt-10">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="outline-none flex flex-col items-center md:items-start mb-8">
                {/* Stars */}
                <div className="flex mb-2">
                  {Array.from({ length: testimonial.stars }).map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-orange-400 mr-1 last:mr-0" />
                  ))}
                </div>

                {/* Heading & Quote */}
                <div className="mt-4 text-xl font-bold">{testimonial.heading}</div>
                <blockquote className="mt-4 mb-8 sm:mb-10 leading-relaxed font-medium text-gray-700">{testimonial.quote}</blockquote>

                {/* Customer Info & Controls */}
                <div className="mt-auto flex flex-col sm:flex-row justify-between items-center w-full">
                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start">
                    <img src={testimonial.profileImageSrc} alt={testimonial.customerName} className="rounded-full w-16 h-16 sm:w-20 sm:h-20" />
                    <div className="text-center md:text-left sm:ml-6 mt-2 sm:mt-0">
                      <h5 className="font-bold text-xl">{testimonial.customerName}</h5>
                      <p className="font-medium text-gray-500">{testimonial.customerTitle}</p>
                    </div>
                  </div>

                  <div className="flex mt-8 sm:mt-0 items-center">
                    <button onClick={sliderRef?.slickPrev} className="mx-3 p-4 rounded-full bg-gray-200 hover:bg-gray-300 text-red-600 hover:text-red-800 focus:outline-none">
                      <ArrowLeftIcon className="w-4 h-4" />
                    </button>
                    <div className="border-r h-6 mx-2" />
                    <button onClick={sliderRef?.slickNext} className="mx-3 p-4 rounded-full bg-gray-200 hover:bg-gray-300 text-red-600 hover:text-red-800 focus:outline-none">
                      <ArrowRightIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

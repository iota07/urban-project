import React from "react";
import TitleH1 from "./TitleH1";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

const Hero = ({ title, text, buttonText, buttonAction, children }) => {
  return (
    <section className="bg-backg py-8 lg:py-0 lg:min-h-screen">
      <div className="container mx-auto px-2 text-center lg:flex">
        <div className="lg:w-5/6 xl:w-5/6 2xl:w-full lg:pl-4 lg:pt-8">
          <TitleH1 title={title} />
          <p className="mt-4 text-md md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl px-2 text-primary">
            {text}
          </p>
          <button
            className="mt-8 bg-primary text-white py-2 px-6 rounded-3xl shadow-md hover:bg-tertiary transition duration-300"
            onClick={buttonAction}
          >
            <span className="flex items-center text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl">
              {buttonText}
              <MdOutlineKeyboardDoubleArrowRight className="ml-2 md:ml-1" />
            </span>
          </button>
        </div>
        {children}
      </div>
    </section>
  );
};

export default Hero;

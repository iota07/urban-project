import React from "react";
import TitleH1 from "./TitleH1";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

const Hero = ({ title, text, buttonText, buttonAction, children }) => {
  return (
    <section className="bg-backg py-2 md:py-0 md:min-h-screen">
      <div className="w-full px-2 text-center lg:flex">
        <div className="lg:pt-8">
          <TitleH1 title={title} />
          <p className="mt-4 md:pt-8 md:mt-0 lg:mt-12 px-2 text-primary">
            {text}
          </p>
          {buttonText && (
            <button
              className="bg-primary text-white py-2 px-6 lg:py-2 rounded-3xl shadow-md hover:bg-tertiary transition duration-300"
              onClick={buttonAction}
            >
              <span className="flex items-center text-xl md:text-4xl">
                {buttonText}
                <MdOutlineKeyboardDoubleArrowRight className="ml-2 md:ml-1" />
              </span>
            </button>
          )}
        </div>
        {children}
      </div>
    </section>
  );
};

export default Hero;

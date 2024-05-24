import React from "react";
import TitleH1 from "./TitleH1";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

const Hero = ({ title, text, buttonText, buttonAction, children }) => {
  return (
    <section className="bg-danger py-12">
      <div className="container mx-auto px-2 text-center">
        <TitleH1 title={title} />
        <p className="mt-4 text-md px-2 text-primary">{text}</p>
        <button
          className="mt-8 bg-primary text-white py-2 px-6 rounded-3xl shadow-md hover:bg-secondary transition duration-300"
          onClick={buttonAction}
        >
          <span className="flex items-center text-xl">
            {buttonText}
            <MdOutlineKeyboardDoubleArrowRight className="ml-2" />
          </span>
        </button>
        {children}
      </div>
    </section>
  );
};

export default Hero;

import React from "react";

const Footer = () => {
  return (
    <footer className="bg-backg text-primary text-sm md:text-lg lg:text-xl py-3 bottom-0 w-full">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center">
          <p>
            &copy; {new Date().getFullYear()} BuildWind. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";
import Hero from "../../component/Hero";
import QuickLink from "../../component/QuickLink";

const Home = () => {
  return (
    <>
      <nav className="flex justify-center items-center py-8 md:py-0 md:pb-12">
        <QuickLink />
      </nav>
      <section className="lg:w-full flex justify-center items-center">
        <Hero
          title="Empower Your Designs with Cutting-Edge Simulations"
          text="Welcome to urban.design, your ultimate workspace for architects seeking precision simulations to enhance their projects. Whether you're optimizing for wind comfort, wind energy, thermal comfort or air quality, our platform offers robust tools to enhance your architectural vision. Explore cutting-edge capabilities tailored to meet your design challenges with unparalleled precision and efficiency."
        />
      </section>
    </>
  );
};

export default Home;

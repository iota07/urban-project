import React from "react";
import CategoryTitle from "./CategoryTitle";
import BurgerNoLogo from "./BurgerNoLogo";

const ProjectFormLayout = ({ children }) => {
  return (
    <section className="w-screen md:w-full lg:w-10/12 lg:grow">
      <div className="p-4 bg-backg h-full lg:flex lg:flex-col lg:w-7/12 mb-24 md:mb-0">
        <BurgerNoLogo />
        <CategoryTitle title="Create a Project" />
        {children}
      </div>
    </section>
  );
};

export default ProjectFormLayout;

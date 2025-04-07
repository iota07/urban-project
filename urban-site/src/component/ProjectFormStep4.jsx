import React from "react";
import CadViewer from "./CadViewer";

const ProjectFormStep4 = ({ nextStep, prevStep, formData }) => {
  const buildingFile = formData.buildingFile?.fileContent;
  const surroundingsFile = formData.surroundingsFile?.fileContent;

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col w-full mt-4 lg:mt-0 p-4 shadow-md rounded-lg gap-8 mb-24 lg:space-y-4 sm:max-w-lg lg:max-w-4xl">
        <h2 className="text-2xl text-primary mb-4 sm:my-4 lg:my-0">
          <div>Building of interest</div>
          <div>+</div>
          <div>Surroundings</div>
        </h2>
        <section className="flex justify-center lg:w-2/3">
          <CadViewer stlFiles={[buildingFile, surroundingsFile]} />
        </section>
        <div className="flex justify-between">
          <button
            onClick={prevStep}
            className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-tertiary"
          >
            Back
          </button>
          <button
            onClick={nextStep}
            className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-tertiary"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectFormStep4;

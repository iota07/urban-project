import React, { useState, useEffect } from "react";
import FileUpload from "./FileUpload";
import CadViewer from "./CadViewer";

const ProjectFormStep3 = ({ nextStep, prevStep, formData, setFormData }) => {
  const [surroundingsFile, setSurroundingsFile] = useState(
    formData.surroundingsFile || null
  );

  const handleNext = () => {
    if (surroundingsFile) {
      setFormData({ ...formData, surroundingsFile });
      nextStep();
    } else {
      alert("Surroundings STL file is required");
    }
  };

  const handleFileContentRead = (file, fileContent) => {
    setSurroundingsFile({ file, fileContent });
  };

  useEffect(() => {
    console.log("Surroundings file updated:", surroundingsFile);
  }, [surroundingsFile]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col mt-4 lg:mt-0 p-4 shadow-md rounded-lg gap-8 mb-24 w-full sm:max-w-lg md:max-w-md lg:space-y-4 lg:max-w-4xl">
        <h2 className="text-2xl text-primary mb-4 sm:my-4">
          Upload Surroundings
        </h2>
        <section className="lg:flex">
          <div className="lg:w-96 md:w-full md:space-y-4">
            <FileUpload onFileContentRead={handleFileContentRead} />
            {surroundingsFile && surroundingsFile.file && (
              <p className="text-xl pt-8 -mb-8 text-primary">
                Preview: {surroundingsFile.file.name}
              </p>
            )}
          </div>
          <section className="flex justify-center grow">
            <CadViewer stlFile={surroundingsFile?.fileContent} />
          </section>
        </section>

        <div className="flex justify-between">
          <button
            onClick={prevStep}
            className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-tertiary"
          >
            Back
          </button>
          <section className="flex justify-end">
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-tertiary"
            >
              Next
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProjectFormStep3;

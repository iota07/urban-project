import React, { useState } from "react";

const ProjectFormStep1 = ({ nextStep, formData, setFormData }) => {
  const [title, setTitle] = useState(formData.title || "");

  const handleNext = () => {
    if (title.trim()) {
      setFormData({ ...formData, title });
      nextStep();
    } else {
      alert("Your project title is required");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col w-full max-w-md mt-4 p-4 shadow-md rounded-lg space-y-12 sm:max-w-lg">
        <h2 className="text-2xl text-primary mb-4 sm:my-4">
          Define Your Project Title
        </h2>
        <div className="mb-4">
          <label className="block text-lg font-medium text-primary pb-2">
            Project Title
          </label>
          <input
            type="text"
            placeholder="Enter project name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-secondary rounded-md focus:outline-secondary focus:ring-primary focus:border-primary text-lg text-primary"
            required
          />
        </div>
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
  );
};

export default ProjectFormStep1;

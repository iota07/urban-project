import React, { useState, useEffect } from "react";

// Mapping user-friendly labels to backend values
const analysisTypeMapping = {
  "Wind Comfort": "WC",
  "Wind Energy": "WE",
  "Thermal Comfort": "TC",
  "Air Quality": "AQ",
};

const analysisOptions = {
  "Wind Comfort": ["Lawson", "NEN8100"],
  "Wind Energy": ["Option1", "Option2"], // Ensure these match the backend options
  "Thermal Comfort": ["Option3", "Option4"],
  "Air Quality": ["Option5", "Option6"],
};

const ProjectFormStep5 = ({ nextStep, prevStep, formData, setFormData }) => {
  const [analysisType, setAnalysisType] = useState(formData.analysisType || "");
  const [analysisOption, setAnalysisOption] = useState(
    formData.analysisOption || ""
  );

  // Clear analysis option if the selected analysis type changes
  useEffect(() => {
    if (
      analysisType &&
      !analysisOptions[analysisType].includes(analysisOption)
    ) {
      setAnalysisOption("");
    }
  }, [analysisType]);

  const handleNext = () => {
    if (analysisType && analysisOption) {
      // Update formData with the mapped values
      setFormData({
        ...formData,
        analysisType: analysisTypeMapping[analysisType], // Map to backend value
        analysisOption,
      });
      nextStep(); // Proceed to the next step
    } else {
      alert("Both analysis type and option are required");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col w-full max-w-md mt-4 p-4 shadow-md rounded-lg gap-8 mb-24 sm:max-w-lg">
        <h2 className="text-2xl text-primary mb-4 sm:my-4">
          Select Type of Analysis
        </h2>
        <div className="flex flex-col space-y-4">
          <label className="text-lg text-primary">Analysis Type</label>
          <select
            value={analysisType}
            onChange={(e) => setAnalysisType(e.target.value)}
            className="p-3 border border-secondary rounded-md focus:outline-secondary"
          >
            <option value="" className="text-primary">
              Select Analysis Type
            </option>
            <option value="Wind Comfort" className="text-primary">
              Wind Comfort
            </option>
            <option value="Wind Energy" disabled className="text-gray-300">
              Wind Energy (Coming Soon)
            </option>
            <option value="Thermal Comfort" disabled className="text-gray-300">
              Thermal Comfort (Coming Soon)
            </option>
            <option value="Air Quality" disabled className="text-gray-300">
              Air Quality (Coming Soon)
            </option>
          </select>

          {analysisType && analysisType in analysisOptions && (
            <>
              <label className="text-lg text-primary focus:outline-secondary">
                Analysis Option
              </label>
              <select
                value={analysisOption}
                onChange={(e) => setAnalysisOption(e.target.value)}
                className="p-3 border border-secondary focus:outline-secondary rounded-md"
              >
                <option value="">Select Analysis Option</option>
                {analysisOptions[analysisType].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </>
          )}
        </div>

        <div className="flex justify-between mt-4">
          <button
            onClick={prevStep}
            className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-tertiary"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-tertiary"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectFormStep5;

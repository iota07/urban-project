import React, { useState, useEffect } from "react";
import ProjectFormStep1 from "./ProjectFormStep1";
import ProjectFormStep2 from "./ProjectFormStep2";
import ProjectFormStep3 from "./ProjectFormStep3";
import ProjectFormStep4 from "./ProjectFormStep4";
import ProjectFormStep5 from "./ProjectFormStep5";
import ProjectFormStep6 from "./ProjectFormStep6";
import ProjectFormStep7 from "./ProjectFormStep7";
import ProjectFormLayout from "./ProjectFormLayout";
import Stepper from "./Stepper";

const ProjectFormWrapper = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    buildingFile: null,
    surroundingFile: null,
    analysisType: "",
    analysisOption: "",
    address: "",
    lat: "",
    lng: "",
  });

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const steps = [
    "Step 1",
    "Step 2",
    "Step 3",
    "Step 4",
    "Step 5",
    "Step 6",
    "Step 7",
  ];

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <ProjectFormStep1
            nextStep={nextStep}
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 2:
        return (
          <ProjectFormStep2
            nextStep={nextStep}
            prevStep={prevStep}
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 3:
        return (
          <ProjectFormStep3
            nextStep={nextStep}
            prevStep={prevStep}
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 4:
        return (
          <ProjectFormStep4
            nextStep={nextStep}
            prevStep={prevStep}
            formData={formData}
          />
        );
      case 5:
        return (
          <ProjectFormStep5
            nextStep={nextStep}
            prevStep={prevStep}
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 6:
        return (
          <ProjectFormStep6
            nextStep={nextStep}
            prevStep={prevStep}
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 7:
        return (
          <ProjectFormStep7
            nextStep={nextStep}
            prevStep={prevStep}
            formData={formData}
          />
        );
      default:
        return (
          <div>
            Default: ProjectFormStep sending to server for preprocessing
          </div>
        );
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  return (
    <ProjectFormLayout>
      <Stepper currentStep={step} steps={steps} />
      {renderStep()}
    </ProjectFormLayout>
  );
};

export default ProjectFormWrapper;

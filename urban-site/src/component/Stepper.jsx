import React from "react";

const Stepper = ({ currentStep, steps }) => {
  return (
    <div className="flex justify-center items-center mb-4 mt-12 md:mb-8">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep - 1;
        const isCurrent = index === currentStep - 1;
        const isFuture = index >= currentStep;

        return (
          <React.Fragment key={index}>
            {index !== 0 && (
              <div
                className={`h-1 w-6 md:w-16 lg:w-72 ${
                  isCompleted ? "bg-secondary" : "bg-gray-200"
                }`}
              ></div>
            )}
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full lg:w-36 ${
                isCurrent
                  ? "bg-primary text-white"
                  : isCompleted
                  ? "bg-secondary text-primary"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {index + 1}
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Stepper;

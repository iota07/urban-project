import React from "react";

const PlanPanel = ({
  title,
  price,
  features,
  buttonText,
  onSelect,
  Icon,
  planId,
  disabled = false,
}) => {
  return (
    <section className="m-w-auto text-primary bg-backg shadow-lg rounded-lg overflow-hidden border border-gray-200">
      <section className="p-8">
        <div>
          <h2 className="text-4xl font-semibold mb-2">{title}</h2>
          {Icon && <Icon className="h-8 w-8 shrink-0" />}
          <div className="mt-6">
            <span className="text-3xl font-bold">€{price}</span>
            <span className="text-base "> / month</span>
          </div>
          <ul className="mt-6 space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center">
                <svg
                  className="w-4 h-4 text-backg border border-primary rounded-full p-0.5 bg-primary shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span className="ml-2 my-2">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={() => onSelect(planId)}
          disabled={disabled} // Use the disabled prop to disable the button
          className={`mt-8 w-full py-2 px-4 text-xl rounded-lg ${
            disabled
              ? "bg-gray-300 text-white cursor-not-allowed" // Styles for disabled button
              : "bg-primary hover:bg-tertiary text-white" // Styles for active button
          }`}
        >
          {buttonText}
        </button>
        {disabled && (
          <p className="flex justify-center text-danger text-sm mt-2">
            Currently unavailable
          </p>
        )}
      </section>
    </section>
  );
};

export default PlanPanel;

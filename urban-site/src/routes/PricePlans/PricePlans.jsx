import React from "react";
import { useNavigate } from "react-router-dom";
import PlanPanel from "../../component/PlanPanel";
import { BsBuildings } from "react-icons/bs";
import { MdArchitecture } from "react-icons/md";
import { PiStudentLight } from "react-icons/pi";
import { isUserAuthenticated } from "../../utils/auth";

const PricePlan = () => {
  const navigate = useNavigate();

  const handleSelectPlan = (planId) => {
    if (planId === "plan_free") {
      // Check if user is authenticated
      if (isUserAuthenticated()) {
        navigate("/home");
      } else {
        navigate("/login");
      }
    } else {
      alert(`Selected Plan: ${planId}`);
      // logic to handle the selected plan, like redirecting to a checkout page
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center lg:justify-start p-4">
      <h1 className="text-4xl text-primary font-bold mb-6 sm:my-16 ">
        Choose Your Subscription
      </h1>
      <div className="grid grid-cols-1 gap-6 sm:gap-12 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
        <PlanPanel
          title="Free"
          price="0"
          features={[
            "Studies Per Month: 1 study",
            "Simulations Per Study: 12 simulations",
            "CAD File Size Limit: 50MB",
            "Radius: 100m",
          ]}
          buttonText="Continue Free"
          planId="plan_free"
          onSelect={handleSelectPlan}
        />
        <PlanPanel
          title="Students"
          Icon={PiStudentLight}
          price="4"
          features={[
            "Studies Per Month: 3 studies",
            "Simulations Per Study: 12 simulations (total 36 simulations)",
            "CAD File Size Limit: 200MB",
            "Radius: 300m",
          ]}
          buttonText="Select Students"
          planId="plan_basic" // Replace with Stripe Plan ID
          onSelect={handleSelectPlan}
          disabled={true}
        />
        <PlanPanel
          title="Architects"
          Icon={MdArchitecture}
          price="49"
          features={[
            "Studies Per Month: 10 studies",
            "Simulations Per Study: 12 simulations (total 120 simulations)",
            "CAD File Size Limit: 1000MB",
            "Basic Support (48-hour response time)",
            "Advanced Analysis Tools",
          ]}
          buttonText="Select Architects"
          planId="plan_pro" // Replace with Stripe Plan ID
          onSelect={handleSelectPlan}
          disabled={true}
        />
        <PlanPanel
          title="Enterprise"
          Icon={BsBuildings}
          price="199"
          features={[
            "Studies Per Month: 30 studies",
            "15 simulations per study (total 450 simulations)",
            "CAD file size limit: 2000MB (if you need more, contact us)",
            "Basic Support (48-hour response time)",
            "Advanced Analysis Tools",
          ]}
          buttonText="Select Enterprise"
          planId="plan_enterprise" // Replace with Stripe Plan ID
          onSelect={handleSelectPlan}
          disabled={true}
        />
      </div>
    </div>
  );
};

export default PricePlan;

import React from "react";
import { useNavigate } from "react-router-dom";
import STLWithDataViewer from "../../component/STLWithDataViewer";
import buildings from "../../assets/buildings.stl";
import CFD_data_z5 from "../../assets/CFD_data_z5_PolyData.vtp";
import Hero from "../../component/Hero";

function Landingpage() {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/login");
  };

  return (
    <>
      <Hero
        title="Create the cities of tomorrow, today."
        buttonText="Get Started"
        buttonAction={handleButtonClick}
      >
        <STLWithDataViewer stlFile={buildings} vtpFile={CFD_data_z5} />
      </Hero>
    </>
  );
}

export default Landingpage;

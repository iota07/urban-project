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
        title="Experience Precision with BuildWind's 3D Viewer for CFD Visualization"
        text="Discover Unmatched Precision: Explore Our CFD Viewer for Intuitive Design Insights."
        buttonText="Get Started"
        buttonAction={handleButtonClick}
      >
        <STLWithDataViewer stlFile={buildings} vtpFile={CFD_data_z5} />
      </Hero>
    </>
  );
}

export default Landingpage;

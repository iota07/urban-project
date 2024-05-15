import React from "react";
import STLWithDataViewer from "../../component/STLWithDataViewer";
import buildings from "../../assets/buildings.stl";
import CFD_data_z5 from "../../assets/CFD_data_z5_polyData.vtk";

function Landingpage() {
  return (
    <>
      <h1>Landing page</h1>
      <STLWithDataViewer stlFile={buildings} vtkFile={CFD_data_z5} />
    </>
  );
}

export default Landingpage;

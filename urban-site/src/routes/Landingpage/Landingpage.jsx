import React from "react";
import STLWithDataViewer from "../../component/STLWithDataViewer";
import buildings from "../../assets/buildings.stl";
import CFD_data_z5 from "../../assets/CFD_data_z5_PolyData.vtp";

function Landingpage() {
  return (
    <>
      <h1>Landing page</h1>
      <STLWithDataViewer
        stlFile={buildings}
        vtpFile={CFD_data_z5}
        width={200}
        height={200}
      />
    </>
  );
}

export default Landingpage;

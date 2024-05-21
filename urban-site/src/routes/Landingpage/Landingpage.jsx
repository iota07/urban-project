import React from "react";
import STLWithDataViewer from "../../component/STLWithDataViewer";
import buildings from "../../assets/buildings.stl";
import CFD_data_z5 from "../../assets/CFD_data_z5_PolyData.vtp";

function Landingpage() {
  return (
    <>
      <h1>Landing page</h1>
      <section className="w-5/6">
        <STLWithDataViewer stlFile={buildings} vtpFile={CFD_data_z5} />
      </section>
    </>
  );
}

export default Landingpage;

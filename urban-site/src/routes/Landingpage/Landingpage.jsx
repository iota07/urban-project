import React from "react";
import STLWithDataViewer from "../../component/STLWithDataViewer";
import buildings from "../../assets/buildings.stl";
import CFD_data_z5 from "../../assets/CFD_data_z5.vtk";

function Landingpage() {
  return (
    <section className="flex items-center justify-center h-screen bg-blue-300 bg-opacity-50">
      <div className="p-6 bg-white bg-opacity-75 rounded shadow-xl">
        <h1 className="text-4xl font-bold text-blue-500">
          Welcome to the landing page!
        </h1>
        <STLWithDataViewer stlFile={buildings} vtkFile={CFD_data_z5} />
      </div>
    </section>
  );
}

export default Landingpage;

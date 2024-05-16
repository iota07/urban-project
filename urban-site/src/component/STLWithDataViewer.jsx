import React, { useEffect, useRef } from "react";
import "@kitware/vtk.js/Rendering/Profiles/Geometry";
import vtkActor from "@kitware/vtk.js/Rendering/Core/Actor";
import vtkFullScreenRenderWindow from "@kitware/vtk.js/Rendering/Misc/FullScreenRenderWindow";
import vtkMapper from "@kitware/vtk.js/Rendering/Core/Mapper";
import vtkSTLReader from "@kitware/vtk.js/IO/Geometry/STLReader";
import vtkXMLPolyDataReader from "@kitware/vtk.js/IO/XML/XMLPolyDataReader";

const STLWithDataViewer = ({ stlFile, vtpFile }) => {
  const containerRef = useRef();

  useEffect(() => {
    const fullScreenRenderer = vtkFullScreenRenderWindow.newInstance();
    const renderer = fullScreenRenderer.getRenderer();
    const renderWindow = fullScreenRenderer.getRenderWindow();

    const stlReader = vtkSTLReader.newInstance();
    const vtpReader = vtkXMLPolyDataReader.newInstance();
    const stlActor = vtkActor.newInstance();
    const vtkDataActor = vtkActor.newInstance();
    const stlMapper = vtkMapper.newInstance();
    const vtpDataMapper = vtkMapper.newInstance();

    stlActor.setMapper(stlMapper);
    vtkDataActor.setMapper(vtpDataMapper);

    const stlPromise = stlReader.setUrl(stlFile, { binary: true });
    const vtpPromise = vtpReader.setUrl(vtpFile, { binary: true });

    stlPromise
      .then(() => {
        console.log("STL file loaded successfully");
        const stlOutputData = stlReader.getOutputData(0);
        console.log("STL Output Data:", stlOutputData);
        stlMapper.setInputData(stlOutputData);
        renderer.addActor(stlActor);
        renderer.resetCamera();
      })
      .catch((error) => {
        console.error("Error loading STL file:", error);
      });

    vtpPromise
      .then(() => {
        console.log("VTP file loaded successfully");
        const vtkOutputData = vtpReader.getOutputData(0);
        console.log("VTP Output Data:", vtkOutputData);
        vtpDataMapper.setInputData(vtkOutputData);
        renderer.addActor(vtkDataActor);
        renderer.resetCamera();
      })
      .catch((error) => {
        console.error("Error loading VTK file:", error);
      });

    // Render after both files have been processed
    Promise.all([stlPromise, vtpPromise]).then(() => {
      renderWindow.render();
    });

    return () => {
      fullScreenRenderer.delete();
    };
  }, [stlFile, vtpFile]);

  return <div ref={containerRef} />;
};

export default STLWithDataViewer;

import React, { useEffect, useRef } from "react";
import "@kitware/vtk.js/Rendering/Profiles/Geometry";
import vtkActor from "@kitware/vtk.js/Rendering/Core/Actor";
import vtkFullScreenRenderWindow from "@kitware/vtk.js/Rendering/Misc/FullScreenRenderWindow";
import vtkMapper from "@kitware/vtk.js/Rendering/Core/Mapper";
import vtkSTLReader from "@kitware/vtk.js/IO/Geometry/STLReader";
import vtkXMLPolyDataReader from "@kitware/vtk.js/IO/Legacy/PolyDataReader";

const STLWithDataViewer = ({ stlFile, vtkFile }) => {
  const containerRef = useRef();

  useEffect(() => {
    const fullScreenRenderer = vtkFullScreenRenderWindow.newInstance();
    const renderer = fullScreenRenderer.getRenderer();
    const renderWindow = fullScreenRenderer.getRenderWindow();

    const stlReader = vtkSTLReader.newInstance();
    const vtkReader = vtkXMLPolyDataReader.newInstance();
    const stlActor = vtkActor.newInstance();
    const vtkDataActor = vtkActor.newInstance();
    const stlMapper = vtkMapper.newInstance();
    const vtkDataMapper = vtkMapper.newInstance();

    stlActor.setMapper(stlMapper);
    vtkDataActor.setMapper(vtkDataMapper);

    stlReader
      .setUrl(stlFile, { binary: true })
      .then(() => {
        console.log("STL file loaded successfully");
        stlMapper.setInputData(stlReader.getOutputData(0));
        renderer.addActor(stlActor);
        renderer.resetCamera();
        renderWindow.render();
      })
      .catch((error) => {
        console.error("Error loading STL file:", error);
      });

    vtkReader
      .setUrl(vtkFile, { binary: true })
      .then(() => {
        console.log("VTK file loaded successfully");
        vtkDataMapper.setInputData(vtkReader.getOutputData(0));
        renderer.addActor(vtkDataActor);
        renderer.resetCamera();
        renderWindow.render();
      })
      .catch((error) => {
        console.error("Error loading VTK file:", error);
      });

    return () => {
      fullScreenRenderer.delete();
    };
  }, [stlFile, vtkFile]);

  return <div ref={containerRef} className="h-[200px] w-[200px]" />;
};

export default STLWithDataViewer;

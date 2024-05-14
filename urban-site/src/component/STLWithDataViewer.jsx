import React, { useEffect, useRef } from "react";
import "@kitware/vtk.js/Rendering/Profiles/Geometry";
import vtkSTLReader from "vtk.js/Sources/IO/Geometry/STLReader";
import vtkXMLPolyDataReader from "vtk.js/Sources/IO/XML/XMLPolyDataReader";
import vtkFullScreenRenderWindow from "@kitware/vtk.js/Rendering/Misc/FullScreenRenderWindow";

import vtkActor from "@kitware/vtk.js/Rendering/Core/Actor";
import vtkMapper from "@kitware/vtk.js/Rendering/Core/Mapper";
import vtkConeSource from "@kitware/vtk.js/Filters/Sources/ConeSource";

const STLWithDataViewer = ({ stlFile, vtkFile }) => {
  const containerRef = useRef();

  useEffect(() => {
    const fullScreenRenderer = vtkFullScreenRenderWindow.newInstance({
      rootContainer: containerRef.current,
      containerStyle: {},
    });
    const renderer = fullScreenRenderer.getRenderer();
    const renderWindow = fullScreenRenderer.getRenderWindow();

    const stlReader = vtkSTLReader.newInstance();
    const vtkReader = vtkXMLPolyDataReader.newInstance();
    const stlActor = vtkActor.newInstance();
    const vtkActor = vtkActor.newInstance();
    const stlMapper = vtkMapper.newInstance();
    const vtkMapper = vtkMapper.newInstance();

    stlActor.setMapper(stlMapper);
    vtkActor.setMapper(vtkMapper);

    Promise.all([
      stlReader.setUrl(stlFile, { binary: true }).catch((error) => {
        console.error("Error loading STL file:", error);
      }),
      vtkReader.setUrl(vtkFile).catch((error) => {
        console.error("Error loading VTK file:", error);
      }),
    ])
      .then(() => {
        stlMapper.setInputData(stlReader.getOutputData(0));
        vtkMapper.setInputData(vtkReader.getOutputData(0));

        renderer.addActor(stlActor);
        renderer.addActor(vtkActor);

        renderer.resetCamera();
        renderWindow.render();
      })
      .catch((error) => {
        console.error("Error loading one or more files:", error);
      });

    return () => {
      fullScreenRenderer.delete();
    };
  }, [stlFile, vtkFile]);

  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
};

export default STLWithDataViewer;

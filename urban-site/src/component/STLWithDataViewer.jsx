import React, { useEffect, useRef } from "react";
import vtkFullScreenRenderWindow from "vtk.js/Sources/Rendering/Misc/FullScreenRenderWindow";
import vtkSTLReader from "vtk.js/Sources/IO/Geometry/STLReader";
import vtkXMLPolyDataReader from "vtk.js/Sources/IO/XML/XMLPolyDataReader";
import vtkMapper from "vtk.js/Sources/Rendering/Core/Mapper";
import vtkActor from "vtk.js/Sources/Rendering/Core/Actor";

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

    stlReader.setUrl(stlFile, { binary: true }).then(() => {
      stlMapper.setInputData(stlReader.getOutputData(0));
      renderer.addActor(stlActor);
      renderer.resetCamera();
      renderWindow.render();
    });

    vtkReader.setUrl(vtkFile).then(() => {
      vtkMapper.setInputData(vtkReader.getOutputData(0));
      renderer.addActor(vtkActor);
      renderer.resetCamera();
      renderWindow.render();
    });

    return () => {
      fullScreenRenderer.delete();
    };
  }, [stlFile, vtkFile]);

  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
};

export default STLWithDataViewer;

import React, { useEffect, useRef } from "react";
import "@kitware/vtk.js/Rendering/Profiles/Geometry";
import vtkActor from "@kitware/vtk.js/Rendering/Core/Actor";
import vtkFullScreenRenderWindow from "@kitware/vtk.js/Rendering/Misc/FullScreenRenderWindow";
import vtkMapper from "@kitware/vtk.js/Rendering/Core/Mapper";
import vtkSTLReader from "@kitware/vtk.js/IO/Geometry/STLReader";
import vtkXMLPolyDataReader from "@kitware/vtk.js/IO/XML/XMLPolyDataReader";
import vtkDataArray from "@kitware/vtk.js/Common/Core/DataArray";

const STLWithDataViewer = ({ stlFile, vtpFile }) => {
  const containerRef = useRef();

  useEffect(() => {
    const fullScreenRenderer = vtkFullScreenRenderWindow.newInstance();
    const renderer = fullScreenRenderer.getRenderer();
    const renderWindow = fullScreenRenderer.getRenderWindow();

    const stlReader = vtkSTLReader.newInstance();
    const vtpReader = vtkXMLPolyDataReader.newInstance();
    const stlActor = vtkActor.newInstance();
    const vtpDataActor = vtkActor.newInstance();
    const stlMapper = vtkMapper.newInstance();
    const vtpDataMapper = vtkMapper.newInstance();

    stlActor.setMapper(stlMapper);
    vtpDataActor.setMapper(vtpDataMapper);

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
        const vtpOutputData = vtpReader.getOutputData(0);
        console.log("VTP Output Data:", vtpOutputData);

        // Log basic information about the loaded data
        console.log("Number of Points:", vtpOutputData.getNumberOfPoints());
        console.log("Number of Cells:", vtpOutputData.getNumberOfCells());

        // Log information about scalar arrays
        const scalarArrays = vtpOutputData.getPointData().getArrays();
        console.log("Scalar Arrays:");
        scalarArrays.forEach((array, index) => {
          console.log(
            `  Array ${index}: ${array.getName()} (components: ${array.getNumberOfComponents()}, tuples: ${array.getNumberOfTuples()})`
          );
        });

        const velocityArray = scalarArrays.find(
          (array) => array.getName() === "U"
        );
        if (velocityArray) {
          const tuples = velocityArray.getNumberOfTuples();

          const colorData = new Float32Array(tuples * 3); // RGB components

          for (let i = 0; i < tuples; i++) {
            const tuple = velocityArray.getTuple(i);
            colorData[i * 3] = tuple[0]; // Red component
            colorData[i * 3 + 1] = tuple[1]; // Green component
            colorData[i * 3 + 2] = tuple[2]; // Blue component
          }

          const colorArray = vtkDataArray.newInstance({
            name: "Colors",
            values: colorData,
            numberOfComponents: 3, // RGB colors
          });

          // Set color array
          vtpOutputData.getPointData().setScalars(colorArray);
        }

        vtpDataMapper.setInputData(vtpOutputData);
        renderer.addActor(vtpDataActor);
        renderer.resetCamera();
      })
      .catch((error) => {
        console.error("Error loading VTP file:", error);
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

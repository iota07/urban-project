import React, { useRef, useEffect, useState } from "react";
import "@kitware/vtk.js/Rendering/Profiles/Geometry";
import vtkFullScreenRenderWindow from "@kitware/vtk.js/Rendering/Misc/FullScreenRenderWindow";
import vtkSTLReader from "@kitware/vtk.js/IO/Geometry/STLReader";
import vtkXMLPolyDataReader from "@kitware/vtk.js/IO/XML/XMLPolyDataReader";
import vtkMapper from "@kitware/vtk.js/Rendering/Core/Mapper";
import vtkActor from "@kitware/vtk.js/Rendering/Core/Actor";
import vtkDataArray from "@kitware/vtk.js/Common/Core/DataArray";
import vtkColorTransferFunction from "@kitware/vtk.js/Rendering/Core/ColorTransferFunction";
import vtkScalarBarActor from "@kitware/vtk.js/Rendering/Core/ScalarBarActor";
import * as d3 from "d3-scale";
import { formatDefaultLocale } from "d3-format";

// Component to view STL files with associated VTP data
const STLWithDataViewer = ({ stlFile, vtpFile }) => {
  // References to the container and the renderer
  const containerRef = useRef();
  const fullScreenRenderer = useRef(null);
  // State to track if files have been loaded
  const [filesLoaded, setFilesLoaded] = useState(false);

  // Effect hook to load and render the files
  useEffect(() => {
    // Asynchronous function to load and render the files
    const loadFiles = async () => {
      // Initialize the renderer if it's not already initialized
      if (!filesLoaded && !fullScreenRenderer.current) {
        fullScreenRenderer.current = vtkFullScreenRenderWindow.newInstance({
          //background: [1, 1, 1, 0],
          rootContainer: containerRef.current,
          containerStyle: { height: "100%", width: "100%" },
        });
      }

      // Get the renderer and the render window
      const renderer = fullScreenRenderer.current.getRenderer();
      const renderWindow = fullScreenRenderer.current.getRenderWindow();

      // Create the readers, mappers, and actors
      const stlReader = vtkSTLReader.newInstance();
      const vtpReader = vtkXMLPolyDataReader.newInstance();
      const stlMapper = vtkMapper.newInstance({ scalarVisibility: false });
      const vtpDataMapper = vtkMapper.newInstance();
      const stlActor = vtkActor.newInstance();
      const vtpDataActor = vtkActor.newInstance();

      // Set the mappers for the actors
      stlActor.setMapper(stlMapper);
      vtpDataActor.setMapper(vtpDataMapper);

      // Load the STL and VTP files
      const stlPromise = stlReader.setUrl(stlFile, { binary: true });
      const vtpPromise = vtpReader.setUrl(vtpFile, { binary: true });

      try {
        // Wait for the STL file to load
        await stlPromise;

        // Get the output data from the STL reader and set it for the mapper
        const stlOutputData = stlReader.getOutputData(0);
        stlMapper.setInputData(stlOutputData);
        // Add the STL actor to the renderer and reset the camera
        renderer.addActor(stlActor);
        renderer.resetCamera();

        // Wait for the VTP file to load
        await vtpPromise;

        // Get the output data from the VTP reader
        const vtpOutputData = vtpReader.getOutputData(0);

        // Throw an error if the VTP file failed to load
        if (!vtpOutputData) {
          throw new Error("Failed to load VTP file");
        }

        // Get the scalar arrays from the VTP output data
        const scalarArrays = vtpOutputData.getPointData().getArrays();
        // Find the velocity array
        const velocityArray = scalarArrays.find(
          (array) => array.getName() === "U"
        );

        let ctfun = null;
        let minMagnitude = 0;
        let maxMagnitude = 0;

        // If the velocity array exists, calculate the magnitudes and colors
        if (velocityArray) {
          // Calculate the magnitudes of the velocities
          const tuples = velocityArray.getNumberOfTuples();
          const magnitudes = new Float32Array(tuples);
          minMagnitude = Infinity;
          maxMagnitude = -Infinity;
          for (let i = 0; i < tuples; i++) {
            const tuple = velocityArray.getTuple(i);
            const magnitude = Math.sqrt(
              tuple[0] ** 2 + tuple[1] ** 2 + tuple[2] ** 2
            );
            magnitudes[i] = magnitude;
            minMagnitude = Math.min(minMagnitude, magnitude);
            maxMagnitude = Math.max(maxMagnitude, magnitude);
          }

          // Create a color transfer function based on the magnitudes
          ctfun = vtkColorTransferFunction.newInstance();
          ctfun.addRGBPoint(minMagnitude, 0, 0, 1); // Blue for low magnitudes
          ctfun.addRGBPoint(maxMagnitude, 1, 0, 0); // Red for high magnitudes

          // Calculate the colors based on the magnitudes
          const colorData = new Float32Array(tuples * 3); // RGB components
          for (let i = 0; i < tuples; i++) {
            const magnitude = magnitudes[i];
            const color = [];
            ctfun.getColor(magnitude, color);
            colorData[i * 3] = color[0]; // Red component
            colorData[i * 3 + 1] = color[1]; // Green component
            colorData[i * 3 + 2] = color[2]; // Blue component
          }

          // Create a color array and set it as the scalars for the VTP output data
          const colorArray = vtkDataArray.newInstance({
            name: "Colors",
            values: colorData,
            numberOfComponents: 3, // RGB colors
          });

          vtpOutputData.getPointData().setScalars(colorArray);
        }

        // Set the VTP output data for the mapper
        vtpDataMapper.setInputData(vtpOutputData);
        renderer.addActor(vtpDataActor);
        renderer.resetCamera();

        if (ctfun) {
          const mapper = vtkMapper.newInstance();
          mapper.setUseLookupTableScalarRange(true);
          let lut = mapper.getLookupTable();
          lut.setRange(parseFloat(minMagnitude), parseFloat(maxMagnitude));
          mapper.setInputData(vtpOutputData);
          const scalarBarActor = vtkScalarBarActor.newInstance();
          // Set the original lookup table to the scalar bar actor
          scalarBarActor.setScalarsToColors(lut);

          scalarBarActor.setAxisLabel("U Magnitude");
          scalarBarActor.setDrawNanAnnotation(false);
          scalarBarActor.setAutomated(true);

          function generateTicks(numberOfTicks) {
            return (helper) => {
              const lastTickBounds = helper.getLastTickBounds();
              const scale = d3
                .scaleLinear()
                .domain([minMagnitude, maxMagnitude])
                .range([lastTickBounds[0], lastTickBounds[1]]);
              const samples = scale.ticks(numberOfTicks);
              const ticks = samples.map((tick) => scale(tick));
              formatDefaultLocale({ minus: "\u002D" });
              const format = scale.tickFormat(
                ticks[0],
                ticks[ticks.length - 1],
                numberOfTicks
              );
              const tickStrings = ticks
                .map(format)
                .map((tick) => parseFloat(tick).toFixed(2));
              helper.setTicks(ticks);
              helper.setTickStrings(tickStrings);
            };
          }

          scalarBarActor.setGenerateTicks(generateTicks(10));
          renderer.addActor(scalarBarActor);
        }

        // Render after both files have been processed
        renderWindow.render();
        // Set the files as loaded
        setFilesLoaded(true);
      } catch (error) {
        // Log any errors that occurred while loading the files
        console.error("Error loading file:", error);
      }

      // Cleanup function to delete the actors, mappers, and readers
      return () => {
        stlActor.delete();
        vtpDataActor.delete();
        stlMapper.delete();
        vtpDataMapper.delete();
        stlReader.delete();
        vtpReader.delete();
      };
    };

    // Call the loadFiles function
    loadFiles();
  }, [stlFile, vtpFile, filesLoaded]);

  // Render a div to contain the rendered files
  return <div ref={containerRef} />;
};

export default STLWithDataViewer;

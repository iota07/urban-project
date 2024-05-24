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
import vtkLookupTable from "@kitware/vtk.js/Common/Core/LookupTable";
import { FaSpinner } from "react-icons/fa";

// Component to view STL files with associated VTP data
const STLWithDataViewer = ({ stlFile, vtpFile }) => {
  // References to the container and the renderer
  const containerRef = useRef();
  const fullScreenRenderer = useRef(null);
  const scalarBarActorRef = useRef(null);
  // State to track if files have been loaded
  const [filesLoaded, setFilesLoaded] = useState(false);

  // Function to reset the render window
  const resetRenderWindow = () => {
    // Get the renderer from the full screen render window
    const renderer = fullScreenRenderer.current.getRenderer();
    // Reset the camera orientation
    renderer.getActiveCamera().setOrientationWXYZ(0, 1, 1, 0);

    // Reset the camera
    renderer.resetCamera();
    // Render the scene
    fullScreenRenderer.current.getRenderWindow().render();
  };

  // Effect hook to load and render the files
  useEffect(() => {
    // Asynchronous function to load and render the files
    const loadFiles = async () => {
      // Initialize the renderer if it's not already initialized
      if (!filesLoaded && !fullScreenRenderer.current) {
        fullScreenRenderer.current = vtkFullScreenRenderWindow.newInstance({
          background: [0, 0, 0, 0],
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
        let colorArray = null;

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
          ctfun.addRGBPoint(minMagnitude, 1, 0, 0); // Blue for low magnitudes
          ctfun.addRGBPoint(maxMagnitude, 0, 0, 1); // Red for high magnitudes

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
          colorArray = vtkDataArray.newInstance({
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

        if (colorArray) {
          let lut = vtkLookupTable.newInstance();
          lut.setRange(parseFloat(minMagnitude), parseFloat(maxMagnitude));
          // Invert the hue range to change the gradient from blue to red
          lut.setHueRange([0.66667, 0.0]);

          // Rebuild the lookup table to apply the changes
          lut.forceBuild();
          const scalarBarActor = vtkScalarBarActor.newInstance();
          // Set the original lookup table to the scalar bar actor
          scalarBarActor.setScalarsToColors(lut);

          scalarBarActor.setAxisLabel("U Magnitude");
          scalarBarActor.setDrawNanAnnotation(false);
          scalarBarActor.setAutomated(true);

          scalarBarActor.setAxisTextStyle({
            fontColor: "black",
            fontFamily: "Helvetica",
          });
          scalarBarActor.setTickTextStyle({
            fontColor: "black",
            fontFamily: "Helvetica",
          });

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
                .map((tick) =>
                  Number(parseFloat(tick).toPrecision(12)).toPrecision()
                );
              helper.setTicks(ticks);
              helper.setTickStrings(tickStrings);
            };
          }

          scalarBarActor.setGenerateTicks(generateTicks(10));

          renderer.addActor(scalarBarActor);
          scalarBarActorRef.current = scalarBarActor;
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
        if (scalarBarActor) {
          renderer.removeActor(scalarBarActor);
          scalarBarActor.delete();
        }
      };
    };

    // Call the loadFiles function
    loadFiles();
  }, [stlFile, vtpFile, filesLoaded]);

  // Render a div to contain the rendered files
  return (
    <div>
      <div ref={containerRef} style={{ position: "relative" }}>
        {!filesLoaded && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-backg bg-opacity-0">
            <FaSpinner className="animate-spin h-14 w-auto text-primary" />
          </div>
        )}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button
          className="mt-2 bg-transparent hover:bg-primary text-secondary font-semibold hover:text-white py-1 px-4 border-2 border-secondary hover:border-transparent rounded-xl"
          onClick={resetRenderWindow}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default STLWithDataViewer;

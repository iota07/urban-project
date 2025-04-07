import React, { useRef, useEffect, useState } from "react";
import "@kitware/vtk.js/Rendering/Profiles/Geometry";
import vtkFullScreenRenderWindow from "@kitware/vtk.js/Rendering/Misc/FullScreenRenderWindow";
import vtkSTLReader from "@kitware/vtk.js/IO/Geometry/STLReader";
import vtkMapper from "@kitware/vtk.js/Rendering/Core/Mapper";
import vtkActor from "@kitware/vtk.js/Rendering/Core/Actor";
import { FaSpinner } from "react-icons/fa";

// Component to view STL files
const CadViewer = ({ stlFile, stlFiles }) => {
  const containerRef = useRef();
  const fullScreenRenderer = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fileLoaded, setFileLoaded] = useState(false);

  const resetRenderWindow = () => {
    const renderer = fullScreenRenderer.current.getRenderer();
    renderer.getActiveCamera().setOrientationWXYZ(0, 1, 1, 0);
    renderer.resetCamera();
    fullScreenRenderer.current.getRenderWindow().render();
  };

  useEffect(() => {
    const loadFiles = async () => {
      const filesToLoad = stlFiles || (stlFile ? [stlFile] : []);

      if (filesToLoad.length === 0) return;

      setLoading(true);
      setError(null);
      setFileLoaded(false);

      if (!fullScreenRenderer.current) {
        fullScreenRenderer.current = vtkFullScreenRenderWindow.newInstance({
          background: [0.95, 0.95, 0.95, 1],
          rootContainer: containerRef.current,
          containerStyle: { height: "100%", width: "100%" },
        });
        const interactor = fullScreenRenderer.current.getInteractor();
        document.removeEventListener("keypress", interactor.handleKeyPress);
        document.removeEventListener("keydown", interactor.handleKeyDown);
        document.removeEventListener("keyup", interactor.handleKeyUp);
      }

      const renderer = fullScreenRenderer.current.getRenderer();
      renderer.removeAllViewProps(); // Clear existing actors
      const renderWindow = fullScreenRenderer.current.getRenderWindow();

      try {
        for (let file of filesToLoad) {
          const stlReader = vtkSTLReader.newInstance();
          const stlMapper = vtkMapper.newInstance({ scalarVisibility: false });
          const stlActor = vtkActor.newInstance();
          stlActor.setMapper(stlMapper);

          await stlReader.setUrl(file, { binary: true });
          const stlOutputData = stlReader.getOutputData(0);
          stlMapper.setInputData(stlOutputData);
          renderer.addActor(stlActor);
        }
        renderer.resetCamera();
        renderWindow.render();
        setLoading(false);
        setFileLoaded(true);
      } catch (error) {
        console.error("Error loading files:", error);
        setError("Error loading files");
        setLoading(false);
        setFileLoaded(false);
      }

      return () => {
        if (fullScreenRenderer.current) {
          fullScreenRenderer.current.delete();
          fullScreenRenderer.current = null;
        }
      };
    };

    loadFiles();
  }, [stlFile, stlFiles]);

  return (
    <div className="lg:pt-0 w-auto md:w-auto lg:w-5/6 xl:w-5/6 2xl:w-5/6">
      <div ref={containerRef} className="relative w-auto h-auto"></div>
      {loading && (
        <div className="flex justify-center items-center">
          <FaSpinner className="animate-spin text-primary" />
          <p className="ml-2 text-primary">Loading...</p>
        </div>
      )}
      {error && (
        <div className="flex justify-center items-center mt-4 text-red-500">
          <p>{error}</p>
        </div>
      )}
      <div className="flex justify-center items-center">
        {!loading && !error && fileLoaded && (
          <button
            className="mt-2 md:mt-4 md:text-2xl bg-transparent hover:bg-primary text-primary font-semibold hover:text-white py-1 px-4 border-2 border-primary hover:border-transparent rounded-xl"
            onClick={resetRenderWindow}
          >
            Reset View
          </button>
        )}
      </div>
    </div>
  );
};

export default CadViewer;

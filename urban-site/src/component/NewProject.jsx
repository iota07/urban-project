import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import FileUpload from "./FileUpload";
import BurgerNoLogo from "./BurgerNoLogo";
import CaterogyTitle from "./CategoryTitle";
import CadViewer from "./CadViewer";

function NewProject() {
  const [projectName, setProjectName] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [stlFileContent, setStlFileContent] = useState(null);
  const [analysisType, setAnalysisType] = useState("");
  const [position, setPosition] = useState(null);

  const LocationMarker = () => {
    const map = useMap();

    useEffect(() => {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setPosition([latitude, longitude]);
        map.flyTo([latitude, longitude], map.getZoom());
      });
    }, [map]);

    useMapEvents({
      click(e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      },
    });

    const handleMarkerDrag = (e) => {
      setPosition(e.target.getLatLng());
    };

    return position === null ? null : (
      <Marker
        position={position}
        draggable={true}
        eventHandlers={{ dragend: handleMarkerDrag }}
      />
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process and send data to backend or state management
  };

  return (
    <>
      <section className="grow lg:flex">
        <div className="p-4 bg-backg h-full lg:flex lg:flex-col lg:min-w-128 lg:w-2/5">
          <BurgerNoLogo />
          <CaterogyTitle title="Create new project" />

          <form onSubmit={handleSubmit} className="z-0 flex flex-col pt-12">
            <label className="text-primary text-lg">Project title</label>
            <input
              type="text"
              label="Project title"
              placeholder="Enter your project name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="border-2 p-2 w-full rounded-lg my-2"
            />

            <select
              value={analysisType}
              onChange={(e) => setAnalysisType(e.target.value)}
              className="border-2 p-2 w-full rounded-lg my-8"
            >
              <option value="">What do you want us to do for you?</option>
              <optgroup label="Wind Comfort">
                <option value="NEN8100">NEN8100</option>
                <option value="Lawson">Lawson</option>
                {/* Add more subcategories under Wind Comfort as needed */}
              </optgroup>
              {/* Add more categories with their subcategories as needed */}
            </select>

            <FileUpload onFileContentRead={setStlFileContent} />
            <CadViewer stlFile={stlFileContent} />

            <MapContainer
              center={[51.505, -0.09]}
              zoom={13}
              style={{ height: 400, width: "100%" }}
              className="z-0"
            >
              <div className="coordinates-display">
                {position && (
                  <p>
                    Latitude: {position[0]}, Longitude: {position[1]}
                  </p>
                )}
              </div>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <LocationMarker />
            </MapContainer>

            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
            >
              <option value="">Select User</option>
              {/* Dynamically generate user options here */}
            </select>

            <button type="submit" className="border-lg border-4 p-2">
              Create Project
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default NewProject;

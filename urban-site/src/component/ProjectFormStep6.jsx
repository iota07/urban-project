import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-control-geocoder";

// Import the marker icon
import markerIconUrl from "leaflet/dist/images/marker-icon.png";

// Custom marker icon
const markerIcon = new L.Icon({
  iconUrl: markerIconUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const MapUpdater = ({ mapPosition }) => {
  const map = useMap(); // Access the Leaflet map instance

  useEffect(() => {
    if (map) {
      map.flyTo(mapPosition, map.getZoom()); // Use flyTo to move to the new position
    }
  }, [mapPosition, map]);

  return null;
};

const ProjectFormStep6 = ({ prevStep, nextStep, formData, setFormData }) => {
  const [mapPosition, setMapPosition] = useState(null);
  const [address, setAddress] = useState(formData.address || "");
  const [lat, setLat] = useState(formData.lat || "");
  const [lng, setLng] = useState(formData.lng || "");

  useEffect(() => {
    // Initialize map position based on formData if available
    if (formData.lat && formData.lng) {
      setMapPosition([parseFloat(formData.lat), parseFloat(formData.lng)]);
    } else {
      // Use Geolocation API to get the user's current location if no coordinates are available
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setMapPosition([latitude, longitude]);
            setLat(latitude.toString());
            setLng(longitude.toString());
            setFormData({
              ...formData,
              lat: latitude.toString(),
              lng: longitude.toString(),
            });
          },
          (error) => {
            console.error("Error fetching the user location:", error);
            setMapPosition([51.505, -0.09]); // Fallback to default location (London) if there's an error
          }
        );
      } else {
        setMapPosition([51.505, -0.09]); // Fallback to default location (London) if Geolocation is not available
      }
    }
  }, [formData]);

  const handleFindAddress = () => {
    const geocoder = L.Control.Geocoder.nominatim();
    geocoder.geocode(address, (results) => {
      if (results.length > 0) {
        const result = results[0];
        const { lat, lng } = result.center;
        setMapPosition([lat, lng]);
        setLat(lat.toString());
        setLng(lng.toString());
        setFormData({
          ...formData,
          address,
          lat: lat.toString(),
          lng: lng.toString(),
        });
      }
    });
  };

  const handleSaveCoordinates = () => {
    const newLat = parseFloat(lat);
    const newLng = parseFloat(lng);
    setMapPosition([newLat, newLng]);
    setFormData({
      ...formData,
      address,
      lat: newLat.toString(),
      lng: newLng.toString(),
    });
  };

  const handleNext = () => {
    // Ensure coordinates are saved to formData even if not done manually
    setFormData({ ...formData, address, lat, lng });
    nextStep();
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col w-full max-w-md mt-4 p-4 shadow-md rounded-lg gap-8 md:mb-24 lg:mb-0 sm:max-w-lg lg:max-w-4xl">
        <h2 className="text-2xl text-primary mb-4 sm:my-4">
          Set Project Location
        </h2>
        <section className="lg:flex space-y-4 lg:space-y-0 lg:gap-8">
          <section className="lg:grow lg:w-11/12 space-y-4">
            <div className="space-y-4">
              <label className="block">
                <span className="text-primary text-lg">Address</span>
                <input
                  type="text"
                  placeholder="Enter address"
                  className="p-3 border border-secondary rounded-md focus:outline-secondary focus:ring-primary focus:border-primary mt-1 block w-full"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </label>
              <button
                onClick={handleFindAddress}
                className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-tertiary"
              >
                Find Address
              </button>
            </div>

            <div className="space-y-4 mb-4">
              <label className="block">
                <span className="text-primary text-lg">Latitude</span>
                <input
                  type="text"
                  className="p-3 border border-secondary rounded-md focus:outline-secondary focus:ring-primary focus:border-primary mt-1 block w-full"
                  value={lat}
                  onChange={(e) => setLat(e.target.value)}
                />
              </label>
              <label className="block">
                <span className="text-primary text-lg">Longitude</span>
                <input
                  type="text"
                  className="p-3 border border-secondary rounded-md focus:outline-secondary focus:ring-primary focus:border-primary mt-1 block w-full"
                  value={lng}
                  onChange={(e) => setLng(e.target.value)}
                />
              </label>
              <button
                onClick={handleSaveCoordinates}
                className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-tertiary"
              >
                Save Coordinates
              </button>
            </div>
          </section>
          <div className="h-96 w-full">
            {mapPosition ? (
              <MapContainer
                center={mapPosition}
                zoom={13}
                style={{ height: "100%", width: "100%" }}
                className="z-0 rounded-lg"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={mapPosition} icon={markerIcon}>
                  <Popup>Project Location</Popup>
                </Marker>
                <MapUpdater mapPosition={mapPosition} />{" "}
                {/* Component to handle map updates */}
              </MapContainer>
            ) : (
              <div>Loading map...</div>
            )}
          </div>
        </section>
        <div className="flex justify-between">
          <button
            onClick={prevStep}
            className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-tertiary"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-tertiary"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectFormStep6;

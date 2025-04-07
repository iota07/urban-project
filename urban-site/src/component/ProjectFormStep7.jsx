import React, { useState, useEffect, useContext } from "react";
import CadViewer from "./CadViewer";
import { BACKEND_URL } from "../utils/config";
import axios from "axios";
import UserContext from "../context/UserContext";

const ProjectFormStep7 = ({ prevStep, nextStep, formData }) => {
  const { userData } = useContext(UserContext);
  const [buildingFileUrl, setBuildingFileUrl] = useState(null);
  const [surroundingsFileUrl, setSurroundingsFileUrl] = useState(null);

  useEffect(() => {
    if (formData.buildingFile) {
      setBuildingFileUrl(URL.createObjectURL(formData.buildingFile.file));
    }
    if (formData.surroundingsFile) {
      setSurroundingsFileUrl(
        URL.createObjectURL(formData.surroundingsFile.file)
      );
    }
  }, [formData]);

  const handleConfirm = async () => {
    if (!userData || !userData.id) {
      console.error("User data is not available.");
      return;
    }

    const formattedLatitude = parseFloat(formData.lat).toFixed(6);
    const formattedLongitude = parseFloat(formData.lng).toFixed(6);

    const formDataToSend = new FormData();
    formDataToSend.append("user", userData.id);
    formDataToSend.append("project_name", formData.title);
    formDataToSend.append("analysis_type", formData.analysisType);
    formDataToSend.append("analysis_option", formData.analysisOption);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("latitude", formattedLatitude);
    formDataToSend.append("longitude", formattedLongitude);
    formDataToSend.append("collaborators", formData.collaborators);

    if (formData.buildingFile) {
      formDataToSend.append(
        "building_of_interest_stl",
        formData.buildingFile.file
      );
    }
    if (formData.surroundingsFile) {
      formDataToSend.append("surroundings_stl", formData.surroundingsFile.file);
    }

    try {
      const { data } = await axios.post(
        `${BACKEND_URL}/api/projects/`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      console.log("Project created successfully:", data);
      nextStep();
    } catch (error) {
      console.error(
        "Error creating project:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col w-full max-w-md mt-4 p-4 shadow-md rounded-lg mb-24 gap-4  lg:mb-0 sm:max-w-lg lg:max-w-4xl">
        <h2 className="text-2xl text-primary mb-4 sm:my-4">
          Summary of your Project
        </h2>
        <div className="space-y-4 lg:space-y-4">
          <section className="lg:flex lg:gap-56">
            <section className="space-y-4 mb-4">
              <div>
                <h3 className="text-md text-primary font-semibold">
                  Project Title:
                </h3>
                <p className="text-lg text-primary">{formData.title}</p>
              </div>
              <div>
                <h3 className="text-md text-primary font-semibold">
                  Building of interest Filename:
                </h3>
                <p className="text-lg text-primary">
                  {formData.buildingFile
                    ? formData.buildingFile.file.name
                    : "No file uploaded"}
                </p>
              </div>
              <div>
                <h3 className="text-md text-primary font-semibold">
                  Surroundings Filename:
                </h3>
                <p className="text-lg text-primary">
                  {formData.surroundingsFile
                    ? formData.surroundingsFile.file.name
                    : "No file uploaded"}
                </p>
              </div>
            </section>

            <div className="grow lg:-mb-44">
              {buildingFileUrl && surroundingsFileUrl && (
                <CadViewer stlFiles={[buildingFileUrl, surroundingsFileUrl]} />
              )}
            </div>
          </section>

          <div>
            <h3 className="text-md text-primary font-semibold">
              Analysis Type:
            </h3>
            <p className="text-lg text-primary">{formData.analysisType}</p>
          </div>
          <div>
            <h3 className="text-md text-primary font-semibold">
              Analysis Option:
            </h3>
            <p className="text-lg text-primary">{formData.analysisOption}</p>
          </div>
          <div>
            <h3 className="text-md text-primary font-semibold">
              Project Location:
            </h3>
            {formData.address ? (
              <>
                <p className="text-lg text-primary">
                  Address: {formData.address}
                </p>
                <p className="text-lg text-primary">
                  Coordinates: {formData.lat}, {formData.lng}
                </p>
              </>
            ) : (
              <p className="text-lg text-primary">
                Coordinates: {formData.lat}, {formData.lng}
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <button
            onClick={prevStep}
            className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-tertiary"
          >
            Back
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-tertiary"
          >
            Confirm & Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectFormStep7;

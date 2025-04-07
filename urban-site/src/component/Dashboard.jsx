import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIconUrl from "leaflet/dist/images/marker-icon.png";
import markerIconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import markerShadowUrl from "leaflet/dist/images/marker-shadow.png";
import { Doughnut } from "react-chartjs-2";
import useUser from "../hook/useUser";
import TitleH3 from "./TitleH3";
import { Chart, ArcElement, Tooltip, Legend, Title } from "chart.js";
import BurgerNoLogo from "./BurgerNoLogo";
import { GiWindsock } from "react-icons/gi";
import { MdOutlineWindPower } from "react-icons/md";
import { LiaThermometerHalfSolid } from "react-icons/lia";
import { LuWind } from "react-icons/lu";
import CategoryTitle from "./CategoryTitle";

Chart.register(ArcElement, Tooltip, Legend, Title);

// Fix marker icon issue with Leaflet in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIconRetinaUrl,
  iconUrl: markerIconUrl,
  shadowUrl: markerShadowUrl,
});

// Dummy data for the chart and map
const projectData = {
  total: 25,
  windComfort: 6,
  windEnergy: 8,
  thermalComfort: 4,
  airQuality: 7,
};

const mapData = [
  { id: 1, name: "Project 1", lat: 51.505, lng: -0.09 },
  { id: 2, name: "Project 2", lat: 51.515, lng: -0.1 },
  { id: 3, name: "Project 3", lat: 51.525, lng: -0.11 },
];

const Dashboard = () => {
  const { userData } = useUser();
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const chartRef = useRef(null);

  // Chart.js data and options for Pie chart
  const chartData = {
    responsive: true,
    labels: ["Wind Comfort", "Wind Energy", "Thermal Comfort", "Air Quality"],
    datasets: [
      {
        label: "Number of Projects",
        data: [
          projectData.windComfort,
          projectData.windEnergy,
          projectData.thermalComfort,
          projectData.airQuality,
        ],
        backgroundColor: [
          "rgba(41,192,231, 0.9)",
          "rgba(173,242,156, 0.9)",
          "rgba(255,135,103, 0.9)",
          "rgba(255,231,122, 0.9)",
        ],
        borderColor: [
          "rgba(41,192,231, 1)",
          "rgba(173,242,156, 1)",
          "rgba(255,135,103, 1)",
          "rgba(255,231,122, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Calculate font size based on window width
  const getFontSize = () => {
    if (windowSize < 640) return 14;
    if (windowSize < 768) return 14;
    if (windowSize < 1024) return 18;
    return 18;
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: {
          usePointStyle: true,
          font: {
            size: getFontSize(),
          },
          fontFamily: "Jost",
          padding: 20,
          color: "#2F5265",
        },
      },
    },
  };

  // Window resize effect
  useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Chart resize effect
  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = chartRef.current.chartInstance;
      if (chartInstance && chartInstance.resize) {
        chartInstance.resize();
      }
    }
  }, [windowSize]);

  return (
    <>
      <section className="grow lg:flex">
        <div className="p-4 bg-backg h-full lg:flex lg:flex-col lg:min-w-128 lg:w-2/5">
          <BurgerNoLogo />
          <CategoryTitle title="Dashboard" />
          <section className="lg:hidden">
            <TitleH3 title={`Welcome ${userData ? userData.name : "Guest"}`} />
          </section>
          <h2 className="text-2xl mb-2 text-primary md:text-4xl md:pb-2 text-nowrap lg:text-3xl lg:pb-5">
            Projects by Category
          </h2>
          <div className="mb-6 text-primary grid grid-flow-row border-2 border-secondary grid-cols-4 rounded-lg bg-backg lg:border-0 lg:grid lg:grid-cols-2 lg:gap-4 lg:h-96 lg:-mt-2 lg:pl-0 lg:w-auto">
            <div className="grid grid-rows-2 px-1 border-r-4 lg:border-2 lg:rounded-lg lg:border border-secondary">
              <p className="text-md text-center md:text-2xl lg:row-start-2 lg:place-content-center">
                Wind Comfort
              </p>
              <div className="py-2 text-4xl text-bold text-center text-wind-comfort md:text-6xl lg:text-4xl lg:text-start lg:px-4 lg:text-primary lg:flex lg:justify-between">
                {projectData.windComfort}
                <p className="text-6xl">
                  <GiWindsock className="hidden lg:block  text-white rounded-full bg-wind-comfort p-2 max-w-10 max-h-10" />
                </p>
              </div>
            </div>
            <div className="grid grid-rows-2 px-1 border-r-4 lg:border-2 lg:rounded-lg lg:border border-secondary">
              <p className="text-md text-center md:text-2xl lg:row-start-2 lg:place-content-center">
                Wind Energy
              </p>
              <p className="py-2 text-4xl text-bold text-center text-wind-energy md:text-6xl lg:text-4xl lg:text-start lg:px-4 lg:text-primary lg:flex lg:justify-between">
                {projectData.windEnergy}
                <MdOutlineWindPower className="hidden lg:block text-6xl text-white rounded-full bg-wind-energy p-2 max-w-10 max-h-10" />
              </p>
            </div>
            <div className="grid grid-rows-2 px-1 border-r-4 lg:border-2 lg:rounded-lg lg:border border-secondary">
              <p className="text-md text-center md:text-2xl lg:row-start-2 lg:place-content-center">
                Thermal Comfort
              </p>
              <p className="py-2 text-4xl text-bold text-center text-thermal-comfort md:text-6xl lg:text-4xl lg:text-start lg:px-4 lg:text-primary lg:flex lg:justify-between">
                {projectData.thermalComfort}
                <LiaThermometerHalfSolid className="hidden lg:block text-6xl text-white rounded-full bg-thermal-comfort p-2 max-w-10 max-h-10" />
              </p>
            </div>
            <div className="grid grid-rows-2 px-1 lg:border-2 lg:rounded-lg lg:border border-secondary">
              <p className="text-md text-center md:text-2xl lg:row-start-2 lg:place-content-center">
                Air Quality
              </p>
              <p className="py-2 text-4xl text-bold text-center text-air-quality md:text-6xl lg:text-4xl lg:text-start lg:px-4 lg:text-primary lg:flex lg:justify-between">
                {projectData.airQuality}
                <LuWind className="hidden lg:block text-6xl text-white rounded-full bg-air-quality p-2 max-w-10 max-h-10" />
              </p>
            </div>
          </div>

          <div className="mb-6 p-4 md:p-6 border border-2 border-secondary rounded-lg flex flex-col justify-center items-center">
            <p className="text-xl text-primary text-center p-0 m-0 md:text-3xl lg:text-2xl">
              Total Projects: {projectData.total}
            </p>
            <div className="pt-4 w-full h-48 md:max-w-screen-sm md:h-56  flex justify-center">
              <Doughnut
                ref={chartRef}
                data={chartData}
                options={chartOptions}
              />
            </div>
          </div>
        </div>

        <section className="rounded-lg max-h-72 md:max-h-128 grow flex flex-col border-2 border-secondary rounded-lg lg:border-0  mb-24 mx-4 lg:min-w-96 lg:mt-24">
          <div className="grid grid-cols-3">
            <section className="hidden lg:block col-start-4 -mt-16 pb-20 pr-4">
              <TitleH3
                title={`Welcome ${userData ? userData.name : "Guest"}`}
              />
            </section>
          </div>
          <MapContainer
            center={[51.505, -0.09]}
            zoom={12}
            style={{ height: "100vh", width: "100%" }}
            className="z-0 rounded-b-xl lg:rounded-lg lg:max-h-full"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {mapData.map((project) => (
              <Marker key={project.id} position={[project.lat, project.lng]}>
                <Popup>{project.name}</Popup>
              </Marker>
            ))}
          </MapContainer>

          <h2 className="order-first lg:order-last text-xl my-4 text-primary text-center md:text-3xl">
            Project Locations
          </h2>
        </section>
      </section>
    </>
  );
};

export default Dashboard;

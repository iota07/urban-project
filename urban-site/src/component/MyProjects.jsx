import React, { useState, useEffect } from "react";
import BurgerNoLogo from "./BurgerNoLogo";

function MyProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      // Replace this URL with your actual endpoint
      const response = await fetch("https://your-api-endpoint/projects");
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <>
        <BurgerNoLogo />
        <div>Loading...</div>
      </>
    );
  if (error)
    return (
      <>
        <BurgerNoLogo />
        <div>Error: {error} </div>
        <div>No project available</div>
      </>
    );

  return (
    <>
      <BurgerNoLogo />
      <div className="projects-gallery">
        {projects.map((project) => (
          <div key={project.id} className="project-thumbnail">
            <img src={project.thumbnailUrl} alt={project.name} />
            <div className="project-info">
              <h3>{project.name}</h3>
              {/* Add more project details here */}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default MyProjects;

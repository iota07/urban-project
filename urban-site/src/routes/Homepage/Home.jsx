import { useEffect, useState } from "react";
import axios from "axios";
import STLWithDataViewer from "../../component/STLWithDataViewer";
import CFD_data_z5 from "../../assets/CFD_data_z5_PolyData.vtp";
import FileUpload from "../../component/FileUpload";

const Home = () => {
  const [username, setUsername] = useState("");
  const [stlFile, setStlFile] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("access_token") === null) {
      window.location.href = "/login";
    } else {
      (async () => {
        try {
          const { data } = await axios.get("http://localhost:8000/home/", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          });
          setUsername(data.username);
        } catch (e) {
          console.log("not auth");
          window.location.href = "/login";
        }
      })();
    }
  }, []);

  const handleFileContentRead = (content) => {
    setStlFile(content); // Update state with the STL file content
  };

  return (
    <>
      <section className="flex flex-col justify-center items-center mt-5">
        <h3 className="text-center">Hi {username}</h3>
        <h3 className="text-center">Welcome to your Homepage</h3>
        <FileUpload onFileContentRead={handleFileContentRead} />
        <STLWithDataViewer stlFile={stlFile} vtpFile={CFD_data_z5} />
      </section>
    </>
  );
};

export default Home;

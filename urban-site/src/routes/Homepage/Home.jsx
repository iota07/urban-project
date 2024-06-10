import { useEffect, useState } from "react";
import axios from "axios";
import CadViewer from "../../component/CadViewer";
import FileUpload from "../../component/FileUpload";
import TitleH3 from "../../component/TitleH3";
import { BACKEND_URL } from "../../utils/config";

const Home = () => {
  const [username, setUsername] = useState("");
  const [stlFile, setStlFile] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("access_token") === null) {
      window.location.href = "/login";
    } else {
      (async () => {
        try {
          const { data } = await axios.get(`${BACKEND_URL}/home/`, {
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
        <TitleH3 title={`Welcome ${username}`} />
        <FileUpload onFileContentRead={handleFileContentRead} />
        <CadViewer stlFile={stlFile} />
      </section>
    </>
  );
};

export default Home;

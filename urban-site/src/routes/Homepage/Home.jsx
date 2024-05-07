import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (localStorage.getItem("access_token") === null) {
      window.location.href = "/login";
    } else {
      (async () => {
        try {
          // Make the GET request
          const { data } = await axios.get("http://localhost:8000/home/", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          });
          setUsername(data.username);
        } catch (e) {
          console.log("not auth");
          // If the request fails, redirect to the login page
          window.location.href = "/login";
        }
      })();
    }
  }, []);

  return (
    <div className="flex flex-col items-center mt-5">
      <h3 className="text-center">Hi {username}</h3>
    </div>
  );
};

export default Home;

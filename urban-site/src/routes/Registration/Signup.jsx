import axios from "axios";
import { useState } from "react";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [organisation, setOrganisation] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const user = {
      email: email,
      username: username,
      password1: password,
      password2: password,
      name: name,
      surname: surname,
      organisation: organisation,
    };

    try {
      await axios.post(
        "http://localhost:8000/dj-rest-auth/registration/",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      window.location.href = "/login";
    } catch (error) {
      console.error("Error while registering:", error);
    }
  };

  return (
    <>
      <form onSubmit={submit}>
        <input
          type="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={surname}
          required
          onChange={(e) => setSurname(e.target.value)}
        />
        <input
          type="text"
          value={organisation}
          required
          onChange={(e) => setOrganisation(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default Registration;

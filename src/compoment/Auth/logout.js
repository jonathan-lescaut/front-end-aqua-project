import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/api/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.status === "success") {
        console.log("Logout successful");
        console.log(data.authorisation.token);

        localStorage.setItem("token", data.authorisation.token);
        // window.location.href = "/";
        navigate("/", { replace: true });
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export default Logout;

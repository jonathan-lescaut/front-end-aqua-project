import React, { useState, useEffect } from "react";
import MenuUser from "../MenuUser";
import axios from "axios";
import MenuWiki from "../MenuWiki";

const Composition = () => {
  const [user, setUser] = useState("");

  const displayUsers = async () => {
    await axios
      .get("http://127.0.0.1:8000/api/current-user", {
        headers: {
          Authorization: "Bearer" + localStorage.token,
        },
      })
      .then((res) => {
        setUser(res.data);
      });
  };

  useEffect(() => {
    displayUsers();
  }, []); // Sans les crochets ça tourne en boucle

  return (
    <>
      <MenuUser />
      <MenuWiki />
    </>
  );
};
export default Composition;

import React, { useState, useEffect } from "react";
import MenuUser from "../MenuUser";
import axios from "axios";
import MenuWiki from "../MenuWiki";

const Composition = () => {
  const [user, setUser] = useState("");

  const displayUsers = async () => {
    try {
      await axios
        .get("http://127.0.0.1:8000/api/current-user", {
          headers: {
            Authorization: "Bearer" + localStorage.token,
          },
        })
        .then((res) => {
          setUser(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    displayUsers();
  }, []); // Sans les crochets ça tourne en boucle

  return (
    <>
      <MenuWiki />
    </>
  );
};
export default Composition;

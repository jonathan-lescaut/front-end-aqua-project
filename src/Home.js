import axios from "axios";
import React, { useState, useEffect } from "react";
import MenuAdmin from "./compoment/Layouts/MenuAdmin";
import MenuUser from "./compoment/Layouts/MenuUser";
import MenuWiki from "./compoment/Layouts/MenuWiki";

const Home = () => {
  // On récupère l'id du user pour remplir la table pivot

  const [user, setUser] = useState([]);
  // const [role, setRole] = useState([]);

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
    <div>
      <MenuUser />
      <MenuAdmin />
      <MenuWiki />
      <div>
        <p>{localStorage.access_token}</p>
      </div>
    </div>
  );
};

export default Home;

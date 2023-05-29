import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MenuUser = () => {
  // On récupère l'id du user pour remplir la table pivot

  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  // const [role, setRole] = useState([]);

  const displayUsers = async () => {
    if (localStorage.token) {
      await axios
        .get("http://127.0.0.1:8000/api/current-user", {
          headers: {
            Authorization: "Bearer" + localStorage.token,
          },
        })
        .then((res) => {
          setUser(res.data);
        });
    }
  };
  const handleLogout = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (data.status === "success") {
        console.log("Logout successful");
        localStorage.removeItem("token");
        // window.location.href = "/login";
        navigate("/login", { replace: true });
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    displayUsers();
  }, []); // Sans les crochets ça tourne en boucle

  return (
    <div className="bandHeader">
      <div className="logoTitle">
        <img
          src={process.env.PUBLIC_URL + "/images/logo.webp"}
          alt="logo"
          srcSet={process.env.PUBLIC_URL + "/images/logo.webp"}
        />
        <div className="titleBand">Aqua Project</div>
      </div>
      <div className="blockBtnHeader">
        <a className="btnLienNavUser" href="/wiki">
          Le Wiki
        </a>

        {user.name ? (
          <div className="btnUserConnect">
            <a className="btnLienNavUser" href={`/projects/user/${user.id}`}>
              Mes aquariums
            </a>

            <button className="btnLienNavUser" onClick={handleLogout}>
              Logout
            </button>
            <div className="btnUser">{user.name.charAt(0).toUpperCase()}</div>
          </div>
        ) : (
          <button className="btnLienNavUser" onClick={() => navigate("/login")}>
            Se connecter
          </button>
        )}
      </div>
    </div>
  );
};
export default MenuUser;

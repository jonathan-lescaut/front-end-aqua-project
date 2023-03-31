import React, { useState, useEffect } from "react";
import MenuUser from "../MenuUser";
import StartInstruction from "./StartInstruction";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { useParams } from "react-router-dom";

const Start = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedButtons, setSelectedButtons] = useState([]);
  const [selectedButtonsCuve, setSelectedButtonsCuve] = useState([]);

  const [title_project, setTitleProject] = useState("");
  const [start_project, setStartProject] = useState("");
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
  const handleMouseOver = (id) => {
    setHoveredId(id);
  };

  const handleClick = (event) => {
    const choices =
      event.target.parentElement.parentElement.querySelectorAll(".choixCuve");
    choices.forEach((choice) => {
      if (choice !== event.target) {
        choice.classList.remove("selected");
      }
    });
    event.target.classList.add("selected");
    setSelectedButtons((prevSelectedButtons) => [
      ...prevSelectedButtons,
      event.target.id,
    ]);
    const newSelectedButtonsCuve = [];
    const choixCuveElements = document.querySelectorAll(".choixCuve");
    choixCuveElements.forEach((element) => {
      if (element.classList.contains("selected")) {
        newSelectedButtonsCuve.push(element.id);
      }
    });
    setSelectedButtonsCuve(newSelectedButtonsCuve);
  };

  useEffect(() => {
    if (
      selectedButtonsCuve.length > 1 &&
      title_project &&
      start_project &&
      user
    ) {
      const data = {
        material_id: selectedButtonsCuve[0],
        title_project: title_project,
        start_project: start_project,
        user_id: user.id,
      };
      confirmAlert({
        title: "Confirm to submit",
        message: "Are you sure to do this.",
        buttons: [
          {
            label: "Yes",
            onClick: () =>
              axios
                .post(`http://127.0.0.1:8000/api/project/`, data)
                .then((response) => {
                  console.log(response.data.data.id);
                  window.location =
                    "/projects/user/composition/project/" +
                    response.data.data.id;
                })
                .catch((error) => {
                  console.error(error);
                }),
          },
          {
            label: "No",
            onClick: () =>
              document.querySelectorAll(".selected").forEach((btn) => {
                btn.classList.remove("selected");
              }),
          },
        ],
      });
    }
  }, [selectedButtonsCuve, title_project, start_project, user]);

  useEffect(() => {
    displayUsers();
  }, []); // Sans les crochets ça tourne en boucle

  return (
    <>
      <MenuUser />
      <div className="headerStart">
        On commence à composer notre projet d'aquarium, étape par étape,
        consulte le wiki si tu es perdu
      </div>
      <div className="formAddProject">
        <div className="titleAddProject">
          <div>
            <span>Project </span>
            <input
              defaultValue={title_project}
              type="text"
              name="title_project"
              id="title_project"
              onChange={(e) => setTitleProject(e.target.value)}
            />
            <input value={user} type="hidden" name="user_id" id="user_id" />
          </div>
        </div>
        <div className="titleAddProject">
          <div>
            <span>Date de début </span>
            <input
              defaultValue={start_project}
              type="text"
              name="start_project"
              id="start_project"
              onChange={(e) => setStartProject(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="blocStartComplete">
        <div className="blocStartLeft">
          <div className="blocStart">
            <div className="bodyBlocStart">
              <div className="BlocChoixCuve">
                <div className="titreChoixCuve">Type de cuve</div>
                <div className="ChoixTypeCuve">
                  <div className="blocBtnFirst">
                    <button
                      id="10"
                      className="choixCuve btn btn-light"
                      onMouseEnter={(event) => handleMouseOver("10")}
                      onMouseLeave={() => handleMouseOver(null)}
                      onClick={handleClick}
                    >
                      Kit d'aquarium
                    </button>
                    <button
                      id="11"
                      className="choixCuve btn btn-light"
                      onMouseEnter={(event) => handleMouseOver("11")}
                      onClick={handleClick}
                    >
                      Avec meuble
                    </button>
                  </div>
                  <div className="blocBtnFirst">
                    <button
                      id="12"
                      className="choixCuve btn btn-light"
                      onMouseEnter={(event) => handleMouseOver("12")}
                      onClick={handleClick}
                    >
                      Nano
                    </button>
                    <button
                      id="13"
                      className="choixCuve btn btn-light"
                      onMouseEnter={(event) => handleMouseOver("13")}
                      onClick={handleClick}
                    >
                      Cuve Seule
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="blocStart">
            <div className="bodyBlocStart">
              <div className="BlocChoixCuve">
                <div className="titreChoixCuve titleTwo">
                  Littrage de la cuve
                </div>
                <div className="ChoixTypeCuve">
                  <div className="blocBtnFirst">
                    <button
                      id="littrage1"
                      className="choixCuve btn btn-light"
                      onMouseEnter={(event) => handleMouseOver("littrage1")}
                      onClick={handleClick}
                    >
                      12 L
                    </button>
                    <button
                      id="littrage2"
                      className="choixCuve btn btn-light"
                      onMouseEnter={(event) => handleMouseOver("littrage2")}
                      onClick={handleClick}
                    >
                      20 L
                    </button>
                  </div>
                  <div className="blocBtnFirst">
                    <button
                      id="littrage3"
                      className="choixCuve btn btn-light"
                      onMouseEnter={(event) => handleMouseOver("littrage3")}
                      onClick={handleClick}
                    >
                      54 L
                    </button>
                    <button
                      id="littrage4"
                      className="choixCuve btn btn-light"
                      onMouseEnter={(event) => handleMouseOver("littrage4")}
                      onClick={handleClick}
                    >
                      112 L
                    </button>
                  </div>
                  <div className="blocBtnFirst">
                    <button
                      id="littrage5"
                      className="choixCuve btn btn-light"
                      onMouseEnter={(event) => handleMouseOver("littrage5")}
                      onClick={handleClick}
                    >
                      160 L
                    </button>
                    <button
                      id="littrage6"
                      className="choixCuve btn btn-light"
                      onMouseEnter={(event) => handleMouseOver("littrage6")}
                      onClick={handleClick}
                    >
                      240 L
                    </button>
                  </div>
                  <div className="blocBtnFirst">
                    <button
                      id="littrage7"
                      className="choixCuve btn btn-light"
                      onMouseEnter={(event) => handleMouseOver("littrage7")}
                      onClick={handleClick}
                    >
                      450 L
                    </button>
                    <button
                      id="littrage8"
                      className="choixCuve btn btn-light"
                      onMouseEnter={(event) => handleMouseOver("littrage8")}
                      onClick={handleClick}
                    >
                      720 L
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <StartInstruction
          hoveredId={hoveredId}
          handleMouseOver={handleMouseOver}
        />
      </div>
    </>
  );
};
export default Start;

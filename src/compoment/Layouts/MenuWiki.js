import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MenuWiki = () => {
  const navigate = useNavigate();
  const [categorie_decorations, setCategorieDecorations] = useState([]);
  const [categorie_livings, setCategorieLivings] = useState([]);
  const [categorie_materials, setCategorieMaterials] = useState([]);
  const [activeButton, setActiveButton] = useState(null);

  //Méthode pour récupérer les caté deco
  const getCategorieDecorations = async () => {
    await axios
      .get("http://127.0.0.1:8000/api/categorie_decoration")
      .then((res) => {
        setCategorieDecorations(res.data);
      });
  };
  //Méthode pour récupérer les caté deco
  const getCategorieLivings = async () => {
    await axios
      .get("http://127.0.0.1:8000/api/categorie_living")
      .then((res) => {
        setCategorieLivings(res.data);
      });
  };
  //Méthode pour récupérer les caté deco
  const getCategorieMaterials = async () => {
    await axios
      .get("http://127.0.0.1:8000/api/categorie_material")
      .then((res) => {
        setCategorieMaterials(res.data);
      });
  };
  const handleClick = (event) => {
    const choices =
      event.target.parentElement.parentElement.querySelectorAll(".boxWiki");
    choices.forEach((choice) => {
      if (choice === event.target) {
        setActiveButton(choice.id);
      }
    });
    // const inputWikiDecoration = document.getElementById("#inputWikiDecoration");
    // const inputWikiMaterial = document.getElementById("#inputWikiMaterial");
    // const inputWikiLiving = document.getElementById("#inputWikiLiving");
  };

  useEffect(() => {
    getCategorieDecorations();
    getCategorieLivings();
    getCategorieMaterials();
  }, []);
  return (
    <>
      <div className="boxNav">
        <a
          id="WikiDecorations"
          className="boxWiki boxWikiLiving"
          href="#"
          onClick={handleClick}
        >
          Décorations
        </a>
        <a
          id="WikiMaterials"
          className="boxWiki boxWikiMaterial"
          href="#"
          onClick={handleClick}
        >
          Materiaux
        </a>
        <a
          id="WikiLivings"
          className="boxWiki boxWikiDecoration"
          href="#"
          onClick={handleClick}
        >
          Vivants
        </a>
      </div>
      <div
        id="inputWikiDecoration"
        className={`sousMenuWiki sousMenuDecoration ${
          activeButton === "WikiDecorations" ? "show" : "hide"
        }`}
      >
        {categorie_decorations.map((categorie_decoration) => (
          <a
            href="/"
            className="btnSousMenu btnSousMenuDecoration"
            key={categorie_decoration.id}
            value={categorie_decoration.id}
          >
            {categorie_decoration.name_categorie_decoration}
          </a>
        ))}
      </div>
      <div
        id="inputWikiMaterial"
        className={`sousMenuWiki sousMenuMaterial ${
          activeButton === "WikiMaterials" ? "show" : "hide"
        }`}
      >
        {categorie_materials.map((categorie_material) => (
          <a
            href="/"
            className="btnSousMenu btnSousMenuMaterial"
            key={categorie_material.id}
            value={categorie_material.id}
          >
            {categorie_material.name_categorie_material}
          </a>
        ))}
      </div>
      <div
        id="inputWikiLiving"
        className={`sousMenuWiki sousMenuLiving ${
          activeButton === "WikiLivings" ? "show" : "hide"
        }`}
      >
        {categorie_livings.map((categorie_living) => (
          <a
            href="/"
            className="btnSousMenu btnSousMenuLiving"
            key={categorie_living.id}
            value={categorie_living.id}
          >
            {categorie_living.name_categorie_living}
          </a>
        ))}
      </div>
    </>
  );
};
export default MenuWiki;
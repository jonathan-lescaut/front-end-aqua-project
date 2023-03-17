import React, { useState, useEffect } from "react";
import MenuUser from "../MenuUser";
import axios from "axios";
import MenuWiki from "../MenuWiki";
import { useParams } from "react-router-dom";

const ListeProduct = () => {
  const { categorie } = useParams();
  const [products, setProduct] = useState([]);
  // détermine la catégorie en fonction de l'URL
  const typeCategorie = (() => {
    if (window.location.href.includes("categorie_decoration")) {
      return "decoration";
    } else if (window.location.href.includes("categorie_material")) {
      return "material";
    } else if (window.location.href.includes("categorie_living")) {
      return "living";
    } else {
      return null;
    }
  })();

  useEffect(() => {
    getProductCategorie();
  }, [categorie]); // Sans les crochets ça tourne en boucle

  //Méthode pour récupérer les caté deco
  const getProductCategorie = async () => {
    if (typeCategorie) {
      await axios
        .get(
          `http://127.0.0.1:8000/api/${typeCategorie}/categorie/${categorie}`
        )
        .then((res) => {
          setProduct(res.data.data);
          console.log(res.data.data);
        });
    }
  };

  return (
    <>
      <MenuUser />
      <MenuWiki />
      <div className="listeProduct">
        {products.map((product) => (
          <div className="product" key={product.id} value={product.id}>
            {typeCategorie === "decoration" && product.name_decoration}
            {typeCategorie === "material" && product.name_material}
            {typeCategorie === "living" && product.name_living}
          </div>
        ))}
      </div>
    </>
  );
};
export default ListeProduct;

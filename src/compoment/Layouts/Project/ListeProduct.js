import React, { useState, useEffect } from "react";
import MenuUser from "../MenuUser";
import axios from "axios";
import MenuWiki from "../MenuWiki";
import { useParams } from "react-router-dom";
import Living from "../Product/Living";
import Material from "../Product/Material";
import Decoration from "../Product/Decoration";
import WikiVisit from "../Wiki/WikiVisit";

const ListeProduct = (props) => {
  const { categorie } = useParams();
  const [products, setProduct] = useState([]);

  const userToken = props.userToken;
  console.log(userToken);

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
        });
    }
  };
  // Filtrer les produits par catégorie
  const filteredProducts = {
    decoration: products.filter((product) => product.name_decoration),
    material: products.filter((product) => product.name_material),
    living: products.filter((product) => product.name_living),
  };
  console.log(userToken);
  return (
    <>
      {userToken ? <MenuWiki /> : <WikiVisit />}

      <div className="listeProduct">
        {typeCategorie === "living" && (
          <Living products={filteredProducts.living} userToken={userToken} />
        )}
        {typeCategorie === "material" && (
          <Material
            products={filteredProducts.material}
            userToken={userToken}
          />
        )}
        {typeCategorie === "decoration" && (
          <Decoration
            products={filteredProducts.decoration}
            userToken={userToken}
          />
        )}
      </div>
    </>
  );
};
export default ListeProduct;

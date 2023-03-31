import React, { useState, useEffect } from "react";
import axios from "axios";

const Decoration = ({ products }) => {
  return (
    <>
      <div className="blocFicheProduct">
        {/* Utiliser les données de produits ici */}
        {products.map((product) => (
          <div className="ficheProduct" key={product.id}>
            <img
              src={`http://localhost:8000/storage/uploads/${product.picture_decoration}`}
              width="100px"
            />
            <h2>{product.name_decoration}</h2>
            <p>{product.price_decoration}</p>
            <p>{product.description_decoration}</p>
            <a href="#">Ajouter</a>
          </div>
        ))}
      </div>
    </>
  );
};
export default Decoration;

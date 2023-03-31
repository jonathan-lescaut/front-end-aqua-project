import React, { useState, useEffect } from "react";
import axios from "axios";

const Material = ({ products }) => {
  return (
    <>
      <div className="blocFicheProduct">
        {/* Utiliser les données de produits ici */}
        {products.map((product) => (
          <div className="ficheProduct" key={product.id}>
            <img
              src={`http://localhost:8000/storage/uploads/${product.picture_material}`}
              width="100px"
            />
            <h2>{product.name_material}</h2>
            <p>{product.price_material}</p>
            <p>{product.description_material}</p>
          </div>
        ))}
      </div>
    </>
  );
};
export default Material;

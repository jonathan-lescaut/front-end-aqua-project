import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import InstructionsProject from "../../../../compoment/Layouts/Project/Instructions/InstructionsProject";

const Living = (props) => {
  const { project } = useParams();
  const [projectProducts, setProjectProducts] = useState([]);
  const [categorie_livings, setCategorieLivings] = useState([]);
  const [qty_limit, setQtyLimit] = useState(false);
  const [liter_cuve_after_add, setLiterCuveAfterAdd] = useState(0);
  const [categorie_poissons_id, setCategoriePoissonsId] = useState([]);

  const literCuve = props.liter;
  const literRemaining = props.liter - liter_cuve_after_add;

  const getCategorieCuve = async () => {
    await axios
      .get(`http://127.0.0.1:8000/api/categorie_living`)
      .then((res) => {
        const categories = res.data;
        const poissonsCategory = categories.find(
          (category) => category.name_categorie_living === "Poissons"
        );
        setCategoriePoissonsId(poissonsCategory.id); // Stockez l'ID de la catégorie 'ma cuve'
      });
  };

  const displayProjectProducts = async () => {
    await axios
      .get(`http://127.0.0.1:8000/api/project/living/${project}`)
      .then((res) => {
        let dataLiving = res.data.data.livings;
        setProjectProducts(dataLiving);
        if (dataLiving.length > 0) {
          const literProduct = dataLiving
            .filter(
              (living) => living.categorie_living_id === categorie_poissons_id
            )
            .map((living) => {
              return (
                living.living_quantity * (living.liter_min / living.number_max)
              );
            });
          // let literProduct =
          //   dataLiving.living_quantity *
          //   (dataLiving.liter_min / dataLiving.number_max);
          const sumLiterAddProduct = literProduct.reduce(
            (acc, val) => acc + val,
            0
          );
          setLiterCuveAfterAdd(sumLiterAddProduct);
        }
      });
  };

  //Méthode pour récupérer les caté deco
  const getCategories = async () => {
    await axios
      .get(`http://127.0.0.1:8000/api/categorie_living`)
      .then((res) => {
        const categories = res.data;
        setCategorieLivings(categories);
      });
  };
  const updateProductQuantity = async (productId, newQuantity) => {
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/project/${project}/living/${productId}/quantity?living_quantity=${newQuantity}`
      );
      displayProjectProducts();
    } catch (error) {
      console.log(error);
    }
  };
  const deleteProduct = async (productId, categorie_living) => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/project/${project}/living/${productId}`
      );
      displayProjectProducts();
      document.getElementById(categorie_living).classList.remove("hiddenCat");
    } catch (error) {
      console.log(error);
    }
  };
  const handleDecreaseQty = (
    productId,
    currentQty,
    qtyMin,
    categorie_living
  ) => {
    if (parseInt(currentQty) > 1 && parseInt(qtyMin) < parseInt(currentQty)) {
      const newQty = parseInt(currentQty) - 1;
      updateProductQuantity(productId, newQty);
      let btnAjout = document.getElementById(
        categorie_living.name_categorie_living
      );
      btnAjout.classList.remove("hiddenCatQty");
      setQtyLimit(false);
    }
  };
  const handleIncreaseQty = (
    productId,
    currentQty,
    qtyLimit,
    categorie_living
  ) => {
    console.log(categorie_living);
    if (
      (parseInt(qtyLimit) > parseInt(currentQty) && literRemaining > 0) ||
      categorie_living.id !== categorie_poissons_id
    ) {
      const newQty = parseInt(currentQty) + 1;
      updateProductQuantity(productId, newQty);
    }
    if (
      (parseInt(qtyLimit - 1) === parseInt(currentQty) ||
        literRemaining <= 0) &&
      categorie_living.id === categorie_poissons_id
    ) {
      setQtyLimit(true);
      let btnAjout = document.getElementById(
        categorie_living.name_categorie_living
      );
      btnAjout.classList.add("hiddenCatQty");
    }
  };

  function handleClick() {
    if (localStorage.getItem("onglet") !== "living") {
      localStorage.removeItem("onglet");
    }
    localStorage.setItem("onglet", "living");
  }

  useEffect(() => {
    displayProjectProducts();
    getCategories();
    getCategorieCuve();
    setQtyLimit();
  }, [categorie_poissons_id]); // Sans les crochets ça tourne en boucle
  return (
    <>
      <div className="pageViewProject">
        <div className="addProductPageView">
          <div className="titreCatViewProject literDiv">
            Mon litrage de base : {literCuve}
          </div>
          {categorie_livings.map((categorie_living) => (
            <div key={categorie_living.id}>
              <div className="blocAddView">
                <h2 className="titreCatViewProject">
                  {categorie_living.name_categorie_living}
                </h2>
                <div className="lineJoin"></div>
                <a
                  className={`btnAddProductView`}
                  id={`${categorie_living.name_categorie_living}`}
                  onClick={handleClick}
                  href={
                    "http://localhost:3000/projects/user/composition/projet/" +
                    project +
                    "/categorie_living/" +
                    categorie_living.id
                  }
                >
                  Ajouter
                </a>
              </div>
              {projectProducts
                .filter(
                  (product) =>
                    product.categorie_living_id === categorie_living.id
                )
                .map((product) => (
                  <div className="blocProductView" key={product.id}>
                    <button
                      className="deleteProductView"
                      onClick={() =>
                        deleteProduct(
                          product.id,
                          categorie_living.name_categorie_living
                        )
                      }
                    >
                      X
                    </button>
                    <div className="nameProductViewProject">
                      {product.name_living}
                    </div>
                    {product.unique_living_category === 1
                      ? document.getElementById(
                          categorie_living.name_categorie_living
                        ) &&
                        document
                          .getElementById(
                            categorie_living.name_categorie_living
                          )
                          .classList.add("hiddenCat")
                      : document.getElementById(
                          categorie_living.name_categorie_living
                        ) &&
                        document
                          .getElementById(
                            categorie_living.name_categorie_living
                          )
                          .classList.remove("hiddenCat")}
                    <div className="lienProductWiki">i</div>
                    {product.quantity_editable_living ? (
                      <div className="blocViewQty">
                        <button
                          className="inputAjustQty"
                          onClick={() =>
                            handleDecreaseQty(
                              product.id,
                              product.living_quantity,
                              product.number_min,
                              categorie_living
                            )
                          }
                        >
                          -
                        </button>
                        <div className="qtyProductViewProject">
                          {product.living_quantity}
                        </div>
                        <button
                          className="inputAjustQty"
                          onClick={() =>
                            handleIncreaseQty(
                              product.id,
                              product.living_quantity,
                              Math.round(
                                ((literCuve / product.liter_min) *
                                  product.number_max) /
                                  4
                              ) * product.number_max,
                              categorie_living
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                    ) : null}
                  </div>
                ))}
            </div>
          ))}
        </div>
        <InstructionsProject
          projectProducts={projectProducts}
          literCuve={literCuve}
        />
      </div>
    </>
  );
};
export default Living;

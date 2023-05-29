import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Material = (props) => {
  const { project } = useParams();
  const [projectProducts, setProjectProducts] = useState([]);
  const [categorie_materials, setCategorieMaterials] = useState([]);
  const [categorie_included_kit, setCategorieIncludedKit] = useState([]);
  const categorieMaCuveId = props.categorie_ma_cuve_id;

  useEffect(() => {
    displayProjectProducts();
    getCategories();
  }, [categorieMaCuveId]);

  useEffect(() => {
    setCategorieIncludedKit();
    categorieIncludedKit(projectProducts);
  }, [projectProducts]);

  function handleClick() {
    if (localStorage.getItem("onglet") !== "material") {
      localStorage.removeItem("onglet");
    }
    localStorage.setItem("onglet", "material");
  }

  const displayProjectProducts = async () => {
    await axios
      .get(`http://127.0.0.1:8000/api/project/material/${project}`)
      .then((res) => {
        let materials = res.data.data.materials;
        setProjectProducts(materials);
        console.log(materials);
        if (materials.length > 0) {
          const literProduct = materials
            .filter(
              (material) => material.categorie_material_id === categorieMaCuveId
            )
            .map((material) => {
              if (material.name_material) {
                document.getElementById("Ma cuve").classList.add("hiddenCat");
              } else {
                document
                  .getElementById("Ma cuve")
                  .classList.remove("hiddenCat");
              }
            });
        }
      });
  };
  //Méthode pour récupérer les caté deco
  const getCategories = async () => {
    await axios
      .get(`http://127.0.0.1:8000/api/categorie_material`)
      .then((res) => {
        setCategorieMaterials(res.data);
      });
  };

  const updateProductQuantity = async (productId, newQuantity) => {
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/project/${project}/material/${productId}/quantity?material_quantity=${newQuantity}`
      );
      displayProjectProducts();
    } catch (error) {
      console.log(error);
    }
  };
  const deleteProduct = async (productId) => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/project/${project}/material/${productId}`
      );
      displayProjectProducts();
    } catch (error) {
      console.log(error);
    }
  };
  const handleDecreaseQty = (productId, currentQty) => {
    if (currentQty > 1) {
      const newQty = parseInt(currentQty) - 1;
      updateProductQuantity(productId, newQty);
    }
  };
  const handleIncreaseQty = (productId, currentQty) => {
    const newQty = parseInt(currentQty) + 1;
    updateProductQuantity(productId, newQty);
  };

  const categorieIncludedKit = () => {
    console.log(projectProducts);
    let tabProduct = projectProducts;
    const includedKits = tabProduct
      .map((product) => JSON.parse(product.content_kit))
      .filter((kit) => kit.length > 0);
    setCategorieIncludedKit(includedKits[0]);
  };

  return (
    <>
      {categorie_included_kit && categorie_included_kit.length ? (
        <div className="pageViewProject">
          <div className="addProductPageView">
            {categorie_materials
              .filter(
                (categorie_material) =>
                  !categorie_included_kit.includes(
                    categorie_material.id.toString()
                  )
              )
              .map((categorie_material) => (
                <div key={categorie_material.id}>
                  <div className="blocAddView">
                    <h2 className="titreCatViewProject">
                      {categorie_material.name_categorie_material}
                    </h2>
                    <div className="lineJoin"></div>
                    <a
                      className="btnAddProductView"
                      id={categorie_material.name_categorie_material}
                      onClick={handleClick}
                      href={
                        "http://localhost:3000/projects/user/composition/projet/" +
                        project +
                        "/categorie_material/" +
                        categorie_material.id
                      }
                    >
                      Ajouter
                    </a>
                  </div>

                  {projectProducts
                    .filter(
                      (product) =>
                        product.categorie_material_id === categorie_material.id
                    )
                    .map((product) => (
                      <div className="blocProductView" key={product.id}>
                        <button
                          className="deleteProductView"
                          onClick={() => deleteProduct(product.id)}
                        >
                          X
                        </button>
                        <div className="nameProductViewProject">
                          {product.name_material}
                        </div>
                        <div className="lienProductWiki">i</div>
                        {product.quantity_editable_material ? (
                          <div className="blocViewQty">
                            <button
                              className="inputAjustQty"
                              onClick={() =>
                                handleDecreaseQty(
                                  product.id,
                                  product.material_quantity
                                )
                              }
                            >
                              -
                            </button>
                            <div className="qtyProductViewProject">
                              {product.material_quantity}
                            </div>
                            <button
                              className="inputAjustQty"
                              onClick={() =>
                                handleIncreaseQty(
                                  product.id,
                                  product.material_quantity
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
        </div>
      ) : (
        <div className="pageViewProject">
          <div className="addProductPageView">
            {categorie_materials.map((categorie_material) => (
              <div key={categorie_material.id}>
                <div className="blocAddView">
                  <h2 className="titreCatViewProject">
                    {categorie_material.name_categorie_material}
                  </h2>
                  <div className="lineJoin"></div>
                  <a
                    className="btnAddProductView"
                    id={categorie_material.name_categorie_material}
                    href={
                      "http://localhost:3000/projects/user/composition/projet/" +
                      project +
                      "/categorie_material/" +
                      categorie_material.id
                    }
                  >
                    Ajouter
                  </a>
                </div>

                {projectProducts
                  .filter(
                    (product) =>
                      product.categorie_material_id === categorie_material.id
                  )
                  .map((product) => (
                    <div className="blocProductView" key={product.id}>
                      <button
                        className="deleteProductView"
                        onClick={() => deleteProduct(product.id)}
                      >
                        X
                      </button>
                      <div className="nameProductViewProject">
                        {product.name_material}
                      </div>
                      <div className="lienProductWiki">i</div>
                      {product.quantity_editable_material ? (
                        <div className="blocViewQty">
                          <button
                            className="inputAjustQty"
                            onClick={() =>
                              handleDecreaseQty(
                                product.id,
                                product.material_quantity
                              )
                            }
                          >
                            -
                          </button>
                          <div className="qtyProductViewProject">
                            {product.material_quantity}
                          </div>
                          <button
                            className="inputAjustQty"
                            onClick={() =>
                              handleIncreaseQty(
                                product.id,
                                product.material_quantity
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
        </div>
      )}
    </>
  );
};
export default Material;

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MenuAdmin from "../../../compoment/Layouts/MenuAdmin";
import MenuUser from "../../../compoment/Layouts/MenuUser";

const ProjectView = () => {
  const { project } = useParams();
  const [selectedProductType, setSelectedProductType] = useState("living");

  const [projectProducts, setProjectProducts] = useState([]);
  const [categorie_livings, setCategorieLivings] = useState([]);
  const [categorie_materials, setCategorieMaterials] = useState([]);
  const [categorie_decorations, setCategorieDecorations] = useState([]);

  console.log(selectedProductType);
  let type = "living"; // Valeur par défaut

  if (selectedProductType === "material") {
    type = "material";
  } else if (selectedProductType === "decoration") {
    type = "decoration";
  }
  const displayProjectProducts = async () => {
    await axios
      .get(`http://127.0.0.1:8000/api/project/${type}/${project}`)
      .then((res) => {
        setProjectProducts(res.data.data.livings);
      });
  };
  //Méthode pour récupérer les caté deco
  const getCategorieLivings = async () => {
    await axios
      .get(`http://127.0.0.1:8000/api/categorie_${type}`)
      .then((res) => {
        setCategorieLivings(res.data);
      });
  };

  const updateProductQuantity = async (productId, newQuantity) => {
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/project/${project}/${type}/${productId}/quantity?${type}_quantity=${newQuantity}`
      );
      displayProjectProducts();
    } catch (error) {
      console.log(error);
    }
  };
  const deleteProduct = async (productId) => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/project/${project}/${type}/${productId}`
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

  useEffect(() => {
    displayProjectProducts();
    getCategorieLivings();
  }, []); // Sans les crochets ça tourne en boucle

  return (
    <>
      <MenuUser />
      <MenuAdmin />
      <div className="pageViewProject">
        <div className="addProductPageView">
          <h1 className="titleViewProject">La population</h1>
          {categorie_livings.map((categorie_living) => (
            <div key={categorie_living.id}>
              <div className="blocAddView">
                <h2 className="titreCatViewProject">
                  {categorie_living.name_categorie_living}
                </h2>
                <a
                  className="btnAddProductView"
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
                      onClick={() => deleteProduct(product.id)}
                    >
                      X
                    </button>
                    <div className="nameProductViewProject">
                      {product.name_living}
                    </div>
                    <div className="lienProductWiki">i</div>
                    <div className="blocViewQty">
                      <button
                        className="inputAjustQty"
                        onClick={() =>
                          handleDecreaseQty(product.id, product.living_quantity)
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
                          handleIncreaseQty(product.id, product.living_quantity)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>
        <div className="blocRightView">
          <div className="instructionViewProject"></div>
          {selectedProductType === "living" ? (
            <button onClick={() => setSelectedProductType("material")}>
              Matériels
            </button>
          ) : (
            ""
          )}
          {selectedProductType === "material" ? (
            <button onClick={() => setSelectedProductType("decoration")}>
              Décorations
            </button>
          ) : (
            ""
          )}
          {selectedProductType === "decoration" ? (
            <button onClick={() => setSelectedProductType("living")}>
              Vivants
            </button>
          ) : (
            ""
          )}
          {/* <button className="btnSuiteView">Suite</button> */}
        </div>
      </div>
    </>
  );
};
export default ProjectView;

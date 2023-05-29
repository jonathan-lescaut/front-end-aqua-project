import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Decoration = () => {
  const { project } = useParams();
  const [projectProducts, setProjectProducts] = useState([]);
  const [categorie_decorations, setCategorieDecorations] = useState([]);

  function handleClick() {
    if (localStorage.getItem("onglet") !== "decoration") {
      localStorage.removeItem("onglet");
    }
    const onglet = "decoration";
    localStorage.setItem("onglet", onglet);
  }

  const displayProjectProducts = async () => {
    await axios
      .get(`http://127.0.0.1:8000/api/project/decoration/${project}`)
      .then((res) => {
        setProjectProducts(res.data.data.decorations);
      });
  };
  //Méthode pour récupérer les caté deco
  const getCategories = async () => {
    await axios
      .get(`http://127.0.0.1:8000/api/categorie_decoration`)
      .then((res) => {
        setCategorieDecorations(res.data);
      });
  };

  const updateProductQuantity = async (productId, newQuantity) => {
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/project/${project}/decoration/${productId}/quantity?decoration_quantity=${newQuantity}`
      );
      displayProjectProducts();
    } catch (error) {
      console.log(error);
    }
  };
  const deleteProduct = async (productId) => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/project/${project}/decoration/${productId}`
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
    getCategories();
  }, []); // Sans les crochets ça tourne en boucle
  return (
    <>
      <div className="pageViewProject">
        <div className="addProductPageView">
          {categorie_decorations.map((categorie_decoration) => (
            <div key={categorie_decoration.id}>
              <div className="blocAddView">
                <h2 className="titreCatViewProject">
                  {categorie_decoration.name_categorie_decoration}
                </h2>
                <div className="lineJoin"></div>
                <a
                  className="btnAddProductView"
                  onClick={handleClick}
                  href={
                    "http://localhost:3000/projects/user/composition/projet/" +
                    project +
                    "/categorie_decoration/" +
                    categorie_decoration.id
                  }
                >
                  Ajouter
                </a>
              </div>

              {projectProducts
                .filter(
                  (product) =>
                    product.categorie_decoration_id === categorie_decoration.id
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
                      {product.name_decoration}
                    </div>
                    <div className="lienProductWiki">i</div>
                    {product.quantity_editable_decoration ? (
                      <div className="blocViewQty">
                        <button
                          className="inputAjustQty"
                          onClick={() =>
                            handleDecreaseQty(
                              product.id,
                              product.decoration_quantity
                            )
                          }
                        >
                          -
                        </button>
                        <div className="qtyProductViewProject">
                          {product.decoration_quantity}
                        </div>
                        <button
                          className="inputAjustQty"
                          onClick={() =>
                            handleIncreaseQty(
                              product.id,
                              product.decoration_quantity
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
      ;
    </>
  );
};
export default Decoration;

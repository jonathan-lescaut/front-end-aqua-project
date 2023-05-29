import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Living = ({ products, userToken }) => {
  const { project } = useParams();
  const [categorie_ma_cuve_id, setCategorieMaCuveId] = useState([]);
  const [product_in_project, setNbProductInProject] = useState(false);
  const [liter, setLiter] = useState([]);
  const navigate = useNavigate();

  const verifyProjectInUser = async () => {
    const response = await axios.get(
      `http://localhost:8000/api/project/user/${userToken}`
    );
    const projects = response.data;
    const projectExists = projects.some((p) => p.id === parseInt(project));
    if (!projectExists) {
      navigate("/");
    }
  };
  const handleIntegrate = async (id, qty) => {
    // Envoyer la requête PUT à l'API
    const urlAdd = `http://127.0.0.1:8000/api/project/${project}?&living_id[]=${id}`;
    await axios.put(urlAdd, null, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    });

    const urlQty = `http://127.0.0.1:8000/api/project/${project}/living/${id}/quantity?living_quantity=${qty}`;
    await axios.put(urlQty);
    navigate(`/project/view/${project}`);
  };
  const displayProjectProducts = async () => {
    await axios
      .get(`http://127.0.0.1:8000/api/project/living/${project}`)
      .then((res) => {
        const uniqueLivingCategoryOnes = res.data.data.livings;
        if (uniqueLivingCategoryOnes.length > 0) {
          setNbProductInProject(true);
        }
      });
  };

  const cuveLiter = async () => {
    await axios
      .get(`http://127.0.0.1:8000/api/project/material/${project}`)
      .then((res) => {
        const products = res.data.data.materials;
        const cuveProducts = products.filter(
          (product) => product.categorie_material_id === categorie_ma_cuve_id
        );
        if (cuveProducts.length > 0) {
          const literCuve = cuveProducts[0].liter;
          setLiter(literCuve);
        }
      });
  };
  //Méthode pour récupérer les caté deco
  const getCategorieCuve = async () => {
    await axios
      .get(`http://127.0.0.1:8000/api/categorie_material`)
      .then((res) => {
        const categories = res.data;
        const maCuveCategory = categories.find(
          (category) => category.name_categorie_material === "Ma cuve"
        );
        setCategorieMaCuveId(maCuveCategory.id); // Stockez l'ID de la catégorie 'ma cuve'
      });
  };

  useEffect(() => {
    cuveLiter();
    getCategorieCuve();
    displayProjectProducts();
    verifyProjectInUser();
  }, [categorie_ma_cuve_id]);
  console.log(project);
  return (
    <>
      <a href={`/project/view/${project}`}>Retour projet</a>
      <div>Mon littrage : {liter}</div>
      <div className="blocFicheProduct">
        {/* Utiliser les données de produits ici */}
        {products
          .filter((product) => {
            if (
              (!product_in_project &&
                product.unique_living_category === 1 &&
                parseInt(liter) >= parseInt(product.liter_min)) ||
              (!product_in_project &&
                product.unique_living_category === 0 &&
                parseInt(liter) >= parseInt(product.liter_min)) ||
              (product_in_project &&
                product.unique_living_category === 0 &&
                parseInt(liter) >= parseInt(product.liter_min))
            ) {
              return true;
            }
            return false;
          })
          .map((product) => (
            <div className="ficheProduct" key={product.id}>
              <img
                src={`http://localhost:8000/storage/uploads/${product.picture_living}`}
                width="100px"
              />
              <h2>{product.name_living}</h2>
              <p className="priceProduct">{product.price_living} €</p>
              <p>{product.liter_min}</p>
              <p className="descriptionFiche">
                {product.description_living.length > 100
                  ? `${product.description_living.substring(0, 100)}...`
                  : product.description_living}
              </p>

              <button
                className="btnLienFiche"
                onClick={() => handleIntegrate(product.id, product.number_min)}
              >
                Intégrer
              </button>
            </div>
          ))}
      </div>
    </>
  );
};

export default Living;

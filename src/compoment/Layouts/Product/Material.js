import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const Material = ({ products }) => {
  const { project } = useParams();
  const navigate = useNavigate();

  const handleIntegrate = async (id) => {
    // Envoyer la requête PUT à l'API
    const url = `http://127.0.0.1:8000/api/project/${project}?&material_id[]=${id}`;
    await axios.put(url, null, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    });
    navigate(`/project/view/${project}`);
  };

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
            <p className="priceProduct">{product.price_material} €</p>
            <p className="descriptionFiche">
              {product.description_material.length > 150
                ? `${product.description_material.substring(0, 150)}...`
                : product.description_material}
            </p>
            <button
              className="btnLienFiche"
              onClick={() => handleIntegrate(product.id)}
            >
              Intégrer
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Material;

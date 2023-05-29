import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const Decoration = ({ products }) => {
  const { project } = useParams();
  const navigate = useNavigate();

  const handleIntegrate = async (id) => {
    // Envoyer la requête PUT à l'API
    const url = `http://127.0.0.1:8000/api/project/${project}?&decoration_id[]=${id}`;
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
              src={`http://localhost:8000/storage/uploads/${product.picture_decoration}`}
              width="100px"
            />
            <h2>{product.name_decoration}</h2>
            <p className="priceProduct">{product.price_decoration} €</p>
            <p className="descriptionFiche">
              {product.description_decoration.length > 100
                ? `${product.description_decoration.substring(0, 100)}...`
                : product.description_decoration}
            </p>
            {localStorage.token ? (
              <button
                className="btnLienFiche"
                onClick={() => handleIntegrate(product.id)}
              >
                Intégrer
              </button>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Decoration;

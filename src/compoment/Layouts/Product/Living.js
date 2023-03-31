import axios from "axios";
import { useParams } from "react-router-dom";

const Living = ({ products }) => {
  const { project } = useParams();
  console.log(project);

  const handleIntegrate = async (id) => {
    // Envoyer la requête PUT à l'API
    const url = `http://127.0.0.1:8000/api/project/${project}?&living_id[]=${id}`;
    console.log(url);
    await axios.put(url);
  };

  return (
    <>
      <div className="blocFicheProduct">
        {/* Utiliser les données de produits ici */}
        {products.map((product) => (
          <div className="ficheProduct" key={product.id}>
            <img
              src={`http://localhost:8000/storage/uploads/${product.picture_living}`}
              width="100px"
            />
            <h2>{product.name_living}</h2>
            <p>{product.price_living}</p>
            <p>{product.description_living}</p>
            <a
              href={`/project/view/${project}`}
              onClick={() => handleIntegrate(product.id)}
            >
              Intégrer
            </a>
          </div>
        ))}
      </div>
    </>
  );
};
export default Living;

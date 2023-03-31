import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MenuAdmin from "../../../compoment/Layouts/MenuAdmin";
import MenuUser from "../../../compoment/Layouts/MenuUser";

const ProjectView = () => {
  const { project } = useParams();
  const [projectProducts, setProjectProducts] = useState([]);
  const [categorie_livings, setCategorieLivings] = useState([]);

  const displayProjectProducts = async () => {
    await axios
      .get(`http://127.0.0.1:8000/api/project/living/${project}`)
      .then((res) => {
        setProjectProducts(res.data.data.livings);
        console.log(res.data.data.livings);
      });
  };
  //Méthode pour récupérer les caté deco
  const getCategorieLivings = async () => {
    await axios
      .get("http://127.0.0.1:8000/api/categorie_living")
      .then((res) => {
        setCategorieLivings(res.data);
        console.log(res.data);
      });
  };

  useEffect(() => {
    displayProjectProducts();
    getCategorieLivings();
  }, []); // Sans les crochets ça tourne en boucle

  return (
    <>
      <MenuUser />
      <MenuAdmin />
      <h1>View project</h1>
      {categorie_livings.map((categorie_living) => (
        <div key={categorie_living.id}>
          <h2>{categorie_living.name_categorie_living}</h2>
          <a
            href={
              "http://localhost:3000/projects/user/composition/projet/" +
              project +
              "/categorie_living/" +
              categorie_living.id
            }
          >
            Ajouter
          </a>

          {projectProducts
            .filter(
              (product) => product.categorie_living_id === categorie_living.id
            )
            .map((product) => (
              <p key={product.id}>{product.name_living}</p>
            ))}
        </div>
      ))}

      {/* {categorie_livings.map((categorie_living) => (
        <p key={categorie_living.id}>
          {categorie_living.name_categorie_living}
        </p>
      ))} */}

      {/* {projectProducts.map((product) => (
        <p key={product.id}>{product.name_living}</p>
      ))} */}
    </>
  );
};
export default ProjectView;

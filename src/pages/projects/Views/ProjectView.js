import axios from "axios";
import { useEffect, useState } from "react";
import MenuAdmin from "../../../compoment/Layouts/MenuAdmin";
import MenuUser from "../../../compoment/Layouts/MenuUser";
import { useNavigate, useParams } from "react-router-dom";
import Decoration from "./Tabs/Decoration";
import Living from "./Tabs/Livings";
import Material from "./Tabs/Material";

const ProjectView = (props) => {
  const { project } = useParams();
  const [selectedProductType, setSelectedProductType] = useState();
  const [categorie_ma_cuve_id, setCategorieMaCuveId] = useState([]);
  const [liter, setLiter] = useState([]);
  const navigate = useNavigate();
  const userToken = props.userToken;

  const verifyProjectUser = async () => {
    const response = await axios.get(
      `http://localhost:8000/api/project/user/${userToken}`
    );
    const projects = response.data;
    const projectExists = projects.some((p) => p.id === parseInt(project));
    if (!projectExists) {
      navigate("/");
    }
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

  useEffect(() => {
    if (localStorage.getItem("onglet")) {
      setSelectedProductType(localStorage.getItem("onglet"));
    } else {
      setSelectedProductType("material");
    }
    cuveLiter();
    getCategorieCuve();
    verifyProjectUser();
  }, [categorie_ma_cuve_id]);
  // console.log(liter);

  return (
    <>
      <MenuUser />
      <MenuAdmin />
      <div className="tabCatProject">
        <div
          className={`tabTitleCatProject ${
            selectedProductType === "material" ? "activeTabProduct" : ""
          }`}
          onClick={() => setSelectedProductType("material")}
        >
          Le matériel
        </div>
        <div
          className={`tabTitleCatProject ${
            selectedProductType === "living" ? "activeTabProduct" : ""
          }`}
          onClick={() => setSelectedProductType("living")}
        >
          La population
        </div>
        <div
          className={`tabTitleCatProject ${
            selectedProductType === "decoration" ? "activeTabProduct" : ""
          }`}
          onClick={() => setSelectedProductType("decoration")}
        >
          La décoration
        </div>
      </div>

      {selectedProductType === "material" && (
        <Material categorie_ma_cuve_id={categorie_ma_cuve_id} />
      )}
      {selectedProductType === "living" && <Living liter={liter} />}
      {selectedProductType === "decoration" && <Decoration />}
    </>
  );
};
export default ProjectView;

import MenuAdmin from "./compoment/Layouts/MenuAdmin";
import WikiVisit from "./compoment/Layouts/Wiki/WikiVisit";

const Home = () => {
  // On récupère l'id du user pour remplir la table pivot
  return (
    <div>
      <MenuAdmin />
      <WikiVisit />
      <div className="blocHome">
        <img className="imgBc" src="images/cuve.png" alt="" />
        <div className="messageAccueil">Composez votre aquarium !</div>
      </div>
    </div>
  );
};

export default Home;

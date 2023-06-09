import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./compoment/Auth/Login";
import Register from "./compoment/Auth/Register";
import Composition from "./compoment/Layouts/Project/Composition";
import ListeProduct from "./compoment/Layouts/Project/ListeProduct";
import Start from "./compoment/Layouts/Project/Start";
import Home from "./Home";
import AddCategorieDecoration from "./pages/categorie_decoration/AddCategorieDecorations";
import CategorieDecoration from "./pages/categorie_decoration/CategorieDecorations";
import EditCategorieDecoration from "./pages/categorie_decoration/EditCategorieDecorations";
import AddCategorieLiving from "./pages/categorie_livings/AddCategorieLivings";
import CategorieLivings from "./pages/categorie_livings/CategorieLivings";
import EditCategorieLiving from "./pages/categorie_livings/EditCategorieLivings";
import AddCategorieMaterial from "./pages/categorie_materials/AddCategorieMaterials";
import CategorieMaterials from "./pages/categorie_materials/CategorieMaterials";
import EditCategorieMaterial from "./pages/categorie_materials/EditCategorieMaterials";
import AddDecoration from "./pages/decorations/AddDecoration";
import Decorations from "./pages/decorations/Decoration";
import EditDecoration from "./pages/decorations/EditDecoration";
import AddLiving from "./pages/livings/AddLiving";
import EditLiving from "./pages/livings/EditLiving";
import Livings from "./pages/livings/Livings";
import AddMaterial from "./pages/materials/AddMaterial";
import EditMaterial from "./pages/materials/EditMaterial";
import Materials from "./pages/materials/Material";
import AddProject from "./pages/projects/AddProject";
import EditProject from "./pages/projects/EditProject";
import Projects from "./pages/projects/Projects";
import ProjectsUser from "./pages/projects/ProjectsUser";
import ProjectView from "./pages/projects/Views/ProjectView";
import EditUser from "./pages/users/EditUser";
import Users from "./pages/users/User";
import jwt_decode from "jwt-decode";
import axios from "axios";
import WikiVisit from "./compoment/Layouts/Wiki/WikiVisit";

function App() {
  const [user, setUser] = useState("");
  const [userToken, setUserToken] = useState("");

  let token = false;
  if (localStorage.getItem("token")) {
    token = localStorage.getItem("token");
  }

  const displayUsers = async () => {
    if (localStorage.token) {
      await axios
        .get("http://127.0.0.1:8000/api/current-user", {
          headers: {
            Authorization: "Bearer" + localStorage.token,
          },
        })
        .then((res) => {
          setUser(res.data);
          const decoded = jwt_decode(token);
          setUserToken(decoded.sub);
        });
    }
  };
  useEffect(() => {
    displayUsers();
  }, []); // Sans les crochets ça tourne en boucle

  return (
    <main className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/wiki" element={<WikiVisit />} />
          <Route
            path="/categorie_living/:categorie"
            element={<ListeProduct />}
          />
          <Route
            path="/categorie_decoration/:categorie"
            element={<ListeProduct />}
          />
          <Route
            path="/categorie_material/:categorie"
            element={<ListeProduct />}
          />

          {token && parseInt(userToken) === parseInt(user.id) ? (
            <>
              <Route path="/projects/" element={<Projects />} />
              <Route
                path="/projects/add"
                element={<AddProject userToken={userToken} />}
              />
              <Route path="/projects/edit/:project" element={<EditProject />} />
              <Route
                path="/projects/user/:user"
                element={<ProjectsUser userToken={userToken} />}
              />
              <Route
                path="/project/view/:project"
                element={<ProjectView userToken={userToken} />}
              />

              <Route path="/projects/user/new" element={<Start />} />
              <Route
                path="/projects/user/composition/project/:project"
                element={<Composition />}
              />
              <Route
                path="/projects/user/composition/projet/:project/categorie_living/:categorie"
                element={<ListeProduct userToken={userToken} />}
              />
              <Route
                path="/projects/user/composition/projet/:project/categorie_decoration/:categorie"
                element={<ListeProduct userToken={userToken} />}
              />
              <Route
                path="/projects/user/composition/projet/:project/categorie_material/:categorie"
                element={<ListeProduct userToken={userToken} />}
              />
              <Route path="/livings/" element={<Livings />} />
              <Route path="/livings/add" element={<AddLiving />} />
              <Route path="/livings/edit/:living" element={<EditLiving />} />
              <Route path="/materials/" element={<Materials />} />
              <Route path="/materials/add" element={<AddMaterial />} />
              <Route
                path="/materials/edit/:material"
                element={<EditMaterial />}
              />
              <Route path="/decorations/" element={<Decorations />} />
              <Route path="/decorations/add" element={<AddDecoration />} />
              <Route
                path="/decorations/edit/:decoration"
                element={<EditDecoration />}
              />
              <Route
                path="/categorie_livings/"
                element={<CategorieLivings />}
              />
              <Route
                path="/categorie_livings/add"
                element={<AddCategorieLiving />}
              />
              <Route
                path="/categorie_livings/edit/:categorie_living"
                element={<EditCategorieLiving />}
              />
              <Route
                path="/categorie_decorations/"
                element={<CategorieDecoration />}
              />
              <Route
                path="/categorie_decorations/add"
                element={<AddCategorieDecoration />}
              />
              <Route
                path="/categorie_decorations/edit/:categorie_decoration"
                element={<EditCategorieDecoration />}
              />
              <Route
                path="/categorie_materials/"
                element={<CategorieMaterials />}
              />
              <Route
                path="/categorie_materials/add"
                element={<AddCategorieMaterial />}
              />
              <Route
                path="/categorie_materials/edit/:categorie_material"
                element={<EditCategorieMaterial />}
              />
              <Route path="/users/" element={<Users />} />
              <Route path="/users/edit/:user" element={<EditUser />} />
            </>
          ) : (
            <Route path="/login" element={<Login />} />
          )}
        </Routes>
      </Router>
    </main>
  );
}

export default App;

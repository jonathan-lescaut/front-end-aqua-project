import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";

import axios from "axios";
import MenuAdmin from "../../compoment/Layouts/MenuAdmin";
import MenuUser from "../../compoment/Layouts/MenuUser";

const CategorieDecoration = () => {
  const [categorie_decoration, setCategorieDecoration] = useState([]);
  useEffect(() => {
    displayCategorieDecoration();
  }, []); // Sans les crochets ça tourne en boucle
  const displayCategorieDecoration = async () => {
    await axios
      .get("http://localhost:8000/api/categorie_decoration")
      .then((res) => {
        setCategorieDecoration(res.data);
      });
  };
  const deleteCategorieLiving = (id) => {
    axios
      .delete(`http://localhost:8000/api/categorie_decoration/${id}`)
      .then(displayCategorieDecoration);
  };
  return (
    <div>
      <MenuUser />
      <MenuAdmin />
      <div>
        <table>
          <thead>
            <tr>
              <th>Titre</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categorie_decoration.map((categorie_decoration) => (
              <tr key={categorie_decoration.id}>
                <td>{categorie_decoration.name_categorie_decoration}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => {
                      deleteCategorieLiving(categorie_decoration.id);
                    }}
                  >
                    Supprimer
                  </Button>
                  <Button
                    variant="secondary"
                    href={`http://localhost:3000/categorie_decorations/edit/${categorie_decoration.id}`}
                  >
                    Editer
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <a href="/categorie_decorations/add">Ajouter</a>
    </div>
  );
};
export default CategorieDecoration;

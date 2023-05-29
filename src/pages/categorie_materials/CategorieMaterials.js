import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";

import axios from "axios";
import MenuAdmin from "../../compoment/Layouts/MenuAdmin";
import MenuUser from "../../compoment/Layouts/MenuUser";

const CategorieMaterials = () => {
  const [categorie_materials, setCategorieMaterials] = useState([]);
  useEffect(() => {
    displayCategorieMaterials();
  }, []); // Sans les crochets ça tourne en boucle
  const displayCategorieMaterials = async () => {
    await axios
      .get("http://localhost:8000/api/categorie_material")
      .then((res) => {
        setCategorieMaterials(res.data);
      });
  };
  const deleteCategorieMaterial = (id) => {
    axios
      .delete(`http://localhost:8000/api/categorie_material/${id}`)
      .then(displayCategorieMaterials);
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
            {categorie_materials.map((categorie_material) => (
              <tr key={categorie_material.id}>
                <td>{categorie_material.name_categorie_material}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => {
                      deleteCategorieMaterial(categorie_material.id);
                    }}
                  >
                    Supprimer
                  </Button>
                  <Button
                    variant="secondary"
                    href={`http://localhost:3000/categorie_materials/edit/${categorie_material.id}`}
                  >
                    Editer
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <a href="/categorie_materials/add">Ajouter</a>
    </div>
  );
};
export default CategorieMaterials;

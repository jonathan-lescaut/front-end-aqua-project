import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";

import axios from "axios";
import MenuAdmin from "../../compoment/Layouts/MenuAdmin";
import MenuUser from "../../compoment/Layouts/MenuUser";

const Materials = () => {
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    displayMaterials();
  }, []); // Sans les crochets ça tourne en boucle
  const displayMaterials = async () => {
    await axios.get("http://localhost:8000/api/material").then((res) => {
      setMaterials(res.data.data);
      console.log(res.data.data);
    });
  };

  const deleteMaterial = (id) => {
    axios
      .delete(`http://localhost:8000/api/material/${id}`)
      .then(displayMaterials);
  };

  return (
    <div>
      <MenuUser />
      <MenuAdmin />
      <div className="container mt-5">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Description</th>
              <th>Prix</th>
              <th>image</th>
              <th>Catégorie</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {materials.map((material) => (
              <tr key={material.id}>
                <td>{material.name_material}</td>
                <td>{material.description_material}</td>
                <td>{material.price_material}</td>
                <td>{material.picture_material}</td>
                <td>{material.name_categorie_material}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => {
                      deleteMaterial(material.id);
                    }}
                  >
                    Supprimer
                  </Button>
                  <Button
                    variant="secondary"
                    href={`http://localhost:3000/materials/edit/${material.id}`}
                  >
                    Editer
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};
export default Materials;

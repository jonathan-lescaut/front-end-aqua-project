import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";

import axios from "axios";
import MenuAdmin from "../../compoment/Layouts/MenuAdmin";
import MenuUser from "../../compoment/Layouts/MenuUser";

const CategorieLivings = () => {
  const [categorie_livings, setCategorieLivings] = useState([]);
  useEffect(() => {
    displayCategorieLivings();
  }, []); // Sans les crochets ça tourne en boucle
  const displayCategorieLivings = async () => {
    await axios
      .get("http://localhost:8000/api/categorie_living")
      .then((res) => {
        setCategorieLivings(res.data);
      });
  };
  const deleteCategorieLiving = (id) => {
    axios
      .delete(`http://localhost:8000/api/categorie_living/${id}`)
      .then(displayCategorieLivings);
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
            {categorie_livings.map((categorie_living) => (
              <tr key={categorie_living.id}>
                <td>{categorie_living.name_categorie_living}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => {
                      deleteCategorieLiving(categorie_living.id);
                    }}
                  >
                    Supprimer
                  </Button>
                  <Button
                    variant="secondary"
                    href={`http://localhost:3000/categorie_livings/edit/${categorie_living.id}`}
                  >
                    Editer
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <a href="/categorie_livings/add">Ajouter</a>
    </div>
  );
};
export default CategorieLivings;

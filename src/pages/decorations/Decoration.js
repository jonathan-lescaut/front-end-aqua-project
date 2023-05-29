import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";

import axios from "axios";
import MenuAdmin from "../../compoment/Layouts/MenuAdmin";
import MenuUser from "../../compoment/Layouts/MenuUser";

const Decorations = () => {
  const [decorations, setDecorations] = useState([]);

  useEffect(() => {
    displayDecorations();
  }, []); // Sans les crochets ça tourne en boucle
  const displayDecorations = async () => {
    await axios.get("http://localhost:8000/api/decoration").then((res) => {
      setDecorations(res.data.data);
    });
  };

  const deleteDecoration = (id) => {
    axios
      .delete(`http://localhost:8000/api/decoration/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(displayDecorations);
  };

  return (
    <div>
      <MenuUser />
      <MenuAdmin />
      <div className="listeAdmin">
        <table>
          <thead>
            <tr className="titleListAdmin">
              <th>Nom</th>
              <th>Description</th>
              <th>Prix</th>
              <th>image</th>
              <th>Quantité</th>
              <th>Catégorie</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {decorations.map((decoration) => (
              <tr key={decoration.id}>
                <td>{decoration.name_decoration}</td>
                <td>{decoration.description_decoration}</td>
                <td>{decoration.price_decoration}</td>
                <td>
                  <img
                    src={`http://localhost:8000/storage/uploads/${decoration.picture_decoration}`}
                    width="100px"
                  />
                </td>
                <td>
                  {decoration.quantity_editable_decoration === 1
                    ? "oui"
                    : "non"}
                </td>

                <td>{decoration.name_categorie_decoration}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => {
                      deleteDecoration(decoration.id);
                    }}
                  >
                    Supprimer
                  </Button>
                  <Button
                    variant="secondary"
                    href={`http://localhost:3000/decorations/edit/${decoration.id}`}
                  >
                    Editer
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Decorations;

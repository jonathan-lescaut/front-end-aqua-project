import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";

import axios from "axios";
import MenuAdmin from "../../compoment/Layouts/MenuAdmin";
import MenuUser from "../../compoment/Layouts/MenuUser";

const Livings = () => {
  const [livings, setLivings] = useState([]);

  useEffect(() => {
    displayLivings();
  }, []); // Sans les crochets ça tourne en boucle
  const displayLivings = async () => {
    await axios.get("http://localhost:8000/api/living").then((res) => {
      setLivings(res.data.data);
    });
  };

  const deleteLiving = (id) => {
    axios.delete(`http://localhost:8000/api/living/${id}`).then(displayLivings);
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
              <th>Image</th>
              <th>Catégorie</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {livings.map((living) => (
              <tr key={living.id}>
                <td>{living.name_living}</td>
                <td>{living.description_living}</td>
                <td>{living.price_living}</td>
                <td>
                  <img
                    src={`http://localhost:8000/storage/uploads/${living.picture_living}`}
                    width="100px"
                  />
                </td>
                <td>{living.name_categorie_living}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => {
                      deleteLiving(living.id);
                    }}
                  >
                    Supprimer
                  </Button>
                  <Button
                    variant="secondary"
                    href={`http://localhost:3000/livings/edit/${living.id}`}
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
export default Livings;

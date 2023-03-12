import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";

import axios from "axios";
import MenuAdmin from "../../compoment/Layouts/MenuAdmin";
import MenuUser from "../../compoment/Layouts/MenuUser";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    displayUsers();
  }, []); // Sans les crochets ça tourne en boucle
  const displayUsers = async () => {
    await axios.get("http://localhost:8000/api/users").then((res) => {
      setUsers(res.data.data);
    });
  };

  const deleteUser = (id) => {
    axios.delete(`http://localhost:8000/api/users/${id}`).then(displayUsers);
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
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.roles}</td>

                <td>
                  <Button
                    variant="danger"
                    onClick={() => {
                      deleteUser(user.id);
                    }}
                  >
                    Supprimer
                  </Button>
                  <Button
                    variant="secondary"
                    href={`http://localhost:3000/users/edit/${user.id}`}
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
export default Users;

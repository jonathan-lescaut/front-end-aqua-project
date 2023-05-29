import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";

import axios from "axios";
import MenuAdmin from "../../compoment/Layouts/MenuAdmin";
import MenuUser from "../../compoment/Layouts/MenuUser";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    displayProjects();
  }, []); // Sans les crochets ça tourne en boucle

  const displayProjects = async () => {
    await axios.get("http://localhost:8000/api/project").then((res) => {
      setProjects(res.data);
    });
  };

  const deleteProject = (id) => {
    axios
      .delete(`http://localhost:8000/api/project/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(displayProjects);
  };

  return (
    <div>
      <MenuUser />
      <MenuAdmin />
      <div className="container mt-5">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Titre</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td>{project.title_project}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => {
                      deleteProject(project.id);
                    }}
                  >
                    Supprimer
                  </Button>
                  <Button
                    variant="secondary"
                    href={`http://localhost:3000/projects/edit/${project.id}`}
                  >
                    Editer
                  </Button>
                  <Button
                    variant="secondary"
                    href={`http://localhost:3000/projects/user/composition/${project.id}`}
                  >
                    Editer le projet
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
export default Projects;

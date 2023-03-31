import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import MenuAdmin from "../../compoment/Layouts/MenuAdmin";
import MenuUser from "../../compoment/Layouts/MenuUser";

const ProjectsUser = () => {
  const { user } = useParams();

  const [projects, setProjects] = useState([]);
  useEffect(() => {
    displayProjects();
  }, []); // Sans les crochets ça tourne en boucle

  const displayProjects = async () => {
    await axios
      .get(`http://localhost:8000/api/project/user/${user}`)
      .then((res) => {
        setProjects(res.data);
        console.log(res);
      });
  };

  const deleteProject = (id) => {
    axios
      .delete(`http://localhost:8000/api/project/${id}`)
      .then(displayProjects);
  };

  return (
    <div>
      <MenuUser />
      <MenuAdmin />
      <a href="/projects/user/new">Créer un nouveau projet</a>

      <div className="container mt-5">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Mes Aquariums</th>
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
                    href={`http://localhost:3000/projects/user/composition/project/${project.id}`}
                  >
                    Editer le projet
                  </Button>
                  <Button
                    variant="secondary"
                    href={`http://localhost:3000/project/view/${project.id}`}
                  >
                    Voir le projet
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
export default ProjectsUser;

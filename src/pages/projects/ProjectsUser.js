import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import MenuAdmin from "../../compoment/Layouts/MenuAdmin";
import MenuUser from "../../compoment/Layouts/MenuUser";

const ProjectsUser = (props) => {
  const { user } = useParams();
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const userToken = props.userToken;

  useEffect(() => {
    displayProjects();
  }, []); // Sans les crochets ça tourne en boucle

  const displayProjects = async () => {
    if (userToken === user) {
      await axios
        .get(`http://localhost:8000/api/project/user/${user}`)
        .then((res) => {
          setProjects(res.data);
        });
    } else {
      navigate("/");
    }
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
      <div className="blocBtnCreateProject">
        <a className="btnCreateProject" href="/projects/add">
          Créer un nouveau projet
        </a>
      </div>
      <div className="allProjectUser">
        <table className="aquaUser">
          <thead>
            <tr>
              <th className="TitleAllProjectUser">Mes Aquariums</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td className="titleProject">{project.title_project}</td>
                <td className="btnAllProject">
                  <a
                    className="btnViewProject"
                    href={`http://localhost:3000/project/view/${project.id}`}
                  >
                    Voir le projet
                  </a>
                  <Button
                    variant="secondary"
                    href={`http://localhost:3000/projects/edit/${project.id}`}
                  >
                    Changer de nom
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => {
                      deleteProject(project.id);
                    }}
                  >
                    Supprimer
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
export default ProjectsUser;

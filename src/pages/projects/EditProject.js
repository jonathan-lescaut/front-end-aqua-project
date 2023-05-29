import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import MenuAdmin from "../../compoment/Layouts/MenuAdmin";
import MenuUser from "../../compoment/Layouts/MenuUser";

const EditProject = () => {
  const { project } = useParams();

  const navigate = useNavigate();
  const [title_project, setTitleProject] = useState("");
  const [start_project, setStartProject] = useState("");

  const [validationError, setValidationError] = useState({});
  useEffect(() => {
    getProject();
  }, []);

  // GET - Récupère les valeurs de la fiche avec l'API
  const getProject = async () => {
    await axios
      .get(`http://localhost:8000/api/project/${project}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data.data.title_project);
        setTitleProject(res.data.title_project);
        setStartProject(res.data.start_project);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Fonction d'ajout de project
  const updateProject = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("_method", "PATCH");
    formData.append("title_project", title_project);
    formData.append("start_project", start_project);
    await axios
      .post(`http://localhost:8000/api/project/${project}`, formData)
      .then(navigate("/projects"))
      .catch(({ response }) => {
        if (response.status === 422) {
          setValidationError(response.data.errors);
        }
      });
  };
  return (
    <div>
      <MenuUser />
      <MenuAdmin />
      <div className="container mt-5">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Modifier un project</h4>
              <hr />
              <div className="form-wrapper">
                {Object.keys(validationError).length > 0 && (
                  <div className="row">
                    <div className="col-12">
                      <div className="alert alert-danger">
                        <ul className="mb-0">
                          {Object.entries(validationError).map(
                            ([key, value]) => (
                              <li key={key}>{value}</li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
                <Form onSubmit={updateProject}>
                  <Row>
                    <Col>
                      <Form.Group controlId="Name">
                        <Form.Label>Nom du project</Form.Label>
                        <Form.Control
                          type="text"
                          value={title_project}
                          onChange={(event) => {
                            setTitleProject(event.target.value);
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group controlId="Name">
                        <Form.Label>Date début de projet</Form.Label>
                        <Form.Control
                          type="date"
                          value={start_project}
                          onChange={(event) => {
                            setStartProject(event.target.value);
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    variant="primary"
                    className="mt-2"
                    size="lg"
                    block="block"
                    type="submit"
                  >
                    Mettre à jour
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditProject;

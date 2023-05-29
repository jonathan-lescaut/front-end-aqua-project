import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MenuAdmin from "../../compoment/Layouts/MenuAdmin";
import MenuUser from "../../compoment/Layouts/MenuUser";

const AddProject = (props) => {
  const navigate = useNavigate();
  const [title_project, setTitleProject] = useState("");
  const [start_project, setStartProject] = useState("");

  const [validationError, setValidationError] = useState({});
  const user_token = props.userToken;
  //Fonction d'ajout de project
  const addProject = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title_project", title_project);
    formData.append("start_project", start_project);
    formData.append("user_id", user_token);
    await axios
      .post(`http://localhost:8000/api/project`, formData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        navigate(`/projects/user/${user_token}`);
      })
      .catch((error) => {
        if (error.response && error.response.status === 422) {
          setValidationError(error.response.data.errors);
        } else {
          console.error(
            "Une erreur s'est produite lors de la requête :",
            error
          );
        }
      });
  };

  return (
    <div>
      <MenuUser />
      <MenuAdmin />
      <div className="container">
        <div className="row justify-content-center">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Création d'un nouveau project</h4>
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
                <Form onSubmit={addProject}>
                  <Row>
                    <Col>
                      <Form.Group controlId="Name">
                        <Form.Label>Nom du Project</Form.Label>
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
                      <Form.Group controlId="Date">
                        <Form.Label>Date du début de projet</Form.Label>
                        <Form.Control
                          type="text"
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
                    Créer
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
export default AddProject;

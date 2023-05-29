import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Login from "../../compoment/Auth/Login";
import MenuAdmin from "../../compoment/Layouts/MenuAdmin";
import MenuUser from "../../compoment/Layouts/MenuUser";

const EditUser = () => {
  const { user } = useParams();
  const navigate = useNavigate();
  const [name, setNameUser] = useState("");
  const [email, setEmailUser] = useState("");
  const [roles, setRoles] = useState("");

  const [validationError, setValidationError] = useState({});
  useEffect(() => {
    getUser();
  }, []);
  // GET - Récupère les valeurs de la fiche avec l'API
  const getUser = async () => {
    await axios
      .get(`http://localhost:8000/api/users/${user}`)
      .then((res) => {
        setNameUser(res.data.name);
        setEmailUser(res.data.email);
        setRoles(res.data.roles);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateUser = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("_method", "PATCH");
    formData.append("name", name);
    formData.append("email", email);
    formData.append("roles", roles);

    await axios
      .post(`http://localhost:8000/api/users/${user}`, formData)
      .then(() => {
        navigate("/users");
      })
      .catch(({ response }) => {
        if (response.status === 422) {
          setValidationError(response.data.errors);
        }
      });
  };
  console.log(roles);
  return (
    <div>
      <MenuUser />
      <MenuAdmin />
      <div className="container mt-5">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Modifier un user</h4>
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
                <Form onSubmit={updateUser}>
                  <Row>
                    <Col>
                      <Form.Group controlId="Name">
                        <Form.Label>Nom du user</Form.Label>
                        <Form.Control
                          type="text"
                          value={name}
                          onChange={(event) => {
                            setNameUser(event.target.value);
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group controlId="Name">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="text"
                          value={email}
                          onChange={(event) => {
                            setEmailUser(event.target.value);
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group controlId="position">
                        <Form.Label>Rôles</Form.Label>
                        <Form.Select
                          aria-label="Default select example"
                          onChange={(event) => {
                            setRoles(event.target.value);
                          }}
                          value={roles}
                        >
                          <option key="ROLE_ADMIN" value="ROLE_ADMIN">
                            ROLE_ADMIN
                          </option>
                          <option key="ROLE_USER" value="ROLE_USER">
                            ROLE_USER
                          </option>
                        </Form.Select>
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
                    Modifier
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
export default EditUser;

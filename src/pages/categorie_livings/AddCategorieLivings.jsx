import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MenuAdmin from "../../compoment/Layouts/MenuAdmin";
import MenuUser from "../../compoment/Layouts/MenuUser";

const AddCategorieLiving = () => {
  const navigate = useNavigate();
  const [name_categorie_living, setTitleCategorieLiving] = useState("");
  const [validationError, setValidationError] = useState({});

  //Fonction d'ajout de project
  const addCategorieLiving = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name_categorie_living", name_categorie_living);
    await axios
      .post(`http://localhost:8000/api/categorie_living`, formData)
      .then(navigate("/categorie_livings"))
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
      <div className="container">
        <div className="row justify-content-center">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">
                Création d'une nouvelle catégorie de vivant
              </h4>
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
                <Form onSubmit={addCategorieLiving}>
                  <Row>
                    <Col>
                      <Form.Group controlId="Name">
                        <Form.Label>Nom du CategorieLiving</Form.Label>
                        <Form.Control
                          type="text"
                          value={name_categorie_living}
                          onChange={(event) => {
                            setTitleCategorieLiving(event.target.value);
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
export default AddCategorieLiving;

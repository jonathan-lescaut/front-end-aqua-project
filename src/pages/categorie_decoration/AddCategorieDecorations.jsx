import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MenuAdmin from "../../compoment/Layouts/MenuAdmin";
import MenuUser from "../../compoment/Layouts/MenuUser";

const AddCategorieDecoration = () => {
  const navigate = useNavigate();
  const [name_categorie_decoration, setTitleCategorieDecoration] = useState("");
  const [validationError, setValidationError] = useState({});

  //Fonction d'ajout de project
  const addCategorieDecoration = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name_categorie_decoration", name_categorie_decoration);
    await axios
      .post(`http://localhost:8000/api/categorie_decoration`, formData)
      .then(navigate("/categorie_decorations"))
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
                Création d'une nouvelle catégorie de décoration
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
                <Form onSubmit={addCategorieDecoration}>
                  <Row>
                    <Col>
                      <Form.Group controlId="Name">
                        <Form.Label>
                          Nom du la catégorie de décoration
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={name_categorie_decoration}
                          onChange={(event) => {
                            setTitleCategorieDecoration(event.target.value);
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
export default AddCategorieDecoration;

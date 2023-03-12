import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import MenuAdmin from "../../compoment/Layouts/MenuAdmin";
import MenuUser from "../../compoment/Layouts/MenuUser";

const EditCategorieDecoration = () => {
  const { categorie_decoration } = useParams();
  const navigate = useNavigate();
  const [name_categorie_decoration, setNameCategorieDecoration] = useState("");

  const [validationError, setValidationError] = useState({});
  useEffect(() => {
    getCategorieDecoration();
  }, []);

  // GET - Récupère les valeurs de la fiche avec l'API
  const getCategorieDecoration = async () => {
    await axios
      .get(
        `http://localhost:8000/api/categorie_decoration/${categorie_decoration}`
      )
      .then((res) => {
        console.log(res.data);
        setNameCategorieDecoration(res.data.name_categorie_decoration);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Fonction d'ajout de categorie_decoration
  const updateCategorieDecoration = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("_method", "PATCH");
    formData.append("name_categorie_decoration", name_categorie_decoration);
    await axios
      .post(
        `http://localhost:8000/api/categorie_decoration/${categorie_decoration}`,
        formData
      )
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
      <div className="container mt-5">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">
                Modifier une catégorie de décoration
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
                <Form onSubmit={updateCategorieDecoration}>
                  <Row>
                    <Col>
                      <Form.Group controlId="Name">
                        <Form.Label>Nom de la catégorie de vivant</Form.Label>
                        <Form.Control
                          type="text"
                          value={name_categorie_decoration}
                          onChange={(event) => {
                            setNameCategorieDecoration(event.target.value);
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
export default EditCategorieDecoration;

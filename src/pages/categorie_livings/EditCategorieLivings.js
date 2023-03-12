import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import MenuAdmin from "../../compoment/Layouts/MenuAdmin";
import MenuUser from "../../compoment/Layouts/MenuUser";

const EditCategorieLiving = () => {
  const { categorie_living } = useParams();
  const navigate = useNavigate();
  const [name_categorie_living, setNameCategorieLiving] = useState("");

  const [validationError, setValidationError] = useState({});
  useEffect(() => {
    getCategorieLiving();
  }, []);

  // GET - Récupère les valeurs de la fiche avec l'API
  const getCategorieLiving = async () => {
    await axios
      .get(`http://localhost:8000/api/categorie_living/${categorie_living}`)
      .then((res) => {
        console.log(res.data);
        setNameCategorieLiving(res.data.name_categorie_living);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Fonction d'ajout de categorie_living
  const updateCategorieLiving = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("_method", "PATCH");
    formData.append("name_categorie_living", name_categorie_living);
    await axios
      .post(
        `http://localhost:8000/api/categorie_living/${categorie_living}`,
        formData
      )
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
      <div className="container mt-5">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Modifier une catégorie de vivant</h4>
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
                <Form onSubmit={updateCategorieLiving}>
                  <Row>
                    <Col>
                      <Form.Group controlId="Name">
                        <Form.Label>Nom de la catégorie de vivant</Form.Label>
                        <Form.Control
                          type="text"
                          value={name_categorie_living}
                          onChange={(event) => {
                            setNameCategorieLiving(event.target.value);
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
export default EditCategorieLiving;

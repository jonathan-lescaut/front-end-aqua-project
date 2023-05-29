import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import MenuAdmin from "../../compoment/Layouts/MenuAdmin";
import MenuUser from "../../compoment/Layouts/MenuUser";

const EditCategorieMaterial = () => {
  const { categorie_material } = useParams();
  const navigate = useNavigate();
  const [name_categorie_material, setNameCategorieMaterial] = useState("");
  const [included_kit, setIncludedKit] = useState("");

  const [validationError, setValidationError] = useState({});
  useEffect(() => {
    getCategorieMaterial();
  }, []);
  const handleChangeSwitch = () => {
    setIncludedKit(!included_kit);
  };
  // GET - Récupère les valeurs de la fiche avec l'API
  const getCategorieMaterial = async () => {
    await axios
      .get(`http://localhost:8000/api/categorie_material/${categorie_material}`)
      .then((res) => {
        setNameCategorieMaterial(res.data.name_categorie_material);
        setIncludedKit(res.data.included_kit);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Fonction d'ajout de categorie_material
  const updateCategorieMaterial = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("_method", "PATCH");
    formData.append("name_categorie_material", name_categorie_material);
    if (included_kit) {
      formData.append("included_kit", 1);
    } else {
      formData.append("included_kit", 0);
    }
    await axios
      .post(
        `http://localhost:8000/api/categorie_material/${categorie_material}`,
        formData
      )
      .then(navigate("/categorie_materials"))
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
                <Form onSubmit={updateCategorieMaterial}>
                  <Row>
                    <Col>
                      <Form.Group controlId="Name">
                        <Form.Label>Nom de la catégorie de matériel</Form.Label>
                        <Form.Control
                          type="text"
                          value={name_categorie_material}
                          onChange={(event) => {
                            setNameCategorieMaterial(event.target.value);
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Check
                        type="switch"
                        id="custom-switch"
                        label="Inclus dans un kit d'aquarium"
                        checked={included_kit}
                        onChange={handleChangeSwitch}
                      />
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
export default EditCategorieMaterial;

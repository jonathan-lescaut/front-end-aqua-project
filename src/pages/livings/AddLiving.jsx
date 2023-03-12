import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MenuAdmin from "../../compoment/Layouts/MenuAdmin";
import MenuUser from "../../compoment/Layouts/MenuUser";

const AddLiving = () => {
  const navigate = useNavigate();
  const [name_living, setNameLiving] = useState("");
  const [description_living, setDescriptionLiving] = useState("");
  const [price_living, setPriceLiving] = useState("");
  const [categorie_living_id, setCategorieLivingId] = useState("");
  const [categorie_livings, setCategorieLivings] = useState([]);
  const [validationError, setValidationError] = useState({});

  const handleChange = (event) => {
    setCategorieLivingId(event.target.value);
  };

  useEffect(() => {
    getCategorieLivings();
  }, []);

  //Méthode pour récupérer les clubs
  const getCategorieLivings = async () => {
    await axios
      .get("http://127.0.0.1:8000/api/categorie_living")
      .then((res) => {
        setCategorieLivings(res.data);
      });
  };

  //Fonction d'ajout de living
  const addLiving = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name_living", name_living);
    formData.append("description_living", description_living);
    formData.append("price_living", price_living);
    formData.append("categorie_living_id", categorie_living_id);
    await axios
      .post(`http://localhost:8000/api/living`, formData)
      .then(navigate("/livings"))
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
              <h4 className="card-title">Création d'un nouveau living</h4>
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
                <Form onSubmit={addLiving}>
                  <Row>
                    <Col>
                      <Form.Group controlId="Name">
                        <Form.Label>Nom du Living</Form.Label>
                        <Form.Control
                          type="text"
                          value={name_living}
                          onChange={(event) => {
                            setNameLiving(event.target.value);
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group controlId="lontext">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          type="textaera"
                          value={description_living}
                          onChange={(event) => {
                            setDescriptionLiving(event.target.value);
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group controlId="price">
                        <Form.Label>Prix</Form.Label>
                        <Form.Control
                          type="text"
                          value={price_living}
                          onChange={(event) => {
                            setPriceLiving(event.target.value);
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group controlId="position">
                        <Form.Label>Catégorie</Form.Label>
                        <Form.Select
                          aria-label="Default select example"
                          onChange={handleChange}
                        >
                          <option>Choisissez une catégorie</option>
                          {categorie_livings.map((categorie_living) => (
                            <option
                              key={categorie_living.id}
                              value={categorie_living.id}
                            >
                              {categorie_living.name_categorie_living}
                            </option>
                          ))}
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
export default AddLiving;

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

const EditLiving = () => {
  const { living } = useParams();
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
    getLiving();
    getCategorieLivings();
  }, []);

  const getCategorieLivings = async () => {
    await axios
      .get("http://127.0.0.1:8000/api/categorie_living")
      .then((res) => {
        setCategorieLivings(res.data);
      });
  };
  // GET - Récupère les valeurs de la fiche avec l'API
  const getLiving = async () => {
    await axios
      .get(`http://localhost:8000/api/living/${living}`)
      .then((res) => {
        setNameLiving(res.data.name_living);
        setDescriptionLiving(res.data.description_living);
        setPriceLiving(res.data.price_living);
        setCategorieLivingId(res.data.categorie_living_id);

        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Fonction d'ajout de living
  const updateLiving = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("_method", "PATCH");
    formData.append("name_living", name_living);
    formData.append("description_living", description_living);
    formData.append("price_living", price_living);
    formData.append("categorie_living_id", categorie_living_id);

    await axios
      .post(`http://localhost:8000/api/living/${living}`, formData)
      .then(navigate("/livings"))
      .catch(({ response }) => {
        if (response.status === 422) {
          setValidationError(response.data.errors);
        }
      });
  };
  console.log(categorie_living_id);
  return (
    <div>
      <MenuUser />
      <MenuAdmin />
      <div className="container mt-5">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Modifier un living</h4>
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
                <Form onSubmit={updateLiving}>
                  <Row>
                    <Col>
                      <Form.Group controlId="Name">
                        <Form.Label>Nom du living</Form.Label>
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
                      <Form.Group controlId="Name">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          type="text"
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
                      <Form.Group controlId="Name">
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
                          value={categorie_living_id}
                        >
                          <option value="">Choisissez une catégorie</option>
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
export default EditLiving;

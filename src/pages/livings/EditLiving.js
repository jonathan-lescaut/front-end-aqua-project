import React, { useState, useEffect, useRef } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import MenuAdmin from "../../compoment/Layouts/MenuAdmin";
import MenuUser from "../../compoment/Layouts/MenuUser";

const EditLiving = () => {
  const navigate = useNavigate();
  const { living } = useParams();
  const [name_living, setNameLiving] = useState("");
  const [description_living, setDescriptionLiving] = useState("");
  const [price_living, setPriceLiving] = useState("");
  const [picture_living, setPictureLiving] = useState("");
  const [quantity_editable_living, setQuantityEditableLiving] = useState("");
  const [liter_min, setLiterMin] = useState("");
  const [number_max, setNumberMax] = useState("");
  const [number_min, setNumberMin] = useState("");
  const [unique_living_category, setUniqueLivingCategory] = useState("");
  const [categorie_living_id, setCategorieLivingId] = useState("");
  const [categorie_livings, setCategorieLivings] = useState([]);
  const [validationError, setValidationError] = useState({});
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    setPictureLiving(e.target.files[0]); // le fichier d'image en bdd
  };
  const handleChange = (event) => {
    setCategorieLivingId(event.target.value);
  };
  const handleChangeSwitchQty = () => {
    setQuantityEditableLiving(!quantity_editable_living);
  };
  const handleChangeSwitchUnique = () => {
    setUniqueLivingCategory(!unique_living_category);
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
        setPictureLiving(res.data.picture_living);
        setCategorieLivingId(res.data.categorie_living_id);
        setQuantityEditableLiving(res.data.quantity_editable_living);
        setLiterMin(res.data.liter_min);
        setNumberMax(res.data.number_max);
        setNumberMin(res.data.number_min);
        setUniqueLivingCategory(res.data.unique_living_category);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Fonction d'ajout de living
  const updateLiving = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("_method", "POST");
    formData.append("name_living", name_living);
    formData.append("description_living", description_living);
    formData.append("price_living", price_living);
    formData.append("liter_min", liter_min);
    formData.append("number_max", number_max);
    formData.append("number_min", number_min);
    if (picture_living) {
      formData.append("picture_living", picture_living);
    }
    if (picture_living !== null) {
      formData.append("picture_living", picture_living);
    }
    formData.append("categorie_living_id", categorie_living_id);
    if (quantity_editable_living) {
      formData.append("quantity_editable_living", 1);
    } else {
      formData.append("quantity_editable_living", 0);
    }
    if (unique_living_category) {
      formData.append("unique_living_category", 1);
    } else {
      formData.append("unique_living_category", 0);
    }
    await axios
      .post(`http://localhost:8000/api/living/${living}`, formData, {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("token"),
        },
      })
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
                          as="textarea"
                          rows={3}
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
                      <Form.Group controlId="formFile">
                        <Form.Label>Image Vivant</Form.Label>
                        <Form.Control
                          type="file"
                          onChange={handleFileChange}
                          ref={fileInputRef}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Form.Group controlId="liter_min">
                        <Form.Label>Litrage minimum</Form.Label>
                        <Form.Control
                          type="text"
                          value={liter_min}
                          onChange={(event) => {
                            setLiterMin(event.target.value);
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group controlId="nb_max">
                        <Form.Label>Nombre maximum / litrage</Form.Label>
                        <Form.Control
                          type="number"
                          value={number_max}
                          onChange={(event) => {
                            setNumberMax(event.target.value);
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group controlId="nb_min">
                        <Form.Label>Nombre minimum</Form.Label>
                        <Form.Control
                          type="number"
                          value={number_min}
                          onChange={(event) => {
                            setNumberMin(event.target.value);
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
                        label="Affecter une quantité"
                        checked={quantity_editable_living}
                        onChange={handleChangeSwitchQty}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Check
                        type="switch"
                        id="custom-switch"
                        label="Ne pas mélanger avec les autres de sa catégorie"
                        checked={unique_living_category}
                        onChange={handleChangeSwitchUnique}
                      />
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

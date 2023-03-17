import React, { useState, useEffect, useRef } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Login from "../../compoment/Auth/Login";
import MenuAdmin from "../../compoment/Layouts/MenuAdmin";
import MenuUser from "../../compoment/Layouts/MenuUser";

const EditDecoration = () => {
  const { decoration } = useParams();
  const navigate = useNavigate();
  const [name_decoration, setNameDecoration] = useState("");
  const [description_decoration, setDescriptionDecoration] = useState("");
  const [price_decoration, setPriceDecoration] = useState("");
  const [picture_decoration, setPictureDecoration] = useState("");
  const [categorie_decoration_id, setCategorieDecorationId] = useState("");
  const [categorie_decorations, setCategorieDecorations] = useState([]);
  const [validationError, setValidationError] = useState({});
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    setPictureDecoration(e.target.files[0]); // le fichier d'image en bdd
  };

  const handleChange = (event) => {
    setCategorieDecorationId(event.target.value);
  };

  useEffect(() => {
    getDecoration();
    getCategorieDecorations();
  }, []);

  const getCategorieDecorations = async () => {
    await axios
      .get("http://127.0.0.1:8000/api/categorie_decoration")
      .then((res) => {
        setCategorieDecorations(res.data);
      });
  };
  // GET - Récupère les valeurs de la fiche avec l'API
  const getDecoration = async () => {
    await axios
      .get(`http://localhost:8000/api/decoration/${decoration}`)
      .then((res) => {
        setNameDecoration(res.data.name_decoration);
        setDescriptionDecoration(res.data.description_decoration);
        setPriceDecoration(res.data.price_decoration);
        setPictureDecoration(res.data.picture_decoration);
        setCategorieDecorationId(res.data.categorie_decoration_id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Fonction d'ajout de decoration
  const updateDecoration = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("_method", "POST");
    formData.append("name_decoration", name_decoration);
    formData.append("description_decoration", description_decoration);
    formData.append("price_decoration", price_decoration);
    formData.append("picture_decoration", picture_decoration);
    formData.append("categorie_decoration_id", categorie_decoration_id);

    if (picture_decoration !== null) {
      formData.append("picture_decoration", picture_decoration);
    }

    await axios
      .post(`http://localhost:8000/api/decoration/${decoration}`, formData)
      .then(navigate("/decorations"))
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
              <h4 className="card-title">Modifier un decoration</h4>
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
                <Form onSubmit={updateDecoration}>
                  <Row>
                    <Col>
                      <Form.Group controlId="Name">
                        <Form.Label>Nom du decoration</Form.Label>
                        <Form.Control
                          type="text"
                          value={name_decoration}
                          onChange={(event) => {
                            setNameDecoration(event.target.value);
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
                          value={description_decoration}
                          onChange={(event) => {
                            setDescriptionDecoration(event.target.value);
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
                          value={price_decoration}
                          onChange={(event) => {
                            setPriceDecoration(event.target.value);
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Form.Group controlId="formFile">
                        <Form.Label>Image décoration</Form.Label>
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
                      <Form.Group controlId="position">
                        <Form.Label>Catégorie</Form.Label>
                        <Form.Select
                          aria-label="Default select example"
                          onChange={handleChange}
                          value={categorie_decoration_id}
                        >
                          <option value="">Choisissez une catégorie</option>
                          {categorie_decorations.map((categorie_decoration) => (
                            <option
                              key={categorie_decoration.id}
                              value={categorie_decoration.id}
                            >
                              {categorie_decoration.name_categorie_decoration}
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
export default EditDecoration;

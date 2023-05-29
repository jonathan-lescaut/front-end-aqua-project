import React, { useState, useEffect, useRef } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import MenuAdmin from "../../compoment/Layouts/MenuAdmin";
import MenuUser from "../../compoment/Layouts/MenuUser";

const EditMaterial = () => {
  const { material } = useParams();
  const navigate = useNavigate();
  const [name_material, setNameMaterial] = useState("");
  const [description_material, setDescriptionMaterial] = useState("");
  const [price_material, setPriceMaterial] = useState("");
  const [picture_material, setPictureMaterial] = useState("");
  const [liter, setLiter] = useState("");
  const [content_kit, setContentKit] = useState("");
  const [quantity_editable_material, setQuantityEditableMaterial] =
    useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [checkedCategories, setCheckedCategories] = useState({});
  const [kit, setKit] = useState("");
  const [categorie_material_id, setCategorieMaterialId] = useState("");
  const [categorie_included_kit, setCategorieIncludedKit] = useState([]);
  const [categorie_materials, setCategorieMaterials] = useState([]);
  const [validationError, setValidationError] = useState({});
  const fileInputRef = useRef();
  const [showTextArea, setShowTextArea] = useState(false);
  const [options, setOptions] = useState([]);
  const handleFileChange = (e) => {
    setPictureMaterial(e.target.files[0]); // le fichier d'image en bdd
  };
  const handleChange = (event) => {
    setCategorieMaterialId(event.target.value);
  };
  const handleChangeSwitchQty = () => {
    setQuantityEditableMaterial(!quantity_editable_material);
  };
  const handleChangeSwitchKit = () => {
    setKit(!kit);
    setShowTextArea(!kit);
  };

  useEffect(() => {
    getMaterial();
    getCategorieMaterials();
    getCategorieIncludeKit();
  }, []);

  const getCategorieMaterials = async () => {
    await axios
      .get("http://127.0.0.1:8000/api/categorie_material")
      .then((res) => {
        setCategorieMaterials(res.data);
      });
  };
  const handleCategoryChange = (event) => {
    const categoryId = event.target.value;
    const isChecked = event.target.checked;

    setSelectedCategories((prevSelectedCategories) => {
      if (isChecked) {
        return [...prevSelectedCategories, categoryId];
      } else {
        return prevSelectedCategories.filter((id) => id !== categoryId);
      }
    });

    setCheckedCategories((prevCheckedCategories) => {
      const checkedCategories = { ...prevCheckedCategories };
      checkedCategories[categoryId] = isChecked;
      return checkedCategories;
    });
  };

  // GET - Récupère les valeurs de la fiche avec l'API
  const getMaterial = async () => {
    await axios
      .get(`http://localhost:8000/api/material/${material}`)
      .then((res) => {
        setNameMaterial(res.data.name_material);
        setDescriptionMaterial(res.data.description_material);
        setPriceMaterial(res.data.price_material);
        setPictureMaterial(res.data.picture_material);
        setCategorieMaterialId(res.data.categorie_material_id);
        setQuantityEditableMaterial(res.data.quantity_editable_material);
        setKit(res.data.kit);
        setLiter(res.data.liter);
        setContentKit(res.data.content_kit);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // GET - Récupère les valeurs de la fiche avec l'API
  const getCategorieIncludeKit = async () => {
    await axios
      .get(`http://localhost:8000/api/material/categoriekit`)
      .then((res) => {
        setCategorieIncludedKit(res.data.data);
        console.log(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Fonction d'ajout de material
  const updateMaterial = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("_method", "POST");
    formData.append("name_material", name_material);
    formData.append("description_material", description_material);
    formData.append("price_material", price_material);
    formData.append("liter", liter);
    formData.append("content_kit", JSON.stringify(selectedCategories)); // Ajouter le contenu mis à jour du tableau ici
    if (picture_material) {
      formData.append("picture_material", picture_material);
    }
    if (picture_material !== null) {
      formData.append("picture_material", picture_material);
    }
    formData.append("categorie_material_id", categorie_material_id);
    if (quantity_editable_material) {
      formData.append("quantity_editable_material", 1);
    } else {
      formData.append("quantity_editable_material", 0);
    }
    if (kit) {
      formData.append("kit", 1);
    } else {
      formData.append("kit", 0);
    }

    await axios
      .post(`http://localhost:8000/api/material/${material}`, formData, {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("token"),
        },
      })
      .then(navigate("/materials"))
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
              <h4 className="card-title">Modifier un material</h4>
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
                <Form onSubmit={updateMaterial}>
                  <Row>
                    <Col>
                      <Form.Group controlId="Name">
                        <Form.Label>Nom du material</Form.Label>
                        <Form.Control
                          type="text"
                          value={name_material}
                          onChange={(event) => {
                            setNameMaterial(event.target.value);
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
                          value={description_material}
                          onChange={(event) => {
                            setDescriptionMaterial(event.target.value);
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
                          value={price_material}
                          onChange={(event) => {
                            setPriceMaterial(event.target.value);
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group controlId="Liter">
                        <Form.Label>Litrage</Form.Label>
                        <Form.Control
                          type="text"
                          value={liter}
                          onChange={(event) => {
                            setLiter(event.target.value);
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group controlId="formFile">
                        <Form.Label>Image Matériel</Form.Label>
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
                      <Form.Check
                        type="switch"
                        id="custom-switch"
                        label="Affecter une quantité"
                        checked={quantity_editable_material}
                        onChange={handleChangeSwitchQty}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Check
                        type="switch"
                        id="custom-switch"
                        label="Ce produit est un kit aquarium"
                        checked={kit}
                        onChange={handleChangeSwitchKit}
                      />
                    </Col>
                  </Row>
                  {kit && (
                    <Row>
                      <Col>
                        <Form.Label>Mon kit contient :</Form.Label>
                        {categorie_included_kit.map(
                          (categorie_material_kit) => (
                            <Form.Check
                              type={"checkbox"}
                              id={categorie_material_kit.id}
                              key={categorie_material_kit.id}
                              label={
                                categorie_material_kit.name_categorie_material
                              }
                              value={categorie_material_kit.id}
                              defaultChecked={
                                checkedCategories[categorie_material_kit.id] ||
                                content_kit.includes(categorie_material_kit.id)
                              }
                              onChange={handleCategoryChange}
                            />
                          )
                        )}
                      </Col>
                    </Row>
                  )}
                  <Row>
                    <Col>
                      <Form.Group controlId="position">
                        <Form.Label>Catégorie</Form.Label>
                        <Form.Select
                          aria-label="Default select example"
                          onChange={handleChange}
                          value={categorie_material_id}
                        >
                          <option value="">Choisissez une catégorie</option>
                          {categorie_materials.map((categorie_material) => (
                            <option
                              key={categorie_material.id}
                              value={categorie_material.id}
                            >
                              {categorie_material.name_categorie_material}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row></Row>
                  <Button
                    variant="primary"
                    className="mt-2"
                    size="lg"
                    block="block"
                    type="submit"
                  >
                    Modifier
                  </Button>
                  <a href="/materials">Retour</a>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditMaterial;

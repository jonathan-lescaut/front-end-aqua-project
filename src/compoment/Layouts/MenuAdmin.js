import axios from "axios";
import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const MenuAdmin = () => {
  const [user, setUser] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // console.log(isLoggedIn);
  // console.log(isAdmin);

  useEffect(() => {
    const displayUsers = async () => {
      if (localStorage.token) {
        await axios
          .get("http://127.0.0.1:8000/api/current-user", {
            headers: {
              Authorization: "Bearer " + localStorage.token,
            },
          })
          .then((res) => {
            setUser(res.data);
            setIsLoggedIn(true);
            setIsAdmin(res.data.roles.includes("ROLE_ADMIN"));
          })
          .catch((err) => {
            console.log(err);
            setIsLoggedIn(false);
            setIsAdmin(false);
          });
      } else {
        setIsLoggedIn(false);
        setIsAdmin(false);
      }
    };

    displayUsers();
  }, []);

  if (!isLoggedIn || !isAdmin) {
    return null; // si l'utilisateur n'est pas connecté ou n'a pas le rôle admin, on ne rend pas le composant
  }
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="#action1">Administration</Nav.Link>
              <NavDropdown title="Projects" id="navbarScrollingDropdown">
                <NavDropdown.Item href="/projects/add">
                  Créer un nouveau project
                </NavDropdown.Item>
                <NavDropdown.Item href="/projects">
                  Liste des projects
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Decorations" id="navbarScrollingDropdown">
                <NavDropdown.Item href="/decorations/add">
                  Créer une nouvelle decoration
                </NavDropdown.Item>
                <NavDropdown.Item href="/decorations">
                  Liste des decorations
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Materials" id="navbarScrollingDropdown">
                <NavDropdown.Item href="/materials/add">
                  Créer un nouveau materiel
                </NavDropdown.Item>
                <NavDropdown.Item href="/materials">
                  Liste des materiaux
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Livings" id="navbarScrollingDropdown">
                <NavDropdown.Item href="/livings/add">
                  Créer un nouveau vivant
                </NavDropdown.Item>
                <NavDropdown.Item href="/livings">
                  Liste des vivants
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                title="Catégorie vivant"
                id="navbarScrollingDropdown"
              >
                <NavDropdown.Item href="/categorie_livings/add">
                  Créer une nouvelle catégorie de vivant
                </NavDropdown.Item>
                <NavDropdown.Item href="/categorie_livings">
                  Liste des catégorie de vivant
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                title="Catégorie matériel"
                id="navbarScrollingDropdown"
              >
                <NavDropdown.Item href="/categorie_materials/add">
                  Créer une nouvelle catégorie de matériel
                </NavDropdown.Item>
                <NavDropdown.Item href="/categorie_materials">
                  Liste des catégorie de matériel
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                title="Catégorie décoration"
                id="navbarScrollingDropdown"
              >
                <NavDropdown.Item href="/categorie_decorations/add">
                  Créer une nouvelle catégorie de décoration
                </NavDropdown.Item>
                <NavDropdown.Item href="/categorie_decorations">
                  Liste des catégorie de décoration
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="users" id="navbarScrollingDropdown">
                <NavDropdown.Item href="/users">
                  Liste des users
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};
export default MenuAdmin;

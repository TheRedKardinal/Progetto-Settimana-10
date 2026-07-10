import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import japanFlag from "../img/JapanFlag.png";

function NavbarComp({ onSearch }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      navigate("/");
    }
  }

  return (
    <>
      <Navbar data-bs-theme="light" className="main-nav">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            Meteo Japan{" "}
            <img src={japanFlag} alt="Bandiera Giappone" height="20" />
          </Navbar.Brand>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Cerca città in Giappone..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </Form.Group>
          </Form>
          <Nav>
            <Nav.Link as={Link} to="/" className="nav-link">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/preferiti" className="nav-link">
              Preferiti
            </Nav.Link>
            <Nav.Link as={Link} to="/news" className="nav-link">
              News
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarComp;

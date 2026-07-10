import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import japanFlag from "../img/JapanFlag.png";

function NavbarComp() {
  return (
    <>
      <Navbar data-bs-theme="light" className="main-nav">
        <Container fluid>
          <Navbar.Brand href="#home">Meteo Japan 🇯🇵</Navbar.Brand>
          <Form.Group>
            <Form.Control type="text" placeholder="Cerca località" />
          </Form.Group>
          <Nav>
            <Nav.Link href="#home" className="nav-link">
              Home
            </Nav.Link>
            <Nav.Link href="#today-meteo" className="nav-link">
              Meteo Oggi
            </Nav.Link>
            <Nav.Link href="news" className="nav-link">
              News
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarComp;

import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import SignUp from "../Buttons/SignUp";
import LogIn from "../Buttons/LogIn";
import LogOut from "../Buttons/LogOut";

function NavbarCustom() {
  const user = useSelector((state) => state.session.user);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Placeholder</Nav.Link>
            <Nav.Link href="#pricing">Another placeholder</Nav.Link>
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        {user ? null : <SignUp />}
        {user ? <LogOut /> : <LogIn />}
      </Container>
    </Navbar>
  );
}

export default NavbarCustom;

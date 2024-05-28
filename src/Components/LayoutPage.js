import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import { useAuth } from "./AuthContext";

const LayoutPage = ({ children }) => {
  const { isLoggedIn, logout } = useAuth();
  return (
    <>
      {isLoggedIn && (
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Link to="/list" className="nav-link">
                  List
                </Link>

                <Nav.Link href="#action2">Link</Nav.Link>
              </Nav>
              <Form className="d-flex">
                <Button variant="outline-success" onClick={logout}>
                  Logout
                </Button>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}

      {children}
    </>
  );
};

export default LayoutPage;

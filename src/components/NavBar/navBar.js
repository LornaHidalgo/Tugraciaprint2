import React from "react";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./navbar.css";

import { CartWidget } from "./CartWidget";
import { WishIcon } from "./WishIcon";

export const NavBar = () => {
  
  return (
    
    
    <div>
      <Container className="info" >
        <h1>hola</h1>
      </Container>
      <Navbar bg="light" expand="lg" className="navbar-bg">
        <Container>
          <Link to="/">
            {" "}
            <img className="logo-nav" src="tugraciaprint.png" alt="logo de la marca" />{" "}
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="justify-content-end">
              <Link to="/">Inicio</Link>
              
              <NavDropdown title="Productos" className="dropdown">
                <Link to="/productos/all">Todos</Link>
                <NavDropdown.Divider />
                <Link to="/productos/Personalizable">Personalizables</Link>
                <Link to="/productos/Tazon">Tazones</Link>
                <Link to="/productos/Totebag">Totebags</Link>
                <Link to="/productos/Otros">Otros</Link>
                
               
              </NavDropdown>
              <NavDropdown title="Papeleria" className="dropdown">
                <Link to="/productos/all">Todos</Link>
                <NavDropdown.Divider />
                <Link to="/productos/Posters">Stickers</Link>
                <Link to="/productos/Figuras">Fotos</Link>
                <Link to="/productos/Llaveros">Tags</Link>
                <Link to="/productos/Otros">Otros</Link>
                
               
              </NavDropdown>
              <Link to="/contacto">Contacto</Link>
            </Nav>
            <div className="alig-right">
              <WishIcon />
              <CartWidget />
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

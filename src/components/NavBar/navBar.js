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
        <a href="mailto: tugraciaprint@gmail.com" target="_blanck" rel="noreferrer"
      >
        <i className="fas fa-envelope fa-2x"></i>tugraciaprint@gmail.com</a> 
       <a href="https://api.whatsapp.com/send?phone=56928481332&text=%C2%A1Hola!%20%F0%9F%98%8A"target="_blank"rel="noopener noreferrer"
      >
        <i className="fab fa-whatsapp whatsapp-icon"></i>+569 28481332</a> <a href="https://www.instagram.com/tugraciaprint/" target="_blanck" rel="noreferrer"
      >
        <i className="fab fa-instagram"></i>@tugraciaprint</a>
    
        
      </Container>
      
      <Navbar bg="light" expand="lg" className="n avbar-bg">
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
                <Link to="/productos/Personalizable">Estampados</Link>
                <Link to="/productos/Tazon">Tazones</Link>
                <Link to="/productos/Totebag">Totebags</Link>
                <Link to="/productos/Otros">Otros</Link>
                
               
              </NavDropdown>
              <NavDropdown title="Papeleria" className="dropdown">
                <Link to="/productos/all">Todos</Link>
                <NavDropdown.Divider />
                <Link to="/productos/Stickers">Stickers</Link>
                <Link to="/productos/Fotos">Fotos</Link>
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

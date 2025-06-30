import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NoMatch = () => {
  return (
    <Container className="main">
      <h2>Ruta no existente</h2>
      <h3>
        Puedes dirigirte a <Link to="productos/all">productos</Link> si lo
        deseeas o utilizar la barra de navegación.
      </h3>
    </Container>
  );
};

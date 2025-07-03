import React from "react";
import { Container} from "react-bootstrap";
import { OrderContent } from "./OrderContent"; // Asegúrate de que importe OrderContent

export const OrderForm = () => { // O Order como estaba antes
  return (
    <Container className="main">
      <h1>Orden de compra</h1>
      <OrderContent />
    </Container>
  );
};
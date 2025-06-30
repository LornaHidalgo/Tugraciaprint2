import React from "react";
import { Container} from "react-bootstrap";
import { OrderContent } from "./OrderContent";

export const OrderForm = () => {
  return (
    <Container className="main">
      <h1>Orden de compra</h1>
      <OrderContent />
    </Container>
  );
};

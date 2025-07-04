import React, { useContext } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/cartContext";

export const CartWidget = () => {
  // Desestructura la función itemQuantity del CartContext
  const { itemQuantity } = useContext(CartContext);

  // Llama a la función itemQuantity para obtener el número total de ítems en el carrito
  const totalItemsInCart = itemQuantity();

  return (
    <Link to="/cart" className="cartWidget">
      <i className="fas fa-shopping-cart"></i>
      {/* Muestra la cantidad total de ítems */}
      <p>{totalItemsInCart}</p>
    </Link>
  );
};


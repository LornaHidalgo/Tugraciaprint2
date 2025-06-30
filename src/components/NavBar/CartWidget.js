import React, { useContext} from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/cartContext";

export const CartWidget = () => {
    const {itemQuantity} = useContext(CartContext)
  return (
    <Link to="/cart" className="cartWidget">
      <i className="fas fa-shopping-cart"></i>
     <p>{itemQuantity()}</p>
    </Link>
  );
};

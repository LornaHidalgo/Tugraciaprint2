import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import {CartContext} from "../../../context/cartContext"
import { ItemCount } from "./ItemCount";
import "../main.css";


export const ItemDetail = ({ state }) => {
  const { cart } = useContext(CartContext)
  
  return (
    <Container className="card__detail" id={state.id}>
      <div className="card__detail--img">
        <img src={state.Image} alt="Foto de producto" />
      </div>
      <div className="card__detail--info">
        <div className="card_product--title_principal">
          <h3 className="card__detail--title">{state.title}</h3>
          <p className="card__detail--desc">{state.description}</p>
        </div>

        <div className="card__detail--cta">
          <div className="price">${state.price}</div>
          <ItemCount item={state} />
        </div>
        {cart.length > 0 && 
          <Link className="card__detail--btn_finish" to="/cart">
            Ir al carrito
          </Link>
        }
      </div>
    </Container>
  );
};

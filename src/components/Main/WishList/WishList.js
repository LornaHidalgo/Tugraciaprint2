import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { WishContext } from "../../../context/wishContext";

export const WishList = () => {
  const { wish } = useContext(WishContext);

  const { removeItem, clearWish, itemQuantity } = useContext(WishContext);

  return (
    <Container className="main">
      <h1>Favoritos</h1>
      {wish.length === 0 && (
        <h3>
          Tu lista de favoritos está vacía. Visite nuestros{" "}
          <Link to="productos/all">productos</Link>{" "}
        </h3>
      )}
      {wish.length !== 0 && (
        <>
          {itemQuantity() === 1 ? (
            <h2>Tienes 1 producto en tu lista de favoritos.</h2>
          ) : (
            <h2>Tienes {itemQuantity()} productos en tu lista de favoritos.</h2>
          )}

          <Container className="cart__header">
            <div className="cart__header--info">Detalle</div>
            <div className="cart__header--actions">
              <div>Acciones</div>
            </div>
          </Container>
          {wish.map(({ item }) => (
            <Container className="card__cart" id={item.id} key={item.id}>
              <div className="card__cart--info">
                <div className="card__cart--img">
                  <img src={item.Image} alt="Foto de producto" />
                </div>
                <div className="card_product--title_principal">
                  <h3 className="card__cart--title">{item.title}</h3>
                  <p className="card__cart--desc">{item.description}</p>
                  <div>Precio: ${item.price}</div>
                </div>
              </div>
              <div className="card__cart--actions">
                <Link className="btn" to={`/item/${item.id}`}>
                  Ver producto
                </Link>
                <button className="btn" onClick={() => removeItem(item.id)}>
                  Eliminar de favoritos
                </button>
              </div>
            </Container>
          ))}
          <>
            <button className="btn" onClick={() => clearWish()}>
              Vaciar favoritos
            </button>
          </>
        </>
      )}
    </Container>
  );
};

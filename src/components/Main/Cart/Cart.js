import React, { useContext } from "react"; // Importa React y el hook useContext para acceder al contexto
import { Link } from "react-router-dom"; // Importa Link de react-router-dom para la navegación
import { Container } from "react-bootstrap"; // Importa el componente Container de React-Bootstrap para el diseño
import { CartContext } from "../../../context/cartContext"; // Importa el contexto del carrito para acceder a su estado y funciones
import { ItemCount } from "../Items/ItemCount"; // Importa el componente ItemCount para la funcionalidad de añadir/quitar cantidad de un producto
import "./Cart.css"; // Importa los estilos CSS específicos para este componente Cart

// Define y exporta el componente funcional Cart
export const Cart = () => {
  // Usa el hook useContext para obtener el estado 'cart' (el contenido del carrito) del CartContext
  const { cart } = useContext(CartContext);

  // Usa el hook useContext para obtener varias funciones del CartContext:
  // removeItem: para eliminar un producto específico del carrito
  // clearCart: para vaciar completamente el carrito
  // getSubtotal: para calcular el subtotal de un producto individual en el carrito
  // getTotal: para calcular el precio total de todos los productos en el carrito
  const { removeItem, clearCart, getSubtotal, getTotal } =
    useContext(CartContext);

  // Renderiza la interfaz de usuario del componente Cart
  return (
    <div className="cartContainer"> {/* Contenedor principal para el diseño del carrito */}
      <Container className="main"> {/* Contenedor de Bootstrap para el contenido principal */}
        <h1>Carrito</h1> {/* Título de la página del carrito */}

        {/* Condición: Si el carrito está vacío (cart.length es 0) */}
        {cart.length === 0 && (
          <h3>
            Su carrito está vacio. Visite nuestros{" "}
            {/* Mensaje indicando que el carrito está vacío */}
            <Link to="productos/all">productos</Link>{" "}
            {/* Enlace para que el usuario navegue a la página de productos */}
          </h3>
        )}

        {/* Condición: Si el carrito NO está vacío (cart.length es diferente de 0) */}
        {cart.length !== 0 &&
          // Itera sobre cada elemento en el array 'cart' y renderiza un componente por cada uno
          cart.map(({ item, counter }) => (
            <Container className="card__cart" id={item.id} key={item.id}>
              {/* Contenedor para la tarjeta de cada producto en el carrito.
                  'key' es importante para que React identifique cada elemento de la lista. */}
              <div className="card__cart--info">
                {/* Sección de información del producto */}

                <div className="card__cart--img">
                  {/* Contenedor para la imagen del producto */}
                  <img src={item.Image} alt="Foto de producto" />{" "}
                  {/* Imagen del producto */}
                </div>
                <div className="card_product--title_principal">
                  {/* Contenedor para el título y descripción del producto */}
                  <h3 className="card__cart--title">{item.title}</h3>{" "}
                  {/* Título del producto */}
                  <p className="card__cart--desc">{item.description}</p>{" "}
                  {/* Descripción del producto */}
                </div>
              </div>

              <div className="card__cart--actions">
                {/* Sección de acciones y precios del producto */}
                <h5>Cantidad</h5>
                <div className="price">{counter}</div> {/* Muestra la cantidad actual del producto en el carrito */}
                <h5>Añadir</h5>
                <ItemCount item={item} />{" "}
                {/* Componente ItemCount para modificar la cantidad del producto.
                                       Recibe el 'item' completo como prop. */}
                <h5>Precio</h5>
                <div className="price">${item.price}</div>{" "}
                {/* Muestra el precio unitario del producto */}
                <h5>Precio Total</h5>
                <div className="price">${getSubtotal(counter, item.price)}</div>{" "}
                {/* Muestra el subtotal de este producto (cantidad * precio unitario) */}
              </div>
              <button
                className="btn_remove btn" // Clases CSS para el botón
                onClick={() => removeItem(item.id)} // Llama a la función removeItem del contexto al hacer clic, pasando el ID del producto
              >
                X {/* Texto del botón para eliminar el producto */}
              </button>
            </Container>
          ))}

        {/* Condición: Si el carrito NO está vacío, muestra el pie de página del carrito */}
        {cart.length !== 0 && (
          <Container className="cart__footer">
            {/* Contenedor para el pie de página del carrito */}
            <button className="btn" onClick={clearCart}>
              {" "}
              {/* Botón para vaciar todo el carrito */}
              Vaciar carrito
            </button>
            <div>Total ${getTotal()}</div>{" "}
            {/* Muestra el precio total de todos los productos en el carrito */}
            <Link className="btn" to="/checkout">
              {" "}
              {/* Enlace para ir a la página de finalizar compra */}
              Finalizar compra
            </Link>
          </Container>
        )}
      </Container>
    </div>
  );
};
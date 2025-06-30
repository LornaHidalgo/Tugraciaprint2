import React, { useContext } from "react"; // Importa React y el hook useContext para acceder a contextos.
import { WishContext } from "../../../context/wishContext"; // Importa el contexto WishContext desde su ruta.
import "../main.css"; // Importa los estilos CSS generales desde main.css.
import { Link } from "react-router-dom"; // Importa el componente Link de react-router-dom para la navegación.

// Define el componente funcional 'Item'.
// Recibe un objeto 'x' como prop, que representa los datos de un producto individual.
function Item({ x }) {
  // Usa el hook useContext para obtener la función 'addItem' del WishContext.
  // Esta función se usará para añadir productos a la lista de deseos.
  const { addItem } = useContext(WishContext);

  // Renderiza la estructura de la tarjeta de un producto.
  return (
    <div className="card__product" id={x.id}>
      {" "}
      {/* Contenedor principal de la tarjeta del producto, con ID basado en el ID del producto */}
      <div className="card_product--title_principal">
        {" "}
        {/* Contenedor para el título principal del producto */}
        <h3 className="card__product--title">{x.title}</h3>{" "}
        {/* Título del producto */}
      </div>
      <div className="card__product--img">
        {" "}
        {/* Contenedor para la imagen del producto */}
        <img src={x.Image} alt="Foto de producto" />{" "}
        {/* Imagen del producto, con ruta y texto alternativo */}
      </div>
      <div className="card__product--cta">
        {" "}
        {/* Contenedor para la sección de llamada a la acción (precio, etc.) */}
        <div className="price">${x.price}</div>{" "}
        {/* Muestra el precio del producto */}
      </div>
      <div className="flex-row">
        {" "}
        {/* Contenedor para botones en fila (Ver más y Añadir a deseos) */}
        <Link
          className="card__product--btn_more btn" // Clases CSS para el botón de "Ver más"
          to={`/item/${x.id}`} // Enlace dinámico a la página de detalles del producto
        >
          Ver más {/* Texto del botón */}
        </Link>
        <button
          className="card__product--btn_more btn" // Clases CSS para el botón de "Añadir a deseos"
          onClick={() => addItem(x)} // Llama a la función 'addItem' del WishContext al hacer clic, pasando el objeto del producto 'x'
        >
          ❤️ {/* Ícono de corazón para añadir a la lista de deseos */}
        </button>
      </div>
    </div>
  );
}

export default Item; // Exporta el componente Item como la exportación por defecto de este archivo.
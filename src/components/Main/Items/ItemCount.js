import React, { useState, useContext, useEffect } from "react"; // Importa React, el hook useState para el estado local,
// useContext para acceder al contexto y useEffect para efectos secundarios (como la sincronización del estado).
import "../main.css"; // Importa los estilos CSS generales.
import { CartContext } from "../../../context/cartContext"; // Importa el CartContext para interactuar con el estado del carrito.

// Define y exporta el componente funcional ItemCount.
// Recibe 'item' (los datos del producto) como prop.
export const ItemCount = ({ item }) => {
  // Usa useContext para acceder a la función 'addItem' (para agregar al carrito)
  // y al estado 'cart' (el contenido actual del carrito) desde CartContext.
  const { addItem, cart } = useContext(CartContext);

  // Define el estado local 'counter', que representa la cantidad de este producto que el usuario quiere agregar.
  // Se inicializa en 1.
  const [counter, setCounter] = useState(1);

  // Nuevo estado 'currentQtyInCart', que almacena la cantidad de este producto que YA está en el carrito.
  // Se inicializa en 0.
  const [currentQtyInCart, setCurrentQtyInCart] = useState(0);

  // Hook useEffect: Se ejecuta cada vez que el carrito ('cart') o el ID del ítem ('item.id') cambian.
  // Su propósito es mantener 'currentQtyInCart' sincronizado con la cantidad real de este ítem en el carrito.
  useEffect(() => {
    // Busca si el ítem actual (item.id) ya existe en el carrito.
    const itemInCart = cart.find(cartItem => cartItem.item.id === item.id); // Asegúrate que cartItem.id sea cartItem.item.id

    // Si el ítem se encuentra en el carrito:
    if (itemInCart) {
      // Actualiza 'currentQtyInCart' con la cantidad de ese ítem en el carrito.
      setCurrentQtyInCart(itemInCart.counter); // Asegúrate que la propiedad sea 'counter' y no 'quantity'
    } else {
      // Si el ítem no está en el carrito, establece 'currentQtyInCart' en 0.
      setCurrentQtyInCart(0);
    }
  }, [cart, item.id, item.stock]); // Dependencias: Se re-ejecuta cuando 'cart', 'item.id' o 'item.stock' cambian.
  // Se agregó item.stock como dependencia para que el contador se reinicie si el stock cambia, por ejemplo, si el item ya está agotado.

  // Función 'onAdd': Incrementa la cantidad a añadir ('counter').
  const onAdd = () => {
    // Verifica si la suma de la cantidad actual en el contador más la cantidad ya en el carrito
    // no excede el stock disponible del producto.
    if (counter + currentQtyInCart < item.stock) {
      setCounter(counter + 1); // Incrementa el contador en 1.
    } else {
      // Si se supera el stock, opcionalmente, se puede mostrar un mensaje en consola (o a la UI).
      console.log("No puedes agregar más, se supera el stock disponible.");
    }
  };

  // Función 'onDecrease': Decrementa la cantidad a añadir ('counter').
  const onDecrease = () => {
    // Asegura que el contador no baje de 1, ya que no tiene sentido agregar 0 o menos.
    if (counter > 1) {
      setCounter(counter - 1); // Decrementa el contador en 1.
    }
  };

  // Función 'handleAddToCart': Se llama cuando el usuario hace clic en "Agregar al carrito".
  const handleAddToCart = () => {
    // Verifica nuevamente que la cantidad total a agregar (lo que ya hay + lo que se quiere añadir)
    // no exceda el stock disponible del producto.
    if (currentQtyInCart + counter <= item.stock) {
      // Si la cantidad es válida, llama a la función 'addItem' del contexto del carrito,
      // pasando el ítem y la cantidad ('counter') a agregar.
      addItem(item, counter);
      // Opcional: Reiniciar el contador a 1 después de añadir al carrito o ajustarlo.
      // setCounter(1); // Podrías resetearlo a 1 después de añadir.
    } else {
      // Si la cantidad excede el stock:
      console.log("No se puede agregar esa cantidad. Excede el stock total.");
      // Opcional: Ajusta el contador a la cantidad máxima que se puede añadir
      // si aún queda algo de stock disponible. Si el stock es 0, lo pone en 1 (o 0 si prefieres).
      setCounter(item.stock - currentQtyInCart > 0 ? item.stock - currentQtyInCart : 1);
    }
  };

  // Renderiza la interfaz de usuario del componente ItemCount.
  return (
    <div>
      <div className="card__product--btn_qty card__detail--btn_qty">
        {/* Botón para decrementar la cantidad */}
        <button onClick={onDecrease}>-</button>
        {/* Muestra la cantidad actual seleccionada por el usuario */}
        <p>{counter}</p>
        {/* Botón para incrementar la cantidad */}
        <button onClick={onAdd}>+</button>
      </div>

      {/* Botón "Agregar al carrito" */}
      <button className="card__detail--btn_add btn" onClick={handleAddToCart}>
        Agregar al carrito
      </button>

      {/* Mensaje condicional: Si ya hay unidades de este producto en el carrito */}
      {currentQtyInCart > 0 && (
        <p className="qty-in-cart-message">Ya tienes {currentQtyInCart} en el carrito.</p>
      )}

      {/* Mensaje condicional: Si la suma de lo que hay en el contador y en el carrito
          alcanza o supera el stock total (y el stock no es cero) */}
      {(counter + currentQtyInCart >= item.stock && item.stock > 0) && (
        <p className="no-more-stock-message">Stock máximo alcanzado ({item.stock}).</p>
      )}

      {/* Mensaje condicional: Si el producto no tiene stock disponible */}
      {item.stock === 0 && <p className="no-stock-message">Producto sin stock</p>}
    </div>
  );
};
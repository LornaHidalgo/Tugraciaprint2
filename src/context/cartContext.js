import React, { useState, createContext, useEffect } from "react"; // Importa useEffect

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Inicializa el estado del carrito.
  // Intentamos cargar el carrito desde localStorage al inicio.
  // Si no hay datos en localStorage o hay un error, se inicializa como un array vacío.
  const [cart, setCart] = useState(() => {
    try {
      const localCart = localStorage.getItem('cart');
      // Si hay datos en localStorage, los parseamos de JSON a un objeto JavaScript.
      // Si no hay, o si hay un error al parsear, devolvemos un array vacío.
      return localCart ? JSON.parse(localCart) : [];
    } catch (error) {
      // Captura cualquier error durante la carga (ej. JSON malformado)
      console.error("Error al cargar el carrito desde localStorage:", error);
      return []; // Devuelve un carrito vacío en caso de error
    }
  });

  // Usa useEffect para guardar el carrito en localStorage cada vez que el estado 'cart' cambie.
  // Esto asegura que los cambios se persistan automáticamente.
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
      console.error("Error al guardar el carrito en localStorage:", error);
    }
  }, [cart]); // El efecto se ejecuta cada vez que 'cart' cambia

  // Función 'addItem': Agrega un producto al carrito o actualiza su cantidad si ya existe.
  const addItem = (item, counter) => {
    // Busca si el producto (identificado por item.id) ya está en el carrito.
    const isInCart = cart.find((cartItem) => cartItem.item.id === item.id);

    let newQuantity = counter; // Cantidad a añadir si el ítem es nuevo
    if (isInCart) {
      newQuantity = isInCart.counter + counter; // Nueva cantidad total si ya existe
    }

    // --- Lógica de Validación de Stock ---
    // Si la cantidad calculada excede el stock disponible del producto,
    // ajusta newQuantity al stock máximo o no hagas nada.
    if (newQuantity > item.stock) {
      // Opcional: Podrías mostrar un error o un mensaje al usuario aquí.
      console.warn(`No se puede añadir más de ${item.stock} unidades de ${item.title}.`);
      newQuantity = item.stock; // Ajusta la cantidad a añadir al stock máximo.
      // Si newQuantity termina siendo 0 o menos, podrías decidir no añadir nada.
      if (newQuantity <= 0) {
        console.warn(`Producto ${item.title} sin stock disponible para añadir.`);
        return; // No se añade el producto si no hay stock disponible.
      }
    }
    // --- Fin Lógica de Validación de Stock ---

    // Si el producto ya está en el carrito:
    if (isInCart) {
      // Filtra el carrito para crear un nuevo array sin el producto que estamos actualizando.
      const newCart = cart.filter((cartItem) => cartItem.item.id !== item.id);
      // Actualiza el estado del carrito: añade los productos que no se actualizaron,
      // y luego añade el producto actualizado con la 'newQuantity' ya validada.
      setCart([...newCart, { item, counter: newQuantity }]);
    } else {
      // Si el producto NO está en el carrito:
      // Añade el nuevo producto con su 'newQuantity' ya validada.
      setCart([...cart, { item, counter: newQuantity }]);
    }
  };

  const removeItem = (id) => {
    const newItem = cart.filter(({ item }) => item.id !== id);
    setCart(newItem);
  };

  const clearCart = () => {
    setCart([]); // Limpia el estado del carrito
    // También limpia el carrito de localStorage para que la persistencia funcione correctamente
    localStorage.removeItem('cart');
  };

  const getSubtotal = (counter, price) => {
    let result = counter * price;
    return result;
  };

  function sumar(lista) {
    let resultado = 0;
    for (let i = 0; i < lista.length; i++) {
      resultado += lista[i];
    }
    return resultado;
  }

  const getTotal = () => {
    let subtotales = cart.map((cartItem) => cartItem.counter * cartItem.item.price);
    return sumar(subtotales);
  };

  // Esta función calcula la cantidad total de ítems en el carrito.
  // Es la función que necesitas usar en tu CartWidget.
  const itemQuantity = () => {
    let q = cart.map((cartItem) => cartItem.counter);
    let result = sumar(q);
    return result;
  };

  return (
    <CartContext.Provider
      value={{
        addItem,
        removeItem,
        clearCart,
        cart,
        getSubtotal,
        getTotal,
        itemQuantity, // Asegúrate de que itemQuantity se exporte aquí
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

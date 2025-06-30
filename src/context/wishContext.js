import React, { useState, createContext } from "react";
import {successAlert, declainAlert} from "../helpers/Alerts"

export const WishContext = createContext();

export const WishProvider = ({ children }) => {
  const [wish, setWish] = useState([]);

  const addItem = (item) => {
    const isInWish = wish.find((Wish) => Wish.item.id === item.id);

    if (isInWish) {
      declainAlert("Este producto ya está en favoritos")
    } else {
      setWish([...wish, { item }]);
      successAlert("Añadido a favoritos 😃")
    }
  };

  const removeItem = (id) => {
    const newItem = wish.filter(({ item }) => item.id !== id);
    setWish(newItem);
  };

  const clearWish = () => setWish([]);

  const itemQuantity = () => {
    let result = wish.length;
    return result;
  };

  return (
    <WishContext.Provider
      value={{
        addItem,
        removeItem,
        clearWish,
        wish,
        itemQuantity,
      }}
    >
      {children}
    </WishContext.Provider>
  );
};
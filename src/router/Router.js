import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { NavBar } from "../components/NavBar/navBar";
import { Home } from "../components/Main/Home/Home";
import { Contacto } from "../components/Main/Contacto/Contacto";
import { WishList } from "../components/Main/WishList/WishList";
import { Cart } from "../components/Main/Cart/Cart";
import { ItemListContainer } from "../components/Main/Items/ItemListContainer";
import { ItemDetailContainer } from "../components/Main/Items/ItemDetailContainer";
import { CartProvider } from "../context/cartContext";
import { WishProvider } from "../context/wishContext";
import { OrderForm } from "../components/Main/Order/Order";
import { NoMatch } from "../components/NoMatch/NoMatch";

export const Router = () => {
  return (
    <div>
      <BrowserRouter>
        <CartProvider>
          <WishProvider>
            <NavBar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/contacto" component={Contacto} />
              <Route
                path="/productos/:category"
                component={ItemListContainer}
              />
              <Route exact path="/item/:id" component={ItemDetailContainer} />
              <Route exact path="/wishlist" component={WishList} />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/checkout" component={OrderForm} />
              <Route path="*" componente={NoMatch}>
            <NoMatch />
          </Route>
            </Switch>
          </WishProvider>
        </CartProvider>
      </BrowserRouter>
    </div>
  );
};

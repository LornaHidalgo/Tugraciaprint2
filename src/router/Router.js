import React, { useContext, useEffect } from "react";
// Importa Link y useLocation para acceder al estado de la ruta
import { BrowserRouter, Switch, Route, Link, useLocation } from "react-router-dom"; 

import { NavBar } from "../components/NavBar/navBar";
import { Home } from "../components/Main/Home/Home";
import { Contacto } from "../components/Main/Contacto/Contacto";
import { WishList } from "../components/Main/WishList/WishList";
import { Cart } from "../components/Main/Cart/Cart"; // Corrección: 'Cart' en lugar de 'Cart '
import { ItemListContainer } from "../components/Main/Items/ItemListContainer";
import { ItemDetailContainer } from "../components/Main/Items/ItemDetailContainer";
import { CartProvider, CartContext } from "../context/cartContext"; // Importa CartContext
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
              
              {/* --- RUTA DE CONFIRMACIÓN DE ORDEN --- */}
              {/* Esta ruta renderiza OrderConfirmationPage, que ahora puede recibir el link de WhatsApp */}
              <Route exact path="/order-confirmation" component={OrderConfirmationPage} />
              {/* --- FIN RUTA --- */}

              {/* Ruta para 404 - asegura que 'component' prop se use */}
              <Route path="*" component={NoMatch} />
            </Switch>
          </WishProvider>
        </CartProvider>
      </BrowserRouter>
    </div>
  );
};

// --- COMPONENTE PARA LA PÁGINA DE CONFIRMACIÓN DE ORDEN ---
const OrderConfirmationPage = () => {
    const { clearCart } = useContext(CartContext);
    const location = useLocation(); // Hook para acceder al objeto 'location'
    // Accede al link de WhatsApp que se pasó como estado en history.push
    const receivedWhatsappLink = location.state?.whatsappLink; 

    useEffect(() => {
        // Limpia el carrito cuando se llega a la página de confirmación
        clearCart();
    }, [clearCart]);

    return (
        <div className="payment-page-container">
            <h1 className="payment-success-h1">¡Orden Enviada! 🎉</h1>
            <p>Hemos recibido los detalles de tu orden. En breve revisaremos tu solicitud.</p>
            <p>Ya te hemos redirigido a WhatsApp para que te comuniques directamente con nosotros y coordinemos la entrega.</p>
            <p>¡Muchas gracias por tu Preferencia!</p>
            
            {/* Mensaje adicional y botón de WhatsApp */}
            <p className="mt-4 text-muted">
                Si la ventana de WhatsApp no se abrió automáticamente, o si necesitas volver a contactarnos, puedes hacerlo aquí:
            </p>
            
            {/* El botón de WhatsApp solo se muestra si el link fue recibido */}
            {receivedWhatsappLink && ( 
                <a
                    href={receivedWhatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-payment-status btn-primary-status mt-2" // Reutiliza estilos de botón
                    // Puedes añadir un estilo inline si quieres que se vea como WhatsApp
                    style={{ backgroundColor: '#25D366', borderColor: '#25D366', color: 'white' }} 
                >
                    <i className="fab fa-whatsapp me-2"></i> Ir a WhatsApp
                </a>
            )}

            <div className="payment-page-buttons mt-4">
                <Link to="/" className="btn-payment-status btn-secondary-status">
                    Volver al inicio
                </Link>
            </div>
        </div>
    );
};

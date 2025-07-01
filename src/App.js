import React from "react";

import { Router } from "./router/Router";
import { Footer } from "./components/Footer/Footer";
import './App.css';



export const App = () => {
  return (
    <div>
      <Router />
     
      <Footer />
      
{/* WhatsApp icon */}
      <a
        href="https://api.whatsapp.com/send?phone=56928481332&text=%C2%A1Hola!%20%F0%9F%98%8A"
        className="whatsapp_float"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fab fa-whatsapp whatsapp-icon"></i> {/* Cambiado a fab para Font Awesome 5+ */}
      </a>
    </div>
    
  );
};

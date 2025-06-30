import React from "react";
import {  Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

import "../main.css";

export const Home = () => {
  return (
    <div>
      
      <Carousel>
        <Carousel.Item>
          <img className="bannerHome " src="banner.png" alt="First slide" />
          <Carousel.Caption>
         
            
            <p>Bienvenido a la tienda online de Tu Gracia Print</p>
            <button 
          className="button-primary">
            <Link to="/productos/all">Comprar</Link>
          
        </button>
            
          </Carousel.Caption>
        </Carousel.Item>
        
      </Carousel>
      
    </div>
  );
};

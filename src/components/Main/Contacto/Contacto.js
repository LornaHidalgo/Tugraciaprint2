import React from "react";
import { Container } from "react-bootstrap";
import "./Contacto.css";

export const Contacto = () => {
  return (
    <div>
      <section className="contacto container main">
        <Container>
          <div className="contacto__texto">
            <h2>CONTÁCTANOS</h2>
            <p>
              Hablemos por{" "}
              <a href="https://www.instagram.com/tugraciaprint/">Instagram</a> 
              .
            </p>
          </div>
        </Container>

        <div className="contacto__redes">
          <div>
            <a href="https://www.instagram.com/sunwater.ar/" target="_blanck">
              <i className="fab fa-instagram-square fa-5x"></i>
            </a>
            <a
              href="https://www.instagram.com/tugraciaprint/"
              className="contacto__redes--texto"
              target="_blanck"
            >
              @tugraciaprint
            </a>
          </div>
         
        </div>
      </section>

      <section className="redes">
        <div className="redes__div">
          <h2>SIGUENOS EN INSTAGRAM</h2>
          <h2 className="redes__div--dots">. . . . . </h2>
          <div className="redes__div--instagram">
            <a href="https://www.instagram.com/tugraciaprint/" target="_blanck">
              <i className="fab fa-instagram-square fa-5x"></i>
            </a>
            <a
              href="https://www.instagram.com/tugraciaprint/"
              target="_blanck"
              className="redes__div--instagram--link"
            >
              @tugraciaprint
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

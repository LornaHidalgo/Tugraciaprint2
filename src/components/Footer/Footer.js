import React from 'react';
import "./Footer.css";




export const Footer = () => {
    return (
        
        <div className="footer cointainer">

            <div className="footer__logo">

                <img src="tugraciaprint.png"alt="Logo HitakuStore"/>
               

            </div>
            <div>
                
                
            </div>

            <div className="footer__redes">

                <a href="https://www.instagram.com/tugraciaprint/" target="_blanck" rel="noreferrer">
                    <i className="fab fa-instagram-square fa-2x"></i>
                </a>
                

            </div>
          

            <div className="footer__derechos-lugar">
                <p><i className="fas fa-map-marker-alt"></i> Chile</p>
                <p>TuGraciaPrint® 2025</p>
            </div>
            

        </div>
        
    );
} 
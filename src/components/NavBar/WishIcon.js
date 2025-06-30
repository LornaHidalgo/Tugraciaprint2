import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";

export const WishIcon = () => {
  return (
    <Link to="/wishlist" className="cartWidget">
      <i className="far fa-heart"></i>
    </Link>
  );
};
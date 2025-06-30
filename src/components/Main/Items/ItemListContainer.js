import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Container } from "react-bootstrap";
import { ItemList } from "./ItemList";
import { getFirestore } from "../../../firebase/index";
import "../main.css";

export const ItemListContainer = () => {
  const [state, setState] = useState([]);
  const { category } = useParams();

  useEffect(() => {
    let arr = [];
    getFirestore()
      .collection("productos")
      .get()
      .then((doc) => {
        doc.docs.map((item) => arr.push({ id: item.id, ...item.data() }));
        if (category !== "all") {
          setState(arr.filter((item) => item.categoryName === category));
        } else {
          setState(arr);
        }
      });
    
  }, [category]);

  return (
    <div>
      <Container className="main">
        {state.length > 0 ? <ItemList state={state} /> : <p>Cargando...</p>}
      </Container>
    </div>
  );
};

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getFirestore } from "../../../firebase/index";
import { ItemDetail } from "./ItemDetail";
import "../main.css";

export const ItemDetailContainer = () => {
  const [state, setState] = useState([]);
  const { id } = useParams();
  
  useEffect(() => {
    const db = getFirestore();
        db.collection('productos').doc(id)
        .get()
        .then(res => {
          setState({id:res.id, ...res.data()})
        })
      }, [id]);
      
  return (
    <div className="main">
      {state && (
        <ItemDetail
        state={state}
        />
        )}
    </div>
  );
};
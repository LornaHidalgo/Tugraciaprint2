import React from "react";
import "../main.css";
import Item from "./Item"

export const ItemList = (props) => {
  
    return (
    <div className="productos main">
      <>
        {props.state.map((x) => (
          <Item x={x} key={x.id} />
        ))}
      </>
    </div>
  );
};
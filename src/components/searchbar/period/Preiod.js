import React from "react";

import Departure from "./Departure";
import Arrival from "./Arrival";

import "./Preiod.css";

function Preiod() {
  return (
    <div className="preiod-container">
      <Departure />
      <Arrival />
    </div>
  );
}

export default Preiod;

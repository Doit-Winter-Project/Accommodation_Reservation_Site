import React from "react";

import Preiod from "./period/Preiod.js";
import Personnel from "./personnel/Personnel.js";
import Fee from "./fee/Fee.js";

import "./Searchbar.css";

function Searchbar() {
  return (
    <div className="sbcontainer">
      <div className="searchbar">
        <Preiod />
        <Fee />
        <Personnel />
      </div>
    </div>
  );
}

export default Searchbar;


import React from 'react';
import './Identity.css';
import { Link, Route } from 'react-router-dom';


function Identity(props) {
  return (
    <div className="Identity">
      <div id = "IdentityIdentity">
        {props.Identity}
      </div>
      <div id = "IdentityScope">
        {props.scope}
      </div>       
    </div>
  );
}

export default Identity;

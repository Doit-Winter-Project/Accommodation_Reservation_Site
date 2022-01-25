
import React from 'react';
import './Identity.css';
import { Link, Route } from 'react-router-dom';


function Identity(props) {
  return (
    <div className="Identity">
        {props.Identity}
        <br/>
        {props.scope}
    </div>
  );
}

export default Identity;


import React from 'react';
import './Sign.css';
import { Link, Route } from 'react-router-dom';


function Sign(props) {
  return (
    <div className="Minus">
        {props.sign}
    </div>
  );
}

export default Sign;


import React from 'react';
import './Menu.css';
import { Link, Route } from 'react-router-dom';


function Menu(props) {
  
  function Home(e){
    window.location.href = props.link;
  }
  return (
    <div onClick = {Home} className="Menu">
        {props.name} 
    </div>
  );
}

export default Menu;

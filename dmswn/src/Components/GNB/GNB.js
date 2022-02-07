
import React from 'react';
import Menu from './Menu/Menu';
import Logo from './Logo/Logo';
import Mypage from './Mypage/Mypage';
import './GNB.css';
import { Link, Route } from 'react-router-dom';


function GNB(props) {
  return (
    <div className="GNB">
      <div className = "GNB.Logo">
        <Logo />
      </div>
 
      <div className = "GNBMenu">
        <Menu link = '/accommodation' name = "숙소" />
        <Menu link = '/experience' name = "체험" />
        <Menu link = '/onlineExperience' name = "온라인체험" />
      </div>
      <div className = "GNBMypage">
        <Mypage id = 'dmswn'/>
      </div>
    </div>
  );
}

export default GNB;


import React from 'react';
import Menu from './Menu/Menu';
import Logo from './Logo/Logo';
import Mypage from './Mypage/Mypage'
import { Link, Route } from 'react-router-dom';


function GNB(props) {
  return (
    <div className="GNB">
        <Logo />
        <Menu link = '/accommodation' name = "숙소" />
        <Menu link = '/experience' name = "체험" />
        <Menu link = '/onlineExperience' name = "온라인체험" />
        <Mypage id = 'dmswn'/>
    </div>
  );
}

export default GNB;

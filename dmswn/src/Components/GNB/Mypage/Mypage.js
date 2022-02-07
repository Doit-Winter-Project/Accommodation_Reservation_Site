
import React from 'react';
import './Mypage.css';
import mypageImg from './mypageImg.png';
import { Link, Route } from 'react-router-dom';


function Mypage(props) {
  
  function Home(e){
    window.location.href = '/Mypage/' + props.id;
  }
  return (
    
    <div onClick = {Home} className="Mypage">
        <img className = "MypageImg" src = {mypageImg} alt = ""/>
    </div>
  );
}

export default Mypage;

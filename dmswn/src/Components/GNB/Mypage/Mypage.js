
import React from 'react';
import './Mypage.css';
import { Link, Route } from 'react-router-dom';


function Mypage(props) {
  
  function Home(e){
    window.location.href = '/Mypage/' + props.id;
  }
  return (
    <div onClick = {Home} className="Myapge">
        Mypage
    </div>
  );
}

export default Mypage;

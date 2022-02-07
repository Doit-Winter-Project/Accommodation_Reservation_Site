
import React, {useState} from 'react';
import styles from './SearchBar.css';
import searchImg from './search.png';
import Personnel from './Personnel/Personnel';
import TravelDay from './TravelDay/TravelDay';
import "react-datepicker/dist/react-datepicker.css";
import { Link, Route } from 'react-router-dom';


function SearchBar(props) {
  function PersonnelOn(e){
    window.location.href = '/Mypage/' + props.id;
  }
  const [viewPersonnel, setViewPersonnel] = useState(false)
  return (
    <div className = "SearchBar">
      <div className = "SearchBarBtn" id = {styles.Fee}>
        <div className = "SearchBarHeader">
          체크인
        </div>
        <div className = "SearchBarContent">
          날짜입력
        </div>
      </div>
      <div className = "SearchBarBtn" id = {styles.Fee}>
        <div className = "SearchBarHeader" id = "SearchBarCheckOut">
          체크아웃
        </div>
        <div className = "SearchBarContent">
          날짜입력
        </div>
      </div> 
      <div className = "SearchBarBtn" id = {styles.TravelDay}>
        <div className = "SearchBarHeader">
          요금
        </div>
        <div className = "SearchBarContent">
          금액대 설정
        </div>
      </div>
      <div className = "SearchBarBtn" id = {styles.Personnel}>
        <div className = "SearchBarHeader">
          인원
        </div>
        <div onClick = {() => viewPersonnel ? setViewPersonnel(false) : setViewPersonnel(true)} className = "SearchBarContent">
          게스트 추가
        </div>
      </div>
      <div className = "SearchBarBtn" >
        <img src = {searchImg} alt = "" id = "SearchBarSearch"/>
      </div>
      {viewPersonnel ? 
          <div className = "SearchBarPersonnel">
            <div className='DD'>
              <Personnel Identity = "성인" scope = "만 13세 이상"/>
            </div>
            <div className='SearchBarLine'></div>
            <div className='DD'>
              <Personnel Identity = "어린이" scope = "만 2~12세"/>
            </div>
            <div className='SearchBarLine'></div>
            <div className='DD'>
              <Personnel Identity = "유아" scope = "만 2세 미만"/>
            </div>
          </div>  : null}
          <div className = "SearchBarContent" >
          <TravelDay/>
        </div>
    </div>
  );
}

export default SearchBar;

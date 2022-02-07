
import React, { useState } from 'react';
import Identity from './PersonnelSum/Identity/Identity';
import './Personnel.css';
import Sign from './PersonnelSum/Sign/Sign';
import { Link, Route } from 'react-router-dom';


function Personnel(props){
  const [number, setNumber] = useState(0)
  return (
    <div className="PersonnelSum">
      <div id = "PersonnelFront">
        <Identity Identity = {props.Identity} scope = {props.scope}/>
      </div>
      <div id = "PersonnelNumber">
        <div className= "PersonnelNumber" onClick = {() => setNumber(number-1)}>
          <Sign sign = "-"/>
        </div>
        <div className= "PersonnelNumber" id ="PersonnelNum">
          {number}
        </div> 
        <div className= "PersonnelNumber" onClick = {() => setNumber(number+1)}>
          <Sign sign = "+"/>
        </div>
      </div>
    </div>
  )
}
/*
class Personnel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {number: 0};

    // This binding is necessary to make `this` work in the callback
    this.plus = this.plus.bind(this);
    this.minus = this.minus.bind(this);
  }

  plus() {
    this.setState(prevState => ({
      number: prevState.number+1
    }));
  }
  minus() {
    this.setState(prevState => ({
      number: prevState.number-1
    }));
  }

  render() {
    return (
      <div className="PersonnelSum">
      <Identity Identity = '{props.Identity}' scope = '{props.scope} '/>
      <div onClick = {this.minus}>
          <Minus/>
      </div>
      {this.state.number}
      <div onClick = {this.plus}>
          <Plus/>
      </div>
  </div>
    );
  }
}
*/
export default Personnel;

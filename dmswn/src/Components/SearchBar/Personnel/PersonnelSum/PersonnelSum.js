
import React from 'react';
import Identity from './PersonnelSum/Identity/Identity';
import Plus from './PersonnelSum/Plus/Plus';
import Minus from './PersonnelSum/Minus/Minus';
//import './Personnel.css';
import { Link, Route } from 'react-router-dom';



class PersonnelSum extends React.Component {
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

export default PersonnelSum;

import React from "react";

import { RiUser3Line, RiMenuFill } from "react-icons/ri";

import "./GNB.css";

function GNB() {
  return (
    <div className="GNB">
      <div className="left-tap icon">
        <p className="logo">LOGO</p>
      </div>
      <div className="center-tap">
        <p className="icon">숙소</p>
        <p className="icon">체험</p>
        <p className="icon">온라인 체험</p>
      </div>
      <div className="right-tab mypage">
        <RiMenuFill className="menu icon" />
        <div className="account-background icon">
          <RiUser3Line className="my-account" />
        </div>
      </div>
    </div>
  );
}

export default GNB;

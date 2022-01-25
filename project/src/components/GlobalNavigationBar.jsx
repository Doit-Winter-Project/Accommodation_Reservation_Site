import { useState, useEffect, useRef } from 'react';

// css
import "../css/GlobalNavigationBar.css";

// components
import SearchBar from "./GNB/SearchBar";
import ProfileControl from "./GNB/ProfileControl";

function Services() {
    return <div className="services-area">
        <span className="service-text service-accom">숙소</span>
        <span className="service-text service-participate-offline">체험</span>
        <span className="service-text service-participate-online">온라인 체험</span>
    </div>
}

function GlobalNavigationBar({  }) {

    return <nav className="global-navigation">
        <span className="logo">LOGO</span>
        <Services/>
        <SearchBar/>
        <ProfileControl/>
    </nav>;
}

export default GlobalNavigationBar;
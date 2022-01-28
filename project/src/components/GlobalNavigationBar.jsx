import { useState, useEffect, useRef } from 'react';

// css
import "../styles/GlobalNavigationBar.css";

// components
import SearchBar from "./GNB/SearchBar";
import ProfileControl from "./GNB/ProfileControl";
import FilterControl from './GNB/FilterControl';

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
        <div className="search-area-wrap">
            <SearchBar/>
            <FilterControl/>
        </div>
        <ProfileControl/>
    </nav>;
}

export default GlobalNavigationBar;
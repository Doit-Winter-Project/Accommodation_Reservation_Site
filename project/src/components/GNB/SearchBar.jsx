import { useState, useEffect, useRef } from 'react';

// css
import "../../css/SearchBar.css";

// component
import FilterArea from '../FilterArea';

function SearchBar({ props }) {


    return <div className="search-bar">
        <div className="search-bar-innerwrap">
            <FilterArea type="check-date"/>
            <FilterArea type="price"/>
            <FilterArea type="personnel" split={ false }/>
        </div>
    </div>;
}

export default SearchBar;
import { useState, useEffect, useRef } from 'react';

// css
import "../../css/FilterBlock.css";


function FilterBlock({
    // static value
    title: filter_title, placeholder,
    // variable
    selected: selected_value,
}) {

    return <div className="filter-block">
        <span className="filter-title">{ filter_title }</span>
        <span className="filter-selected">{ selected_value || placeholder }</span>
    </div>;
}

export default FilterBlock;
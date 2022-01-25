import { useState, useEffect, useRef } from 'react';

// css
import "../css/FilterArea.css";

// component
import FilterBlock from './FilterArea/FilterBlock';

function FilterArea({ 
    // rendering option
    type, split,
    // styling option
    className, id,
    // action variables
    onClick
}) {

    return <div 
        id={ id || null } 
        className={ "filter-area " + ( className || "" ) } 
        onClick={ onClick }
        style={{
            gridTemplateColumns: ( type === "check-date" ) && `40% 60%`
        }}
    > 
        {
            ( type === "check-date" ) ? <>
                <FilterBlock title="체크인" selected={ "" } placeholder="날짜 입력" />
                <FilterBlock title="체크아웃" selected={ "" } placeholder="날짜 입력" />
            </> :
            ( type === "price" ) ? <>
                <FilterBlock title="요금" selected={ "" } placeholder="금액대 설정" />
            </> :
            ( type === "personnel" ) ? <>
                <FilterBlock title="인원" selected={ "" } placeholder="게스트 추가" />
            </> :
            <></>
        }
        { ( split !== false ) && <div className="filter-split-bar"/> }
    </div>;
}

export default FilterArea;
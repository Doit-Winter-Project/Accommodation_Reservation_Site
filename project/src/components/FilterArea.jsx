import { useState, useEffect, useRef, useCallback } from 'react';

// css
import "../styles/FilterArea.css";

// recoil
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import states from "../recoil/state";

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

    // update props control state
    const [ filterCtrlMode, setFilterCtrlMode ] = useRecoilState( states.filterCtrlMode );

    const activeFilterControl = useCallback(() => {
        
        // console.log("open props control", type);
        if ( type === filterCtrlMode?.type ) return setFilterCtrlMode(null);

        let option;
        switch(type) {
            case "check-date":
                option = {
                    "check-in": { y: new Date().getFullYear(), m: new Date().getMonth()+1, d: -1 },
                    "check-out": { 
                        y: ( new Date().getMonth()+1 === 12 )
                            ? new Date().getFullYear()+1
                            : new Date().getFullYear(), 
                        m: ( new Date().getMonth()+1 === 12 )
                            ? 1
                            : new Date().getMonth()+2,
                        d: -1
                    },
                };
                break;
            case "price":
            case "personnel":
            default:
                break;
        }
        setFilterCtrlMode({
            type,
            option
        });
    }, [ filterCtrlMode ])


    // reset button click handler
    const recoilStateObject = states[ type === "check-date" ? "checkDatesState" : `${ type }State` ];
    const state = useRecoilValue( recoilStateObject );
    const resetState = useResetRecoilState( recoilStateObject );

    const _resetBtnHandler = () => {
        resetState();
    }

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
                <FilterBlock title="체크인" selected={ "checkInDateState" } placeholder="날짜 입력" onClick={ activeFilterControl } key="FilterBlock-checkInDateState"/>
                <FilterBlock title="체크아웃" selected={ "checkOutDateState" } placeholder="날짜 입력" onClick={ activeFilterControl } key="FilterBlock-checkOutDateState"/>
            </> :
            ( type === "price" ) ? <>
                <FilterBlock title="요금" selected={ "priceState" } placeholder="금액대 설정" onClick={ activeFilterControl }/>
            </> :
            ( type === "personnel" ) ? <>
                <FilterBlock title="인원" selected={ "personnelState" } placeholder="게스트 추가" onClick={ activeFilterControl }/>
            </> :
            <></>
        }
        { ( split !== false ) && <div className="filter-split-bar"/> }
        {
            ( !state.init ) && <svg className="data-reset-button" width="24" height="24" viewBox="0 0 24 24" fill="none" onClick={ _resetBtnHandler }>
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#F5F5F7"/>
                <path d="M15 9L9 15" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 9L15 15" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        }
    </div>;
}

export default FilterArea;
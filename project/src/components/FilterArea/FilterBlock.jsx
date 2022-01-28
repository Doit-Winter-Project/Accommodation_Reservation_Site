import { useState, useEffect, useRef } from 'react';

// recoil
import { useRecoilState, useRecoilValue } from 'recoil';
import states from "../../recoil/state";

// css
import "../../styles/FilterBlock.css";


function FilterBlock({
    // static value
    title: filter_title, placeholder,
    // variable
    selected: selected_value,
    // action functions
    onClick
}) {

    const [ state, setState ] = useRecoilState( states[ selected_value ] );  // 컴포넌트가 참조중인 전역상태
    const { check_in: { y: check_in_y }, check_out: { y: check_out_y } } = useRecoilValue( states.checkDatesState ); // 체크인 & 체크아웃 년도만 구조 분해 할당

    const [ displayState, setDisplayState ] = useState( state.init ? placeholder : "" ); // 표시 데이터
    const [ valueDisplay, setValueDisplay ] = useState(true); // 현재 표시여부

    
    // animation handler for selected value change
    const setDesignedDisplayState = ( newState ) => {
        setValueDisplay(false);
        setTimeout(() => {
            setDisplayState( newState );
            setValueDisplay(true);
        }, 150);
    }

    // set display state
    useEffect(() => {
        if ( state.init ) setDesignedDisplayState( placeholder );
        else switch(selected_value) {
            case "checkInDateState":
            case "checkOutDateState":
                setDesignedDisplayState( 
                    ( check_in_y === check_out_y ) ?
                    `${ state.m }월 ${ state.d }일` :
                    `${ state.y }년 ${ state.m }월 ${ state.d }일`
                );
                break;
            case "priceState":
                break;
            case "personnelState":
                break;
        }
    }, [ state, check_in_y, check_out_y ]);
    

    return <div className="filter-block" onClick={ onClick || ( () => {} ) }>
        <span className="filter-title">{ filter_title }</span>
        <span className={ "filter-selected" + ( ( valueDisplay ) ? " selected-display" : " selected-undisplay" ) }>{ displayState }</span>
    </div>;
}

export default FilterBlock;
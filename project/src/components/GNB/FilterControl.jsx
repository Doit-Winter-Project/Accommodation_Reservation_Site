import { useState, useEffect, useRef } from 'react';

// css
import "../../styles/FilterControl.css";

// recoil
import { useRecoilValue } from 'recoil';
import states from "../../recoil/state";

// component
import Calender from './FilterControl/Calender';
import Price from './FilterControl/Price';

function FilterControl() {

    // detect props control state changes
    const filterCtrlMode = useRecoilValue( states.filterCtrlMode );

    const [ type, setType ] = useState(null); // filterCtrlMode.type; props-control-out 키프레임 적용을 위해 분기
    const [ filterClose, setFilterClose ] = useState(false); // 필터 비활성화 여부; props-control-out 키프레임 적용을 위해 분기

    useEffect(() => {
        console.log(filterCtrlMode);
        if ( filterCtrlMode ) {
            setFilterClose(false);
            setType(filterCtrlMode.type);
        }
        else {
            setTimeout(() => {
                setFilterClose(true);
                setType(null);
            }, 200);
        }
    }, [ filterCtrlMode ])
    
    // update props control state layout
    const styleOption = {
        "check-date": {
            width: "100%",
            height: "450px",
            display: "grid",
            gridTemplateRows: "auto",
            gridTemplateColumns: "repeat(2, calc(50% - 5px))",
            gap: "10px",
            left: "0"
        },
        "price": {
            width: "calc(100% - 400px)",
            height: "350px",
            left: "400px"
        },
        "personnel": {
            width: "calc(100% - 600px)",
            height: "350px",
            left: "600px"
        },
    }


    return <>
        { ( !filterClose && <>
            <div 
                className={ "props-control" + ( filterCtrlMode ? " props-control-in" : " props-control-out" ) }
                style={ styleOption[ type ] }
            >
                { ( filterCtrlMode?.type === "check-date" ) && <>
                    <Calender type="check-in"/>
                    <Calender type="check-out"/>
                </> }
                { ( filterCtrlMode?.type === "price" ) && <>
                    <Price/>
                </> }
            </div>
        </> ) }
    </>;
}

export default FilterControl;
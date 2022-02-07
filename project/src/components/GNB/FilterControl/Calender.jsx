import { useState, useEffect, useRef, useCallback } from 'react';

// css
import "../../../styles/Calender.css";
import "../../../styles/ControlBlockComponent.css";

// recoil
import { useRecoilState, useRecoilValue } from 'recoil';
import states from "../../../recoil/state";


function Calender({ type }) {

    // detect props control state changes
    const [ filterCtrlMode, setFilerCtrlMode ] = useRecoilState( states.filterCtrlMode );


    // get & set check dates
    const [ checkDate, setCheckDate ] = useRecoilState( states[`check${ ( type === "check-in" ? "In" : "Out" ) }DateState`] )
    const checkDates = useRecoilValue( states.checkDatesState );


    // handle display month
    const [ y, setY ] = useState(-1);
    const [ m, setM ] = useState(-1);
    const [ dates, setDates ] = useState([]);

    useEffect(() => {

        // calculate days

        setDates( [] );

        const cy = filterCtrlMode.option[type].y;
        const cm = filterCtrlMode.option[type].m;
        
        let date_array = Array.from({ length: new Date(cy, cm, 0).getDate() }, (v, i) => i+1);
        date_array = Array.from({ length: new Date(cy, cm-1, 1).getDay() }, ( v, _i ) => null).concat( date_array );
        
        // console.log( type, filterCtrlMode.option[type].y, filterCtrlMode.option[type].m );
        // console.log(date_array);

        setY( filterCtrlMode.option[type].y );
        setM( filterCtrlMode.option[type].m );

        setTimeout(() => {
            setDates( date_array );
        }, 200);
        
        
    }, [ filterCtrlMode.option[type].m ]);


    // update display month
    const setMonth = ( mode ) => {
        switch( mode ) {
            case "up":
                if (
                    // 체크인 월을 변경할 경우
                    ( type === "check-in" )
                        // 체크인 월이 체크아웃 월보다 크지 못하도록 설정
                        ? ( !( ( filterCtrlMode.option["check-out"].y === y ) && ( filterCtrlMode.option["check-out"].m < m + 1 ) ) )

                    // 체크아웃 월을 변경할 경우
                    : ( type === "check-out" )
                        // 항상 허용
                        ? true
                    : false
                ) setFilerCtrlMode( p => ({ ...p, option: { ...p.option, [ type ]: {
                    y: ( p.option[ type ].m + 1 > 12 ) ? p.option[ type ].y + 1 : p.option[ type ].y,
                    m: ( p.option[ type ].m + 1 > 12 ) ? 1 : p.option[ type ].m + 1 
                } } }));
                return;
            case "down":
                if (
                    // 체크인 월을 변경할 경우
                    ( type === "check-in" )
                        // 현재 월보다 작은 월로 이동할 수 없도록 설정
                        ? ( !( ( new Date().getFullYear() === y ) && ( new Date().getMonth()+1 > m - 1 ) ) )

                    // 체크아웃 월을 변경할 경우
                    : ( type === "check-out" )
                        // 체크인 월보다 작은 월로 이동할 수 없도록 설정
                        ? ( !( ( filterCtrlMode.option["check-in"].y === y ) && ( filterCtrlMode.option["check-in"].m > m - 1 ) ) )
                    : false
                ) setFilerCtrlMode( p => ({ ...p, option: { ...p.option, [ type ]: {
                    y: ( p.option[ type ].m - 1 <= 0 ) ? p.option[ type ].y - 1 : p.option[ type ].y,
                    m: ( p.option[ type ].m - 1 <= 0 ) ? 12 : p.option[ type ].m - 1 
                } } }));
                return;
        }
    }

    // update selected date
    const isDateMoveUnable = useCallback(( date ) => {
        const checkIn = checkDates["check_in"], // 현재 체크인 설정값
        checkOut = checkDates["check_out"], // 현재 체크아웃 설정값
        checkInSelectTime = new Date(`${ checkIn.y }-${ checkIn.m }-${ checkIn.d }`).getTime(), // 현재 체크인 설정값의 ms 환산값
        checkOutSelectTime = new Date(`${ checkOut.y }-${ checkOut.m }-${ checkOut.d }`).getTime(), // 현재 체크아웃 설정값의 ms 환산값
        selectTime = new Date(`${ y }-${ m }-${ date }`).getTime(), // 방금 선택된 일자의 ms 환산값
        todayTime = new Date().getTime(); // 현재시간 ms 환산값

        return (
            (
                // 체크인 시간을 선택할 경우
                type === "check-in" &&
                (
                    // 오늘보다 과거를 선택할 수 없음 ( 오늘 - 선택일 > 0 : 설정불가 )
                    ( Math.floor( ( todayTime - selectTime ) / ( 1000 * 60 * 60 * 24 ) ) > 0 )
                    ||
                    // 체크아웃값이 있을 때, 체크아웃보다 미래를 선택할 수 없음 ( 체크아웃 - 선택일 < 0 : 설정불가 )
                    (
                        ( !Object.values( checkOut ).includes(-1) ) && 
                        ( Math.floor( ( checkOutSelectTime - selectTime ) / ( 1000 * 60 * 60 * 24 ) ) < 0 )
                    )
                )
            ) || (
                // 체크아웃 시간을 선택할 경우
                type === "check-out" &&
                ( 
                    // 체크인값이 있을 때, 체크인보다 과거를 선택할 수 없음 ( 선택일 - 체크인 < 0 : 설정불가 )
                    ( !Object.values( checkIn ).includes(-1) ) &&
                    ( Math.floor( ( selectTime - checkInSelectTime ) / ( 1000 * 60 * 60 * 24 ) ) < 0 )
                )
            )
        )
    }, [ y, m, checkDates ])

    const setDate = useCallback(( date ) => { 
        if ( isDateMoveUnable( date ) ) return;
        setCheckDate({ y, m, d: date });
    }, [ y, m, checkDates ]);


    // date click handler
    const _dateClickHandler = ( date ) => {
        if ( !date ) return;
        setDate( date );
    }


    return <div className="calender-block control-block-component">
        <div className="top-area">
            <svg className="arrows leftside-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" onClick={ () => setMonth("down") } style={{
                opacity: ( ( type === "check-in" ) && ( ( new Date().getMonth + 1 ) >= m ) ) && "none"
            }}>
                <path d="M15 18L9 12L15 6" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="calender-month">{ `${ y }년 ${ m }월` }</span>
            <svg className="arrows rightside-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" onClick={ () => setMonth("up") } style={{
                opacity: ( ( type === "check-out" ) && ( ( new Date().getMonth + 1 ) >= m ) ) && "none"
            }}>
                <path d="M9 18L15 12L9 6" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </div>
        <table className="calender-dates-wrap">
            <thead className="calender-days">
                <tr>일</tr>
                <tr>월</tr>
                <tr>화</tr>
                <tr>수</tr>
                <tr>목</tr>
                <tr>금</tr>
                <tr>토</tr>
            </thead>
            { Array.from({ length: Math.floor( dates.length / 7 ) + ( dates.length % 7 !== 0 ) }, () => null).map( ( _, i, origin ) => <>
                <tbody className={ `calender-week week_${i}` }>
                    { dates.slice( i * 7, ( i + 1 ) * 7 ).map( ( v, i ) => {

                        const isSelected = ( checkDate.y === y ) && ( checkDate.m === m ) && ( checkDate.d === v );
                        const thisTime = new Date(`${ y }-${ m }-${ v }`).getTime();
                        const isMiddle = ( ( ( thisTime - new Date(`${ checkDates["check_in"].y }-${ checkDates["check_in"].m }-${ checkDates["check_in"].d }`).getTime() ) >= 0  ) && ( ( new Date(`${ checkDates["check_out"].y }-${ checkDates["check_out"].m }-${ checkDates["check_out"].d }`).getTime() - thisTime ) >= 0 ) );
                        
                        return <tr 
                            // className="day-wrap"
                            className={ "day-wrap" + ( ( isSelected || isMiddle ) ? " background-coloring" : "" ) } 
                            style={{
                                animationDelay: `${ v ? ( v * 0.005 ) : 0 }s`,
                                borderRadius: isSelected ? (type === "check-in") ? "24px 0 0 24px" : "0 24px 24px 0" : null,
                                background: ( 
                                    ( 
                                        ( isMiddle || isSelected ) &&
                                        [ 1, new Date( filterCtrlMode.option[type].y, filterCtrlMode.option[type].m, 0).getDate() ].includes( v ) &&
                                        !(
                                            checkDates[ ( ( type === "check-in" ) ? "check_out" : "check_in" ) ].m === checkDate.m &&
                                            checkDates[ ( ( type === "check-in" ) ? "check_out" : "check_in" ) ].y === checkDate.y
                                        )
                                    ) && `linear-gradient(${ ( v === 1 ) ? "270" : "90"}deg, #F5F5F7 0%, #FFFFFF 100%)`
                                )
                            }} 
                            onClick={ () => _dateClickHandler( v ) }
                            key={ i }
                        >
                            { v ? 
                                <span style={ isSelected ? {
                                    color: "white",
                                    fontWeight: "700"
                                } : {
                                    color: ( Math.floor( ( thisTime - new Date().getTime() ) / ( 1000 * 60 * 60 * 24 ) ) < -1 ) ? "#BDBDBD" : "black"
                                } }>{ v }</span> : 
                                <span></span> 
                            }
                            <div className={ "onselect-background" + ( isSelected ? " selected" : "" )} style={{
                                animationName: isSelected ? "date-onselect-in" : "date-onselect-out",
                            }}></div>
                        </tr>
                    }) }
                </tbody>
            </> ) }
        </table>
    </div>;
}

export default Calender;
import { useState, useEffect, useRef, useCallback } from 'react';

// css
import "../../../styles/Price.css";
import "../../../styles/ControlBlockComponent.css";

// api
import { getPriceDistribution, status } from '../../../api/search';
import { useRecoilState } from 'recoil';
import states from '../../../recoil/state';

// pricelize-formatter proto funciton
String.prototype.pricelize = function() {
    let len = this.length, pricelized = "";
    this.split("").forEach( ( v, i ) => pricelized += ( ( len % 3 ) === ( i % 3 ) && ( ( len % 3 ) ? true : i ) ) ? `,${ v }` : v );
    return pricelized;
}

Number.prototype.pricelize = function() {
    let len = `${ this }`.length, pricelized = "";
    `${ this }`.split("").forEach( ( v, i ) => pricelized += ( ( len % 3 ) === ( i % 3 ) && ( ( len % 3 ) ? true : i ) ) ? `,${ v }` : v );
    return pricelized;
}

function PriceInput({ unit, type }) {

    const [ comp_initialized, setCompInitialized ] = useState( false );
    useEffect(() => {
        setCompInitialized( true );
    }, []);

    // input value control
    const [ prices, setPriceState ] = useRecoilState( states.priceState );
    const { [ type ]: value, [ type === "start" ? "end" : "start" ]: rev_value, init } = prices;
    const setValue = ( value ) => setPriceState( p => ({ ...p, [ type ]: value * 1, init: false }) );
    const setOnChange = ( value ) => setPriceState( p => ({ ...p, onchange: value, init: false }) );


    // input state control
    const [ mode, setMode ] = useState(0); // 1: 입력모드
    const inputRef = useRef();
    
    useEffect(() => {
        if ( !comp_initialized ) return;

        setOnChange( mode === 1 );
        if ( mode ) inputRef?.current?.focus();
        else {
            // check value
            if ( type === "start" && ( rev_value < value ) ) 
                setPriceState( p => ({ ...p, end: value, init: false }) );
            else if ( type === "end" && ( rev_value > value ) )
                setPriceState( p => ({ ...p, start: value, init: false }) );
        }
    }, [ mode ]);


    // input design control
    const [ width, setWidth ] = useState(0);
    const spanRef = useRef();

    useEffect(() => {
        const calced_width = spanRef?.current?.getBoundingClientRect().width;
        if ( !mode && calced_width ) setWidth( calced_width );
    }, [ mode ]);
    


    return <span className="price-input-wrap"
        onClick={ () => setMode(1) }
    >
        {
            ( mode ) ? <>
                <input 
                    className="price-input"
                    type="number"
                    value={ value }
                    style={{
                        width: `${ width }px`
                    }}
                    ref={ inputRef }
                    onChange={ ( e ) => setValue( e.target.value ) }
                    onBlur={ () => setMode(0) }
                />
            </> : <span ref={ spanRef } className="price-input">{ ( !init ) ? `${ ( unit || "₩" ) + value.pricelize() }` : `${ ( type === "start" ) ? "최소" : "최대" }금액` }</span>
        }
    </span>
    
}

function Price({ props }) {

    // price range control
    const [ { start, end, onchange, init }, setPriceState ] = useRecoilState( states.priceState );
    const [ range, setRange ] = useState( 10 * 10000 ); // 가격 극간

    const setStart = ( start ) => setPriceState( p => ({ ...p, start: ( start * 1 ), init: false }) );
    const setEnd = ( end ) => setPriceState( p => ({ ...p, end: ( end * 1 ), init: false }) );


    // price info control
    const [ statistic, setStatistic ] = useState(null); // 통계정보

    const updateStatisticInfo = useCallback( async () => {
        const { result, reason, data } = await getPriceDistribution( start, end, range );
        if ( result === status.SUCCEED ) setStatistic( data );
        else {
            // error handling

            alert(reason); // === e.message
            console.error(data); // === e
            return false;
        }
    }, [ start, end, range ] );

    useEffect(() => {
        if ( !onchange && !init ) updateStatisticInfo();
    }, [ onchange ]);


    // graph control
    const graphRef = useRef();
    const ctx = useRef();
    const [ graph_ready, setGraphReady ] = useState( false );

    const graphDotAnimateUpdater = ( option ) => {
        let { current: context } = ctx;
        const { x, y, to, time, speed, t, width, height } = option;
        // context.clearRect( 0, 0, width, height );
        context.fillRect( x, y, 1, 1 );
        if ( y < to ) requestAnimationFrame( () => graphDotAnimateUpdater( { x, y: (y + speed( t, time - t, { y, to } )), to, time, speed, t: t+1 } ));
    };

    const displayGraph = ( endpoints ) => {
        endpoints.forEach( endpoint => {
            const { x, y, width, height } = endpoint;
            requestAnimationFrame( () => graphDotAnimateUpdater({ 
                x, 
                y: 0, 
                to: y, 
                time: 5, 
                speed: ( passed_time, remained_time, { y, to } ) => (( to - y ) / remained_time), 
                t: 0,
                width,
                height
            }) );
        } )
    }
    
    useEffect(() => setTimeout(() => {
        // initialize graph
        console.log(graphRef.current);
        const { width, height } = graphRef.current.getBoundingClientRect();
        graphRef.current.width = width;
        graphRef.current.height = height;

        ctx.current = graphRef?.current?.getContext("2d");
        ctx.current.strokeStype = "black";
        ctx.current.lineWidth = 2;
        setGraphReady( true );
    }, 300), []);

    useEffect(() => {

        // update graph when statistic value change
        if ( !graph_ready || !statistic?.data ) return;
    
        const { width, height } = graphRef.current.getBoundingClientRect();
        const { represents = [] } = statistic.data;
        let { current: context } = ctx;

        console.log(represents.map( v => v.count ), width, height );

        context.clearRect( 0, 0, width, height );
        context.beginPath();
        let x, y;
        const x_per_column = ( width ) / represents.length;
        const y_per_count = ( height ) / ( Math.max( ...represents.map( v => v.count ) ) + 2 );
        // context.moveTo( 0, height );
        represents.forEach( ( v, i ) => {
            x = Math.min( 25 + i * x_per_column, width );
            y = height - ( ( v.count + 1 ) * y_per_count );
            context.lineTo( x, y );
            // displayGraph( [ { x, y, height, width } ] );
            // context.quadraticCurveTo( (px - x)/2, (py - y)/2, x, y );
        } )
        context.lineTo( width, height );
        // context.quadraticCurveTo( width/2, height/2, width, height );
        context.stroke();

    }, [ graph_ready, statistic ]);

    



    return <div className="price-block control-block-component">
        <span className="block-title">가격 범위</span>
        <div className="statistic-brief-area">
            <PriceInput type="start"/>
            <span> - </span>
            <PriceInput type="end"/>
            <span className={ "statistic-average price-animate" + ( onchange ? " price-fadeout" : " price-fadein" ) }>
                {
                    ( init ) ?
                    `금액을 입력하면 평균 요금을 확인할 수 있습니다`
                    :
                    `평균 1박 요금은 ${ statistic?.data?.unit }${ statistic?.data?.average?.pricelize() || "로드중" } 입니다.`
                }
            </span>
        </div>
        <canvas
            className="distribute-graph"
            ref={ graphRef }
        />
    </div>;
}

export default Price;
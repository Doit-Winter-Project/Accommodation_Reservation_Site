import { atom, selector, useRecoilState, useRecoilValue } from "recoil";

/*

testState: atom({
    key: "[unique-key]",
    default: "[default_value]"
})

*/

export default new function() {
    // state: check-dates ( check-in & check-out )
    
    this.checkInDateState = atom({
        key: "checkInDate",
        default: { y: -1, m: -1, d: -1, init: true },
    });
    
    this.checkOutDateState = atom({
        key: "checkOutDate",
        default: { y: -1, m: -1, d: -1, init: true },
    });
    
    this.checkDatesState = selector({
        key: "checkDatesSelector",
        get: ({ get }) => {
            const check_in = get( this.checkInDateState );
            const check_out = get( this.checkOutDateState );
    
            const duration = new Date(`${ check_in.y }-${ check_in.m }-${ check_in.d }`).getTime() - new Date(`${ check_out.y }-${ check_out.m }-${ check_out.d }`).getTime();
    
            return {
                check_in,
                check_out,
                duration,
                isValid: duration > 0,
                init: check_in.init && check_out.init
            }
        },
        set: ({ get, reset }) => {
            reset( this.checkInDateState );
            reset( this.checkOutDateState );
        }
    });
    
    // state: price
    
    this.priceState = atom({
        key: "priceState",
        default: { start: 0, end: 0, onchange: false, init: true }
    });
    
    // state: personnel
    
    this.personnelState = atom({
        key: "personnelState",
        default: { adult: 0, kid: 0, baby: 0, init: true }
    });

    // state: filterCtrlMode
    this.filterCtrlMode = atom({
        key: "filterCtrlModeState",
        default: null
    })
}

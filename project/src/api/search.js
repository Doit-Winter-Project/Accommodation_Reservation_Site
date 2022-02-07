import axios from "../connection";

export const status = {
    SUCCEED: "SUCCEED",
    FAILED: "FAILED",
}

export const getPriceDistribution = async ( start, end, range ) => {
    try {
        
        // SERVER
        // const { data: ratio_result } = await axios.post("/statistic/price", { range } );

        // TEST
        const ratio_result = new function() {
            this.result = true;
            this.query = {
                start,
                end,
                range
            };
            this.data = new function() {
                this.statistic_range = range;
                this.unit = "₩";
                this.represents = [];
                for ( let i = 0; i < ( ( ( end - start ) / range ) + 1 ); i++ ) {
                    this.represents.push({
                        start: start + ( i * range ),
                        end: ( start + ( ( i + 1 ) * range ) > end ? end : start + ( ( i + 1 ) * range ) ),
                        count: Math.floor( Math.random() * 10 )
                    });
                    if ( ( start + ( ( i + 1 ) * range ) >= end )) break;
                };
                this.total_count = (
                    this.represents.map(
                        v => v.count
                    ).reduce( ( p, c ) => (p + c) )
                );
                this.average = this.total_count === 0 ? 0 : (
                    Math.floor( 
                        this.represents.map( 
                            v => ( ( ( v.start + v.end ) / 2 * v.count ) )
                        ).reduce( ( p, c ) => ( p + c )) / this.total_count
                    )
                );
            };
        };

        const { result, query, data } = ratio_result;

        if ( result === true ) return {
            result: status.SUCCEED,
            data: ratio_result
        }
        throw new Error("API Failed");
    } catch(e) {
        console.error(e);
        return { result: status.FAILED, reason: e.message, data: e };
    }
}
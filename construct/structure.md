# Pre: 프로젝트 컴포넌트 분할구조 설계

### Structure 

    App
    ㄴ GNB ( Global Navigation Bar )   
        ㄴ Logo 
        ㄴ Services
        ㄴ SearchBar
            ㄴ FilterSelector[ type="check-in" ]
            ㄴ FilterSelector[ type="check-out" ]
            ㄴ FilterSelector[ type="price" ]
            ㄴ FilterSelector[ type="personnel" ]
        ㄴ PropsControl
                ㄴ Calender
                ㄴ Price
                ㄴ Personnel
        ㄴ ProfileControl
    ㄴ { Navigate: / } 
        ㄴ Near
        ㄴ Theme
    ㄴ { Navigate: /search } 
        ㄴ AccomSearchList ( Accommodation Search List )
            ㄴ AccomBlock ( Accommodation Block )
        ㄴ Reservator
            ㄴ FilterSummary
                ㄴ FilterSelector[ type="check-in" ]
                ㄴ FilterSelector[ type="check-out" ]
                ㄴ FilterSelector[ type="Personnel" ]
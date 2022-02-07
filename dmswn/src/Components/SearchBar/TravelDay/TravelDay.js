
import React, { useState, Component } from 'react';
import DatePicker, {registerLocale} from "react-datepicker";
import ko from 'date-fns/locale/ko';
import 'react-datepicker/dist/react-datepicker.css';
import './TravelDay.css';
registerLocale("ko", ko);

function TravelDay(props){

  const[startDate, setStartDate] = useState(new Date());
  const[endDate, setEndDate] = useState(null);
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  return (
    <div className="calender-container">
        <DatePicker
      renderCustomHeader={({
        monthDate,
        customHeaderCount,
        decreaseMonth,
        increaseMonth,
      }) => (
        <div>
          <button
            aria-label="Previous Month"
            className={
              "react-datepicker__navigation react-datepicker__navigation--previous"
            }
            style={customHeaderCount === 1 ? { visibility: "hidden" } : null}
            onClick={decreaseMonth}
          >
            <span
              className={
                "react-datepicker__navigation-icon react-datepicker__navigation-icon--previous"
              }
            >
              {"<"}
            </span>
          </button>
          <span className="react-datepicker__current-month">
            {monthDate.toLocaleString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </span>
          <button
            aria-label="Next Month"
            className={
              "react-datepicker__navigation react-datepicker__navigation--next"
            }
            style={customHeaderCount === 0 ? { visibility: "hidden" } : null}
            onClick={increaseMonth}
          >
            <span
              className={
                "react-datepicker__navigation-icon react-datepicker__navigation-icon--next"
              }
            >
              {">"}
            </span>
          </button>
        </div>
      )}
      selected={startDate}
      startDate={startDate}
      endDate={endDate}
      onChange={onChange}
      monthsShown={2}
      selectsRange
      dateFormat="M월d일"
      locale="ko"
    />
    </div>
  )
}


export default TravelDay;

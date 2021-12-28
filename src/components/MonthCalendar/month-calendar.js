import React, { useState } from "react";
import { connect } from "react-redux";

function MonthCalendar(props) {
  const { currentDate, monthsList } = props;

  console.log(monthsList);
  let { dateToRender } = props;

  let startDay = dateToRender.startOf("month").startOf("week");
  let endDay = dateToRender.endOf("month").endOf("week");

  let calendar = [];
  for (let i = startDay; i <= endDay; i = i.plus({ days: 1 })) {
    calendar.push(i);
  }
  console.log(calendar);
  let weekCounter = calendar.length / 7;

  function defineDayClass(day) {
    let dayClass = "DayPicker-Day";
    if (day.weekday > 5) {
      dayClass = "DayPicker-Day Weekend";
    }
    if (day.month !== dateToRender.month) {
      dayClass = "DayPicker-Day OtherMonth";
    }
    return dayClass;
  }

  function isCurrentDay(day) {
    if (
      day.hasSame(currentDate, "year") &&
      day.hasSame(currentDate, "month") &&
      day.hasSame(currentDate, "day")
    ) {
      console.log("working" + day.day);
      return "NumberWrapper ActiveDay";
    } else {
      return "NumberWrapper";
    }
  }

  function defineMonth(date) {
    console.log(+date.month - 1);
    return monthsList[+date.month - 1];
  }

  function renderDays(arr, start) {
    let arrOfDays = [];
    for (let i = start, j = 0; j < 7; j++, i++) {
      arrOfDays.push(
        <div className={defineDayClass(arr[i])} key={arr[i].toString()}>
          <div className="DayWrapper">
            <div className={isCurrentDay(arr[i])}>{arr[i].day}</div>
          </div>
        </div>
      );
    }
    return arrOfDays;
  }

  function renderWeeks(arr) {
    let arrOfWeeks = [];
    for (let j = 0, days = 0; j < weekCounter; j++, days += 7) {
      arrOfWeeks.push(
        <div className="DayPicker-Week" key={j}>
          {renderDays(arr, days)}
        </div>
      );
    }
    return arrOfWeeks;
  }

  return (
    <>
      <div className="DayPicker-Months">
        <div className="DayPicker-Month">
          <div className="DayPicker-Caption">{defineMonth(dateToRender)}</div>
          <div className="DayPicker-Weekdays"></div>
          <div className="DayPicker-Body">{renderWeeks(calendar)}</div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    monthsList: state.monthsList,
    currentDate: state.currentDate,
    dateToRender: state.dateToRender,
    holidaysList: state.holidaysList,
  };
};

export default connect(mapStateToProps)(MonthCalendar);

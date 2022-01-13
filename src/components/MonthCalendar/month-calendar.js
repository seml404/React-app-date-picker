import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { toggleAddEventWidow } from "../../store/actions/index";
import { DateTime } from "../../services/index";

function MonthCalendar(props) {
  let [eventsPending, setEventsPending] = useState([]);
  let [eventsConfirmed, setEventsConfirmed] = useState([]);
  const { currentDate, monthsList, daysList, toggleAddEventWidow } = props;

  // console.log(monthsList);
  let { dateToRender } = props;

  let startDay = dateToRender.startOf("month").startOf("week");
  let endDay = dateToRender.endOf("month").endOf("week");

  let calendar = [];
  for (let i = startDay; i <= endDay; i = i.plus({ days: 1 })) {
    calendar.push(i);
  }
  // console.log(calendar);
  let weekCounter = calendar.length / 7;

  function renderDaysList(arr) {
    return arr.map((item) => {
      return (
        <div key={item} className="WeekDayName">
          {item}
        </div>
      );
    });
  }

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

  function equalDate(day, comparedDate) {
    return (
      day.hasSame(comparedDate, "year") &&
      day.hasSame(comparedDate, "month") &&
      day.hasSame(comparedDate, "day")
    );
  }

  function handleDayClick(e, day) {
    e.stopPropagation();
    console.log(day);
    toggleAddEventWidow();
  }

  // console.log(DateTime.fromMillis(1647185731000));

  function isBusy(neededDay, schedule) {
    if (
      schedule.find((item) => {
        return equalDate(neededDay, DateTime.fromMillis(+item.timeStamp));
      })
    ) {
      return true;
    }
  }

  function renderDays(arr, start) {
    let arrOfDays = [];
    for (let i = start, j = 0; j < 7; j++, i++) {
      arrOfDays.push(
        <div
          className={defineDayClass(arr[i])}
          key={arr[i].toString()}
          onClick={(e, day) => handleDayClick(e, arr[i])}
        >
          <div className="DayWrapper">
            <div
              className={
                equalDate(arr[i], currentDate)
                  ? "NumberWrapper ActiveDay"
                  : "NumberWrapper"
              }
            >
              {arr[i].day}
            </div>
            {isBusy(arr[i], eventsPending) && (
              <div className="eventPending" style={{ color: "red" }}>
                p
              </div>
            )}
            {isBusy(arr[i], eventsConfirmed) && (
              <div className="eventConfirmed" style={{ color: "blue" }}>
                c
              </div>
            )}
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

  async function getEvents() {
    console.log("start", eventsPending, eventsConfirmed);
    let first = await fetch(
      `http://localhost:3000/events?timeStamp_gte=${startDay.valueOf()}&timeStamp_lte=${endDay.valueOf()}`
    );
    let res = await first.json();
    console.log(res);
    if (res.length > 0) {
      sortMonthEvents(res);
    }
  }

  function sortMonthEvents(res) {
    let pending = [];
    let confirmed = [];
    res.forEach((ev) => {
      if (ev.type === "pending") {
        console.log("yeap 1", ev);
        pending.push(ev);
      } else if (ev.type === "confirmed") {
        console.log("yeap2", ev);
        confirmed.push(ev);
      }
    });
    setEventsPending(pending);
    setEventsConfirmed(confirmed);
  }

  useEffect(() => {
    setEventsPending([]);
    setEventsConfirmed([]);
    getEvents();
    console.log("STARTED");
  }, [dateToRender]);

  return (
    <>
      <div className="DayPicker-Months">
        <div className="DayPicker-Month">
          <div className="DayPicker-Weekdays">{renderDaysList(daysList)}</div>
          <div className="DayPicker-Body">{renderWeeks(calendar)}</div>
        </div>
      </div>
      <div>{eventsPending.length}</div>
      <div>{eventsConfirmed.length}</div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    monthsList: state.monthsList,
    currentDate: state.currentDate,
    dateToRender: state.dateToRender,
    holidaysList: state.holidaysList,
    daysList: state.daysList,
    showAddEventWindow: state.showAddEventWindow,
  };
};

const mapDispatchToProps = {
  toggleAddEventWidow,
};

export default connect(mapStateToProps, mapDispatchToProps)(MonthCalendar);

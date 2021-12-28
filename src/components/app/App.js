import { dateTime, currentDate } from "../../services";

function App() {
  let startDay = currentDate.startOf("month").startOf("week");
  let endDay = currentDate.endOf("month").endOf("week");

  console.log(startDay, endDay);
  let calendar = [];
  for (let i = startDay; i <= endDay; i = i.plus({ days: 1 })) {
    calendar.push(i.day);
  }
  console.log(calendar);
  let weekCounter = calendar.length / 7;

  function renderDays(arr, start) {
    let arrOfDays = [];
    for (let i = start, j = 0; j < 7; j++, i++) {
      arrOfDays.push(
        <div className="DayPicker-Day" key={arr[i]}>
          <div>
            <div>{arr[i]}</div>
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
          <div className="DayPicker-Weekdays"></div>
          <div className="DayPicker-Caption">Декабрь 2021</div>
          <div className="DayPicker-Body">{renderWeeks(calendar)}</div>
        </div>
      </div>
    </>
  );
}

export default App;

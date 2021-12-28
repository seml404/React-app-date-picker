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
  let weeksArr = [];
  for (let i = 0; i < weekCounter; i++) {
    weeksArr.push(i);
  }

  function renderTds(arr, start) {
    let arrOfTds = [];
    for (let i = start, j = 0; j < 7; j++, i++) {
      arrOfTds.push(<td key={arr[i]}>{arr[i]}</td>);
    }
    return arrOfTds;
  }

  function renderWeeks(arr) {
    let arrOfWeeks = [];
    for (let j = 0, days = 0; j < weekCounter; j++, days += 7) {
      arrOfWeeks.push(<tr key={j}>{renderTds(arr, days)}</tr>);
    }
    return arrOfWeeks;
  }

  return (
    <>
      <table>
        <tbody>{renderWeeks(calendar)}</tbody>
      </table>
    </>
  );
}

export default App;

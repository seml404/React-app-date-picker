import React from "react";

import MonthCalendar from "../MonthCalendar/month-calendar";
import NavBar from "../NavBar/nav-bar";

function App() {
  return (
    <div className="DayPicker-wrapper">
      <NavBar></NavBar>
      <MonthCalendar></MonthCalendar>
    </div>
  );
}

export default App;

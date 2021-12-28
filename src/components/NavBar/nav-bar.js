import React from "react";
import { connect } from "react-redux";
import { changeMonth } from "../../store/actions/index";
function NavBar(props) {
  const { changeMonth } = props;

  return (
    <div className="DayPicker-NavBar">
      <button
        className="btn btn-change-month"
        onClick={() => changeMonth("prev")}
      >
        Prev
      </button>
      <p>menu</p>
      <button
        className="btn btn-change-month"
        onClick={() => changeMonth("next")}
      >
        Next
      </button>
    </div>
  );
}

const mapDispatchToProps = {
  changeMonth,
};

export default connect(null, mapDispatchToProps)(NavBar);

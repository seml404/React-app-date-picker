import { DateTime } from "luxon";
let currentDate = DateTime.now();
const initialState = {
  dateToRender: currentDate,
  currentDate: currentDate,
  monthsList: [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ],
  holidaysList: [{ month: 1, days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_MONTH":
      console.log("working");
      if (action.typeOfChange === "prev") {
        let date = state.dateToRender.minus({ months: 1 });
        return {
          ...state,
          dateToRender: date,
        };
      } else if (action.typeOfChange === "next") {
        let date = state.dateToRender.plus({ months: 1 });
        return {
          ...state,
          dateToRender: date,
        };
      } else {
        return state;
      }
    default:
      return state;
  }
};

export default reducer;

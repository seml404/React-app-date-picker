const changeMonth = (typeOfChange) => {
  return {
    type: "CHANGE_MONTH",
    typeOfChange: typeOfChange,
  };
};

export { changeMonth };

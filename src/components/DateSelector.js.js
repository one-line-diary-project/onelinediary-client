import React, { Fragment, forwardRef, useEffect, useState } from "react";
import Datepicker from "react-datepicker";
import { getStringDate } from "../utils/date";

import "react-datepicker/dist/react-datepicker.css";
import classes from "./DateSelector.module.css";
import { fetchDiaryData } from "../store/diary-action";
import { useDispatch } from "react-redux";

const DateSelector = () => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(new Date());
  const [edDate, setEndDate] = useState(new Date());

  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <button className={classes.dateCustomInput} onClick={onClick} ref={ref}>
      {getStringDate(value)}
    </button>
  ));

  const handleSearchClick = () => {
    dispatch(fetchDiaryData({ startDate: startDate, endDate: edDate }));
  };

  useEffect(() => {
    handleSearchClick();
  }, []);

  return (
    <Fragment>
      <div className={classes.datePicker_container}>
        <div className={classes.datePicker_wrapper}>
          <div>
            <Datepicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              customInput={<CustomInput />}
            />
          </div>
          <div className={classes.range} />
          <div>
            <Datepicker
              selected={edDate}
              onChange={(date) => setEndDate(date)}
              customInput={<CustomInput />}
            />
          </div>
        </div>
        <button className={classes.search_btn} onClick={handleSearchClick}>
          조회
        </button>
      </div>
    </Fragment>
  );
};

export default React.memo(DateSelector);

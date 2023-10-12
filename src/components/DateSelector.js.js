import React, { Fragment, forwardRef, useEffect, useState } from "react";
import Datepicker from "react-datepicker";
import { getStringDate } from "../utils/date";

import "react-datepicker/dist/react-datepicker.css";
import classes from "./DateSelector.module.css";
import { fetchDiaryDataList } from "../store/diary-action";
import { useDispatch } from "react-redux";
import { diaryActions } from "../store/diary-slice";
import { uiActions } from "../store/ui-slice";

const DateSelector = () => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <button className={classes.dateCustomInput} onClick={onClick} ref={ref}>
      {getStringDate(value)}
    </button>
  ));

  const handleSearchClick = () => {
    dispatch(
      diaryActions.setSearhDate({
        startDate: getStringDate(startDate, true),
        endDate: getStringDate(endDate, true),
      })
    );
    dispatch(fetchDiaryDataList({}));
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
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              customInput={<CustomInput />}
            />
          </div>
        </div>
        <button
          className={classes.search_btn}
          data-testid="seacrhBtn"
          onClick={handleSearchClick}
        >
          조회
        </button>
      </div>
    </Fragment>
  );
};

export default React.memo(DateSelector);

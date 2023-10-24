import { useSelector } from "react-redux";
import React from "react";

import classes from "./DiaryMaker.module.css";
import DiaryForm from "../DiaryForm/DiaryForm";
import DiaryList from "../DiaryList/DiaryList";
import { getStringDate } from "../../../utils/date";

const DiaryMaker = ({ _id, createdAt, contents }) => {
  const isWritable = useSelector((state) => state.ui.isWritableMenu);
  return (
    <section className={classes.section_center}>
      <h3>{getStringDate(createdAt)}</h3>
      {isWritable && <DiaryForm diaryId={_id} />}
      {contents && <DiaryList contents={contents} />}
    </section>
  );
};

export default React.memo(DiaryMaker);

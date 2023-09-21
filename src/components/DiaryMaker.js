import classes from "./DiaryMaker.module.css";

import DiaryForm from "./DiaryForm";
import DiaryList from "./DiaryList";

import { useSelector } from "react-redux";
import React from "react";

const currentDate = new Date();

const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // 월 (0부터 시작하므로 +1 필요)
const day = String(currentDate.getDate()).padStart(2, "0");

const formattedDate = `${year}.${month}.${day}`;

const DiaryMaker = ({ _id, createdAt, contents }) => {
  const isWritable = useSelector((state) => state.ui.isWritableMenu);

  return (
    <section className={classes.section_center}>
      <h3>{createdAt || formattedDate}</h3>
      {isWritable && <DiaryForm diaryId={_id} />}
      {contents && <DiaryList contents={contents} />}
    </section>
  );
};

export default React.memo(DiaryMaker);

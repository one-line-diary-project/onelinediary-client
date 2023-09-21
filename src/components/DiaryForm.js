import { useDispatch, useSelector } from "react-redux";
import classes from "./DiaryForm.module.css";
import { diaryActions } from "../store/diary-slice";
import { useEffect, useRef, useState } from "react";

import { getStringTime } from "../utils/time";

const DiaryForm = (props) => {
  const isWritable = useSelector((state) => state.ui.isWritableMenu);

  const contentRef = useRef();
  const contentId = useRef(1);
  const [content, setContent] = useState("");
  const dispatch = useDispatch();

  const handleSubmitClick = (e) => {
    e.preventDefault();

    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }

    dispatch(
      diaryActions.addContentToDiary({
        id: props.diaryId,
        content: {
          _id: contentId.current,
          content: content,
          postTime: getStringTime(),
        },
      })
    );

    contentRef.current.value = "";
  };

  return (
    <form className="diary_form" onSubmit={handleSubmitClick}>
      <div className={classes.form_control}>
        <input
          type="text"
          id="diary"
          ref={contentRef}
          className={classes.diary}
          onChange={(e) => setContent(e.target.value)}
          placeholder="오늘 하루는 어땠나요?"
        />
        <button className={classes.submit_btn}>
          {isWritable ? "수정" : "등록"}
        </button>
      </div>
    </form>
  );
};

export default DiaryForm;

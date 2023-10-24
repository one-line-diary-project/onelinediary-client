import { useDispatch, useSelector } from "react-redux";
import classes from "./DiaryForm.module.css";
import { diaryActions } from "../../../store/Diary/diary-slice";
import React, { useRef } from "react";

import { getStringTime } from "../../../utils/time";
import { uiActions } from "../../../store/UI/ui-slice";
import { useNavigate } from "react-router-dom";

const DiaryForm = (props) => {
  const isEdited = useSelector((state) => state.ui.editButtonClicked);
  const isLogined = useSelector((state) => state.ui.isLogined);

  const content = useSelector((state) => state.diary.content);

  const contentRef = useRef();
  const contentId = useRef(1);
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const handleSubmitClick = (e) => {
    e.preventDefault();

    if (!isLogined) {
      alert("로그인 후 이용해주세요.");
      dispatch(diaryActions.setContent({ text: "" }));
      navigator("/login");
      return;
    }
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }

    if (!isEdited) {
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
    } else {
      dispatch(diaryActions.editContentFromDiary());
      dispatch(uiActions.showEditForm({ state: false }));
    }
  };
  return (
    <form className="diary_form" onSubmit={handleSubmitClick}>
      <div className={classes.form_control}>
        <input
          type="text"
          id="diary"
          ref={contentRef}
          value={content}
          className={classes.diary}
          onChange={(e) =>
            dispatch(diaryActions.setContent({ text: e.target.value }))
          }
          placeholder="오늘 하루는 어땠나요?"
        />
        <button className={classes.submit_btn}>
          {isEdited ? "수정" : "등록"}
        </button>
      </div>
    </form>
  );
};

export default React.memo(DiaryForm);

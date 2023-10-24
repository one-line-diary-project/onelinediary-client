import classes from "./DiaryItem.module.css";
import editButton from "../../../assets/editButton.svg";
import { uiActions } from "../../../store/UI/ui-slice";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { diaryActions } from "../../../store/Diary/diary-slice";

const DiaryItem = ({ _id, content, postTime, showChck }) => {
  const isWritable = useSelector((state) => state.ui.isWritableMenu);

  const dispatch = useDispatch();
  const handleEditClick = () => {
    dispatch(uiActions.showEditForm({ state: true }));
    dispatch(diaryActions.setEditId({ _id: _id }));
    dispatch(diaryActions.setContent({ text: content }));
  };
  return (
    <article key={_id} className={classes.diary_item}>
      <div className={classes.content_container}>
        {showChck && (
          <div className={classes.checkbox_container}>
            <input type="checkbox" id={_id} />
            <label htmlFor={_id} className={classes.stylish_checkbox}></label>
          </div>
        )}
        <div className={classes.text_container}>
          <p className={classes.title}>{content}</p>
          <p className={classes.post_time}>{postTime}</p>
        </div>
      </div>
      {isWritable && (
        <div className={classes.edit_btn_container}>
          <button
            type="button"
            className={classes.edit_btn}
            onClick={handleEditClick}
          >
            <img src={editButton} />
          </button>
        </div>
      )}
    </article>
  );
};

export default React.memo(DiaryItem);

import { useDispatch, useSelector } from "react-redux";
import classes from "./DiaryForm.module.css";
import { diaryActions } from "../store/diary-slice";

const DiaryForm = (props) => {
  const isWritable = useSelector((state) => state.ui.isWritableMenu);
  const dispatch = useDispatch();

  const handleSubmitClick = (e) => {
    e.preventDefault();
    dispatch(diaryActions.addContentToList({}));
  };

  return (
    <form className="diary_form" onSubmit={handleSubmitClick}>
      <div className={classes.form_control}>
        <input
          type="text"
          id="diary"
          className={classes.diary}
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

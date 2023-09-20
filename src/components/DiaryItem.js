import classes from "./DiaryItem.module.css";
import editButton from "../assets/editButton.svg";
import { uiActions } from "../store/ui-slice";
import { useDispatch, useSelector } from "react-redux";

const DiaryItem = ({ id, content, postTime, showChck }) => {
  const isWritable = useSelector((state) => state.ui.isWritableMenu);

  const dispatch = useDispatch();
  const handleEditClick = () => {
    dispatch(uiActions.showEditForm());
  };
  return (
    <article key={id} className={classes.diary_item}>
      <div className={classes.content_container}>
        {showChck && (
          <div className={classes.checkbox_container}>
            <input type="checkbox" id={id} />
            <label htmlFor={id} className={classes.stylish_checkbox}></label>
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

export default DiaryItem;

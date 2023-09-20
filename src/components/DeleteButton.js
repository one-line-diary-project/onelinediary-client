import classes from "./DeleteButton.module.css";

import deleteButton from "../assets/deleteButton.svg";
import confirmDeleteButton from "../assets/confirmDeleteButton.svg";
import cancelDeleteButton from "../assets/cancelDeleteButton.svg";
import { uiActions } from "../store/ui-slice";
import { useDispatch, useSelector } from "react-redux";

const DeleteButton = () => {
  const dispatch = useDispatch();
  const showChck = useSelector((state) => state.ui.deleteButtonClicked);

  const handleDeleteClick = () => {
    dispatch(uiActions.toggleCheckbox());
  };

  const handleCancelDeleteClick = () => {
    dispatch(uiActions.toggleCheckbox());

    /*
     * #### 필요한 기능
     * 1.클릭 시 다이어리 아이템에 체크박스가 사라져야함
     * 2.클릭 시 항목 삭제 버튼이 보여야함
     * 3.체크된 항목 체크여부 초기화  */
  };

  return (
    <>
      {!showChck && (
        <button className={classes.delete_btn} onClick={handleDeleteClick}>
          <img src={deleteButton} alt="항목 삭제" />
        </button>
      )}
      {showChck && (
        <div className={classes.delete_action_container}>
          <button
            className={classes.cancel_delete_btn}
            onClick={handleCancelDeleteClick}
          >
            <img src={cancelDeleteButton} alt="항목 삭제 취소" />
          </button>
          <button className={classes.confirm_delete_btn}>
            <img src={confirmDeleteButton} alt="항목 삭제 확인" />
          </button>
        </div>
      )}
    </>
  );
};

export default DeleteButton;

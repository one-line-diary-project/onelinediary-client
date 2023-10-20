import classes from "./DeleteButton.module.css";

import deleteButton from "../../../assets/deleteButton.svg";
import confirmDeleteButton from "../../../assets/confirmDeleteButton.svg";
import cancelDeleteButton from "../../../assets/cancelDeleteButton.svg";
import { uiActions } from "../../../store/UI/ui-slice";
import { useDispatch, useSelector } from "react-redux";
import { diaryActions } from "../../../store/Diary/diary-slice";
import React from "react";

const DeleteButton = () => {
  const dispatch = useDispatch();
  const showChck = useSelector((state) => state.ui.deleteButtonClicked);

  const handleDeleteClick = () => {
    dispatch(uiActions.toggleCheckbox());
  };

  const handleConfirmDeleteClick = () => {
    const checkedIds = Array.from(
      document.querySelectorAll('input[type="checkbox"]:checked')
    ).map((checkbox) => checkbox.id);

    if (checkedIds.length === 0) {
      alert("선택된 일기가 없습니다.");
      return;
    }
    if (!window.confirm("해당 일기를 삭제하시겠습니까?")) {
      return;
    }

    dispatch(diaryActions.removeContentFromDiary({ _id: checkedIds }));
    handleDeleteClick();
  };

  return (
    <>
      {!showChck && (
        <button
          className={classes.delete_btn}
          data-testid="deleteButton"
          onClick={handleDeleteClick}
        >
          <img src={deleteButton} alt="항목 삭제" />
        </button>
      )}
      {showChck && (
        <div className={classes.delete_action_container}>
          <button
            className={classes.cancel_delete_btn}
            onClick={handleDeleteClick}
            data-testid="cancelButton"
          >
            <img src={cancelDeleteButton} alt="항목 삭제 취소" />
          </button>
          <button
            className={classes.confirm_delete_btn}
            onClick={handleConfirmDeleteClick}
            data-testid="confirmButton"
          >
            <img src={confirmDeleteButton} alt="항목 삭제 확인" />
          </button>
        </div>
      )}
    </>
  );
};

export default DeleteButton;

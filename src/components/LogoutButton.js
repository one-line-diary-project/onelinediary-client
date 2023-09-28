import React from "react";
import classes from "./LoginButton.module.css";
import { useDispatch } from "react-redux";
import { fetchLogout } from "../store/diary-action";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const handleLogoutClick = () => {
    dispatch(fetchLogout());
    navigator("/");
  };
  return (
    <section className={classes.section_center}>
      <div className={classes.btn_container}>
        <button
          type="button"
          className={classes.login_btn}
          onClick={handleLogoutClick}
        >
          <img className={classes.login_img} alt="로그아웃 버튼" />
        </button>
      </div>
    </section>
  );
};

export default React.memo(LogoutButton);

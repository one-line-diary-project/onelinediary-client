import React from "react";
import classes from "./LoginButton.module.css";
import loginButton from "../assets/loginButton.png";
import { useDispatch } from "react-redux";
import { login } from "../store/user-action";

const LoginButton = () => {
  const dispatch = useDispatch();
  const handleLoginClick = () => {};
  return (
    <section className={classes.section_center}>
      <div className={classes.btn_container}>
        <button
          type="button"
          className={classes.login_btn}
          onClick={handleLoginClick}
        >
          <img
            className={classes.login_img}
            src={loginButton}
            alt="로그인 버튼"
          />
        </button>
      </div>
    </section>
  );
};

export default React.memo(LoginButton);

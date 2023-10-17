import classes from "./Footer.module.css";
import { ReactComponent as Logo } from "../assets/githubMark.svg";
import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className={classes.footer_message}>
        <p className={classes.copyright}>한 줄 일기 by keemHwa © 2023</p>
        <a href="https://github.com/one-line-diary-project" target="_blank">
          <Logo className={classes.githubLogo} alt="깃헙로고" />
        </a>
      </div>
    </footer>
  );
};
export default Footer;

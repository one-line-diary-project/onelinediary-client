import classes from "./Footer.module.css";
import githubLogo from "../assets/githubMark.svg";

const Footer = () => {
  return (
    <footer>
      <div className={classes.footer_message}>
        <p className={classes.copyright}>한 줄 일기 by keemHwa © 2023</p>
        <a href="https://github.com/one-line-diary-project">
          <img
            src={githubLogo}
            className={classes.githubLogo}
            alt="GitHub 로고"
          />
        </a>
      </div>
    </footer>
  );
};
export default Footer;

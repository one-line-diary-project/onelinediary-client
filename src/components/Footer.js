import classes from "./Footer.module.css";
import { ReactComponent as Logo } from "../assets/githubMark.svg";

const Footer = () => {
  return (
    <footer>
      <div className={classes.footer_message}>
        <p className={classes.copyright}>한 줄 일기 by keemHwa © 2023</p>
        <a href="https://github.com/one-line-diary-project" target="_blank">
          <Logo className={classes.githubLogo} />
        </a>
      </div>
    </footer>
  );
};
export default Footer;

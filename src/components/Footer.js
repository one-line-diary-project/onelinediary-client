import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <footer>
      <div className={classes.footer_message}>
        <p className={classes.copyright}>한 줄 일기 by keemHwa © 2023</p>
        <a>github로고</a>
      </div>
    </footer>
  );
};
export default Footer;

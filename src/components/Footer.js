import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <footer>
      <div className={classes.footer_message}>
        <div className={classes.copyright}>한 줄 일기 by keemHwa © 2023</div>
        <a>github로고</a>
      </div>
    </footer>
  );
};
export default Footer;

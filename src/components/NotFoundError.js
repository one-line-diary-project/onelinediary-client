import classes from "./NotFoundError.module.css";

const NotFoundError = () => {
  return (
    <section className={classes.section_center}>
      <p>요청하신 페이지가 없습니다.</p>
    </section>
  );
};

export default NotFoundError;

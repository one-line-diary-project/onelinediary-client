import { Fragment } from "react";

import DeleteButton from "./DeleteButton";
import DiaryItem from "./DiaryItem";
import classes from "./DiaryList.module.css";
import { useSelector } from "react-redux";

const DiaryList = ({ contents }) => {
  const showChck = useSelector((state) => state.ui.deleteButtonClicked);
  const isWritable = useSelector((state) => state.ui.isWritableMenu);
  return (
    <div className={classes.diary_container}>
      {contents.length > 0 && (
        <Fragment>
          <div className="diary_list">
            {contents.map((item) => (
              <DiaryItem key={item._id} {...item} showChck={showChck} />
            ))}
          </div>
          {isWritable && <DeleteButton />}
        </Fragment>
      )}
    </div>
  );
};

DiaryList.defaultProps = {
  contents: [],
};

export default DiaryList;

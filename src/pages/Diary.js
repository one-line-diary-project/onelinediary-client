import { Fragment, useEffect } from "react";
import DiaryMaker from "../components/DiaryMaker";
import { uiActions } from "../store/ui-slice";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartAllData } from "../store/diary-action";

const Diary = () => {
  const dispatch = useDispatch();
  const diaryList = useSelector((state) => state.diary.diaryList);

  useEffect(() => {
    dispatch(
      uiActions.checkWritableMenu({
        status: false,
      })
    );
    dispatch(fetchCartAllData());
  }, []);

  return (
    <Fragment>
      {diaryList.map((diary) => (
        <DiaryMaker key={diary._id} {...diary} />
      ))}
    </Fragment>
  );
};

export default Diary;

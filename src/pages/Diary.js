import { Fragment, useEffect } from "react";
import DiaryMaker from "../components/Diary/DiaryMaker";
import { uiActions } from "../store/UI/ui-slice";
import { useDispatch, useSelector } from "react-redux";
import DateSelector from "../components/UI/DatePIcker/DateSelector";
import NoneDiary from "../components/Diary/NoneDiary";
import { fetchScrollDiaryData } from "../store/Diary/diary-action";
import useIntersection from "../hooks/useIntersection.js";

const Diary = () => {
  const dispatch = useDispatch();
  const diaryList = useSelector((state) => state.diary.diaryList);
  const isLoaded = useSelector((state) => state.diary.isLoaded);

  useEffect(() => {
    dispatch(
      uiActions.checkWritableMenu({
        status: false,
      })
    );
  }, [dispatch]);

  const ref = useIntersection(() => {
    dispatch(fetchScrollDiaryData());
  });

  const styles = { textAlign: "center" };
  return (
    <Fragment>
      <DateSelector />
      {diaryList.length > 0 ? (
        diaryList.map((diary) => <DiaryMaker key={diary._id} {...diary} />)
      ) : (
        <NoneDiary />
      )}
      {isLoaded && (
        <p style={styles} ref={ref}>
          Loding . . .
        </p>
      )}
    </Fragment>
  );
};

export default Diary;

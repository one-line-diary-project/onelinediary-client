import { Fragment, useEffect } from "react";
import DiaryMaker from "../components/DiaryMaker";
import { uiActions } from "../store/ui-slice";
import { useDispatch, useSelector } from "react-redux";
import DateSelector from "../components/DateSelector";
import NoneDiary from "../components/NoneDiary";
import { fetchScrollDiaryData } from "../store/diary-action";
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

  return (
    <Fragment>
      <DateSelector />
      {diaryList.length > 0 ? (
        diaryList.map((diary) => <DiaryMaker key={diary._id} {...diary} />)
      ) : (
        <NoneDiary />
      )}
      {isLoaded && <p ref={ref}>loding..</p>}
    </Fragment>
  );
};

export default Diary;

import { Fragment, useEffect } from "react";
import DiaryMaker from "../components/DiaryMaker";
import { uiActions } from "../store/ui-slice";
import { useDispatch, useSelector } from "react-redux";
import { fetchDiaryData } from "../store/diary-action";
import DateSelector from "../components/DateSelector.js";
import NoneDiary from "../components/NoneDiary";

const Diary = () => {
  const dispatch = useDispatch();
  const diaryList = useSelector((state) => state.diary.diaryList);

  useEffect(() => {
    dispatch(
      uiActions.checkWritableMenu({
        status: false,
      })
    );
    // dispatch(
    //   fetchDiaryData({ startDate: "2023-09-21", endDate: "2023-09-21" })
    // );
  }, []);

  return (
    <Fragment>
      <DateSelector />
      {diaryList.length > 0 ? (
        diaryList.map((diary) => <DiaryMaker key={diary._id} {...diary} />)
      ) : (
        <NoneDiary />
      )}
    </Fragment>
  );
};

export default Diary;

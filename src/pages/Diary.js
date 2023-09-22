import { Fragment, useEffect } from "react";
import DiaryMaker from "../components/DiaryMaker";
import { uiActions } from "../store/ui-slice";
import { useDispatch, useSelector } from "react-redux";
import { fetchDiaryData } from "../store/diary-action";

const Diary = () => {
  const dispatch = useDispatch();
  const diaryList = useSelector((state) => state.diary.diaryList);

  useEffect(() => {
    dispatch(
      uiActions.checkWritableMenu({
        status: false,
      })
    );
    dispatch(
      fetchDiaryData({ startDate: "2023-09-20", endDate: "2023-09-20" })
    );
  }, []);

  return (
    <Fragment>
      {diaryList.length > 0 ? (
        diaryList.map((diary) => <DiaryMaker key={diary._id} {...diary} />)
      ) : (
        <p>데이터가 없습니다.</p>
      )}
    </Fragment>
  );
};

export default Diary;

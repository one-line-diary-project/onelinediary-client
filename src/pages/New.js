import { Fragment, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { uiActions } from "../store/ui-slice";
import DiaryMaker from "../components/DiaryMaker";
import { fetchDiaryData, sendDiaryData } from "../store/diary-action";
import { diaryActions } from "../store/diary-slice";

let isInitial = true;

const New = () => {
  const dispatch = useDispatch();
  const diary = useSelector((state) => state.diary.diary);
  const diaryId = useRef(1);

  useEffect(() => {
    dispatch(
      uiActions.checkWritableMenu({
        status: true,
      })
    );
    dispatch(fetchDiaryData({}));
  }, []);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (diary.change) dispatch(sendDiaryData(diary));
  }, [diary, dispatch]);

  return (
    <Fragment>
      {Object.keys(diary).length !== 0 ? (
        <DiaryMaker key={diary._id} {...diary} />
      ) : (
        <DiaryMaker key={diaryId.current} _id={diaryId.current} />
      )}
    </Fragment>
  );
};

export default New;

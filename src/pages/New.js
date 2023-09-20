import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { uiActions } from "../store/ui-slice";
import DiaryMaker from "../components/DiaryMaker";
import { fetchCartData } from "../store/diary-action";

const New = () => {
  const dispatch = useDispatch();
  const diaryList = useSelector((state) => state.diary.diaryList);

  useEffect(() => {
    dispatch(
      uiActions.checkWritableMenu({
        status: true,
      })
    );
    dispatch(fetchCartData());
  }, []);

  return (
    <Fragment>
      <DiaryMaker />
      {diaryList ? (
        diaryList.map((diary) => <DiaryMaker key={diary.diaryId} {...diary} />)
      ) : (
        <DiaryMaker />
      )}
    </Fragment>
  );
};

export default New;

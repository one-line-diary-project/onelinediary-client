import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import DiaryMaker from "../components/DiaryMaker";
import { uiActions } from "../store/ui-slice";
import { useDispatch, useSelector } from "react-redux";
import DateSelector from "../components/DateSelector.js";
import NoneDiary from "../components/NoneDiary";
import { fetchScrollDiaryData } from "../store/diary-action";

const Diary = () => {
  const dispatch = useDispatch();
  const [ref, setRef] = useState(null);
  const diaryList = useSelector((state) => state.diary.diaryList);
  const isLoaded = useSelector((state) => state.diary.isLoaded);

  useEffect(() => {
    dispatch(
      uiActions.checkWritableMenu({
        status: false,
      })
    );
  }, []);

  const defaultOption = {
    root: null,
    threshold: 0.5,
    rootMargin: "0px",
  };

  const checkIntersect = useCallback(([entry], observer) => {
    if (entry.isIntersecting) {
      dispatch(fetchScrollDiaryData());
    }
  }, []);

  useEffect(() => {
    let observer;
    if (ref) {
      observer = new IntersectionObserver(checkIntersect, {
        ...defaultOption,
      });
      observer.observe(ref);
    }
    return () => observer && observer.disconnect();
  }, [
    ref,
    defaultOption.root,
    defaultOption.threshold,
    defaultOption.rootMargin,
    checkIntersect,
  ]);
  return (
    <Fragment>
      <DateSelector />
      {diaryList.length > 0 ? (
        diaryList.map((diary) => <DiaryMaker key={diary._id} {...diary} />)
      ) : (
        <NoneDiary />
      )}
      {isLoaded && <p ref={setRef}>loding..</p>}
    </Fragment>
  );
};

export default Diary;

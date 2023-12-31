import { Fragment, useEffect } from "react";
import { mainDiary } from "../data/home";
import DiaryMaker from "../components/Diary/DiaryMaker/DiaryMaker";
import { useDispatch } from "react-redux";
import { uiActions } from "../store/UI/ui-slice";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      uiActions.checkWritableMenu({
        status: false,
      })
    );
  }, [dispatch]);
  return (
    <Fragment>
      <DiaryMaker key={mainDiary._id} {...mainDiary} />
    </Fragment>
  );
};

export default Home;

import { diaryActions } from "./diary-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    // 오늘 날짜를 넣어서 조회해와야함
    const fetchData = async () => {
      const response = await fetch(process.env.REACT_APP_BASE_URL);

      if (!response.ok) {
        throw new Error("데이터를 가져오지 못했습니다.");
      }
      //const data = response.json();
      const diaryData = [];
      return diaryData;
    };

    try {
      const diaryData = await fetchData();

      dispatch(
        diaryActions.replaceDiaryList({
          diaryData: diaryData,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchCartAllData = () => {
  return async (dispatch) => {
    // 오늘 날짜를 넣어서 조회해와야함
    const fetchData = async () => {
      const response = await fetch(process.env.REACT_APP_BASE_URL);

      if (!response.ok) {
        throw new Error("데이터를 가져오지 못했습니다.");
      }
      const data = response.json();
      return data;
    };

    try {
      const diaryData = await fetchData();

      dispatch(
        diaryActions.replaceDiaryList({
          diaryData,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };
};

import { diaryActions } from "./diary-slice";

export const fetchDiaryData = (searchData) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const queryParam = new URLSearchParams(searchData);
      const fullUrl = `${process.env.REACT_APP_BASE_URL}?${queryParam}`;
      const response = await fetch(fullUrl);
      const data = response.json();
      return data;
    };

    try {
      const diaryData = await fetchData();
      if (searchData.isSelect) {
        dispatch(
          diaryActions.replaceDiaryList({
            diaryDataList: diaryData || [],
          })
        );
      } else {
        dispatch(
          diaryActions.replaceDiary({
            diaryData: diaryData || {},
          })
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const sendDiaryData = (diary) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(process.env.REACT_APP_CREATE_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: diary._id,
          contents: diary.contents,
        }),
      });
      return response.json();
    };

    try {
      const result = await sendRequest();
      dispatch(
        diaryActions.replaceDiary({
          diaryData: result,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };
};

import { diaryActions } from "./diary-slice";
import { uiActions } from "./ui-slice";

export const fetchDiaryData = (searchData) => {
  return async (dispatch, getState) => {
    const fetchData = async () => {
      const queryParam = new URLSearchParams(searchData);
      const fullUrl = `${process.env.REACT_APP_BASE_URL}?${queryParam}`;
      const response = await fetch(fullUrl);
      const data = response.json();
      return data;
    };

    try {
      const diaryData = await fetchData();
      if (getState().ui.isWritableMenu) {
        dispatch(
          diaryActions.replaceDiary({
            diaryData: diaryData || [],
          })
        );
      } else {
        dispatch(
          diaryActions.replaceDiaryList({
            diaryDataList: diaryData || {},
          })
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const sendDiaryData = (diary) => {
  return async (dispatch, getState) => {
    const sendRequest = async () => {
      const response = await fetch(process.env.REACT_APP_BASE_URL, {
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
      dispatch(diaryActions.setContent({ text: "" }));

      if (getState().ui.editButtonClicked)
        dispatch(uiActions.showEditForm({ status: false }));
      if (getState().ui.deleteButtonClicked)
        dispatch(uiActions.toggleCheckbox());
    } catch (err) {
      console.log(err);
    }
  };
};

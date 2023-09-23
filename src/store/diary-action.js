import { diaryActions } from "./diary-slice";
import { uiActions } from "./ui-slice";
import { getStringDate } from "../utils/date";

export const fetchDiaryData = () => {
  return async (dispatch, getState) => {
    const fetchData = async () => {
      const fullUrl = `${process.env.REACT_APP_BASE_URL}`;
      const response = await fetch(fullUrl);
      const data = response.json();
      return data;
    };

    try {
      const diaryData = await fetchData();

      dispatch(
        diaryActions.replaceDiary({
          diaryData: diaryData || [],
        })
      );
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchDiaryDataList = () => {
  return async (dispatch, getState) => {
    const fetchData = async () => {
      const queryParam = new URLSearchParams({
        startDate: getState().diary.startDate,
        endDate: getState().diary.endDate,
        currentPage: getState().diary.currentPage,
      });

      const fullUrl = `${process.env.REACT_APP_BASE_URL}?${queryParam}`;
      const response = await fetch(fullUrl);
      const data = response.json();
      return data;
    };

    try {
      const diaryData = await fetchData();

      if (diaryData.length === 4) {
        dispatch(diaryActions.setIsload({ status: true }));
        dispatch(diaryActions.setCurrentPage());
      } else {
        dispatch(
          diaryActions.setIsload({
            status: false,
          })
        );
      }
      dispatch(
        diaryActions.replaceDiaryList({
          diaryDataList: diaryData || {},
        })
      );
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchScrollDiaryData = () => {
  return async (dispatch, getState) => {
    const fetchData = async () => {
      const queryParam = new URLSearchParams({
        startDate: getState().diary.startDate,
        endDate: getState().diary.endDate,
        currentPage: getState().diary.currentPage,
      });

      const fullUrl = `${process.env.REACT_APP_BASE_URL}?${queryParam}`;
      const response = await fetch(fullUrl);
      const data = response.json();
      return data;
    };

    try {
      const diaryData = await fetchData();

      if (diaryData.length === 4) {
        dispatch(diaryActions.setIsload({ status: true }));
        dispatch(diaryActions.setCurrentPage());
      } else {
        dispatch(
          diaryActions.setIsload({
            status: false,
          })
        );
      }
      dispatch(
        diaryActions.pushDiaryList({
          diaryDataList: diaryData || {},
        })
      );
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

import { diaryActions } from "../Diary/diary-slice";
import { uiActions } from "../UI/ui-slice";

export const fetchCheckLogin = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const fullUrl = `${process.env.REACT_APP_LOGIN_CHECK_URL}`;
      const response = await fetch(fullUrl, {
        credentials: "include",
      });
      const data = response.json();
      return data;
    };

    try {
      const login = await fetchData();

      if (login.id) {
        dispatch(uiActions.toggleLogin({ status: true }));
      } else {
        dispatch(uiActions.toggleLogin({ status: false }));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchLogout = () => {
  return async (dispatch) => {
    const logout = async () => {
      const response = await fetch(`${process.env.REACT_APP_LOGOUT_URL}`, {
        method: "POST",
        credentials: "include",
      });
      return response.json();
    };

    try {
      await logout();
      dispatch(uiActions.toggleLogin({ status: false }));
      dispatch(diaryActions.replaceDiary({ diaryData: {} }));
      dispatch(diaryActions.replaceDiaryList({ diaryDataList: {} }));
    } catch (err) {
      console.log(err);
    }
  };
};

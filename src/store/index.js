import { configureStore } from "@reduxjs/toolkit";

import uiSlice from "./ui-slice";
import diarySlice from "./diary-slice";
import userSlice from "./user-slice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    diary: diarySlice.reducer,
    ui: uiSlice.reducer,
  },
});

export default store;

import { configureStore } from "@reduxjs/toolkit";

import uiSlice from "./UI/ui-slice";
import diarySlice from "./Diary/diary-slice";

const store = configureStore({
  reducer: {
    diary: diarySlice.reducer,
    ui: uiSlice.reducer,
  },
});

export default store;

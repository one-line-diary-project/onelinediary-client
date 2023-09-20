import { configureStore } from "@reduxjs/toolkit";

import uiSlice from "./ui-slice";
import diarySlice from "./diary-slice";

const store = configureStore({
  reducer: { diary: diarySlice.reducer, ui: uiSlice.reducer },
});

export default store;

import { createSlice } from "@reduxjs/toolkit";

const diarySlice = createSlice({
  name: "diary",
  initialState: {
    diaryList: [],
  },
  reducers: {
    replaceDiaryList(state, action) {
      state.diaryList = action.payload.diaryData;
    },
    addContentToList(state, action) {
      const newContent = action.payload;
      const existingContent = state.diaryList.find(
        (content) => content.id === newContent.id
      );
      if (!existingContent) {
        state.diaryList.push({
          diaryId: newContent.id,
          registDate: newContent.registDate,
          user: newContent.user,
          contents: newContent.contents,
        });
      } else {
        existingContent.contents = [
          ...existingContent.contents,
          ...newContent.contents,
        ];
      }
    },
    editContentFromList(state, action) {},
    removeContentFromLit(state, action) {},
  },
});

export const diaryActions = diarySlice.actions;

export default diarySlice;

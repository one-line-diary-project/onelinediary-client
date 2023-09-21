import { createSlice } from "@reduxjs/toolkit";

const diarySlice = createSlice({
  name: "diary",
  initialState: {
    diaryList: [],
    diary: {},
    editId: "",
    content: "",
  },
  reducers: {
    replaceDiary(state, action) {
      state.diary = action.payload.diaryData;
    },
    replaceDiaryList(state, action) {
      state.diaryList = action.payload.diaryDataList;
    },

    addContentToDiary(state, action) {
      const newContent = action.payload;
      // const existingContent = state.diaryList.find(
      //   (content) => content._id === newContent.id
      // );
      if (!state.diary._id) {
        state.diary = {
          _id: newContent.id,
          change: true,
          contents: [newContent.content],
        };
      } else {
        state.diary.change = true;
        state.diary.contents = [...state.diary.contents, newContent.content];
      }
    },
    editContentFromDiary(state) {
      if (state.diary._id) {
        state.diary.change = true;
        state.diary.contents = state.diary.contents.map((item) => {
          if (item._id === state.editId) {
            return { ...item, content: state.content };
          }
          return item;
        });
      }
    },
    setEditId(state, action) {
      state.editId = action.payload._id;
    },
    setContent(state, action) {
      state.content = action.payload.text;
    },
    removeContentFromDiary(state, action) {},
  },
});

export const diaryActions = diarySlice.actions;

export default diarySlice;

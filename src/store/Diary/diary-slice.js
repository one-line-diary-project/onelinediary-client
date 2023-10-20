import { createSlice } from "@reduxjs/toolkit";

const diarySlice = createSlice({
  name: "diary",
  initialState: {
    diaryList: [],
    diary: {},
    editId: "",
    content: "",
    isLoaded: false,
    currentPage: 1,
    startDate: "",
    endDate: "",
    perPage: 4,
    // deleteId: [],
  },
  reducers: {
    replaceDiary(state, action) {
      state.diary = action.payload.diaryData;
    },
    replaceDiaryList(state, action) {
      state.diaryList = action.payload.diaryDataList;
    },
    pushDiaryList(state, action) {
      state.diaryList.push(...action.payload.diaryDataList);
      // state.diaryList = state.diaryList.concat(action.payload.diaryDataList);
    },

    addContentToDiary(state, action) {
      const newContent = action.payload;

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
    // setDeleteId(state, action) {
    //   state.deleteId = action.payload._id;
    // },
    setContent(state, action) {
      state.content = action.payload.text;
    },
    removeContentFromDiary(state, action) {
      const deleteId = action.payload._id;

      if (state.diary._id) {
        state.diary.change = true;
        state.diary.contents = state.diary.contents.filter((item) => {
          return !deleteId.includes(item._id);
        });
      }
    },
    resetCurrentPage(state) {
      state.currentPage = 1;
    },
    setIsload(state, action) {
      state.isLoaded = action.payload.status;
    },
    setCurrentPage(state) {
      state.currentPage = state.currentPage + 1;
    },
    setSearhDate(state, action) {
      state.startDate = action.payload.startDate;
      state.endDate = action.payload.endDate;
      state.currentPage = 1;
    },
  },
});

export const diaryActions = diarySlice.actions;

export default diarySlice;

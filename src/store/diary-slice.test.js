import { configureStore } from "@reduxjs/toolkit";
import diarySlice from "./diary-slice";
import uiSlice from "./ui-slice";

import { diaryActions } from "../store/diary-slice";
import store from ".";
// let store;

const mockData = {
  _id: "6524ebda80a947ce3eb48d47",
  contents: [
    {
      content: "Test data",
      postTime: "PM 3:14",
      _id: "1",
    },
  ],
  createdAt: "2023-10-10 15:14:50",
  author: "107322256320063529039",
};

// beforeEach(() => {
//   store = configureStore({
//     reducer: {
//       diary: diarySlice.reducer,
//       ui: uiSlice.reducer,
//     },
//   });
// });

describe("diary-slice", () => {
  it("Repalce diary", () => {
    let state = store.getState().diary;
    const preDiary = state.diary;
    expect(preDiary).toEqual({});
    store.dispatch(
      diaryActions.replaceDiary({
        diaryData: mockData,
      })
    );
    state = store.getState().diary;
    expect(state.diary).not.toEqual({});
  });

  it("Repalce diaryList", () => {
    let state = store.getState().diary;
    const preDiaryList = state.diaryList;
    store.dispatch(
      diaryActions.replaceDiaryList({
        diaryDataList: [mockData],
      })
    );
    state = store.getState().diary;
    expect(state.diaryList).not.toHaveLength(0);
  });

  it("push diaryList", () => {
    let state = store.getState().diary;
    const preDiaryList = state.diaryList;
    const pushData = [
      {
        _id: "6524ebda80a947ce3eb48d410",
        contents: [
          {
            content: "Test data2",
            postTime: "PM 3:15",
            _id: "1",
          },
        ],
        createdAt: "2023-10-10 15:15:50",
        author: "107322256320063529039",
      },
    ];
    store.dispatch(
      diaryActions.pushDiaryList({
        diaryDataList: pushData,
      })
    );
    state = store.getState().diary;
    expect(state.diaryList).not.toEqual(preDiaryList);
  });

  it("add a new exist content", () => {
    // add
    store.dispatch(
      diaryActions.addContentToDiary({
        id: "6524ebda80a947ce3eb48d47",
        content: {
          _id: "2",
          content: "Add Existing test data",
          postTime: "PM 4:14",
        },
      })
    );
    let state = store.getState().diary;
    const newlyAddedExistDiary = state.diary.contents.find(
      (content) => content._id === "2"
    );
    expect(newlyAddedExistDiary.content).toBe("Add Existing test data");
  });

  it("add a new content", () => {
    store.dispatch(
      diaryActions.replaceDiary({
        diaryData: {},
      })
    );

    store.dispatch(
      diaryActions.addContentToDiary({
        id: "6524ebda80a947ce3eb48d51",
        content: {
          _id: "1",
          content: "Add new test data",
          postTime: "PM 3:11",
        },
      })
    );
    let state = store.getState().diary;
    expect(state.diary._id).toBe("6524ebda80a947ce3eb48d51");
  });
});

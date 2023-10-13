// import { configureStore } from "@reduxjs/toolkit";
// import diarySlice from "./diary-slice";
// import uiSlice from "./ui-slice";

import { diaryActions } from "../store/diary-slice";
import store from ".";
import { act } from "react-dom/test-utils";
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
    act(() => {
      store.dispatch(
        diaryActions.replaceDiary({
          diaryData: {},
        })
      );
    });

    let state = store.getState().diary;
    expect(state.diary).toEqual({});

    act(() => {
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
    });

    state = store.getState().diary;
    expect(state.diary._id).toBe("6524ebda80a947ce3eb48d51");
  });

  it("edit a content", () => {
    let state = store.getState().diary;
    act(() => {
      store.dispatch(diaryActions.setEditId({ _id: "1" }));
    });
    state = store.getState().diary;
    expect(state.editId).toBe("1");

    act(() => {
      store.dispatch(diaryActions.setContent({ text: "edit data" }));
    });
    state = store.getState().diary;
    expect(state.content).toBe("edit data");

    act(() => {
      store.dispatch(diaryActions.editContentFromDiary());
    });
    state = store.getState().diary;
    const newlyAddedExistDiary = state.diary.contents.find(
      (content) => content._id === "1"
    );
    expect(newlyAddedExistDiary.content).toBe("edit data");
  });

  it("remove a content", () => {
    store.dispatch(diaryActions.removeContentFromDiary({ _id: "1" }));
    let state = store.getState().diary;
    expect(state.diary.contents).toHaveLength(0);
  });

  it("reset currentPage", () => {
    store.dispatch(diaryActions.resetCurrentPage());
    let state = store.getState().diary;
    expect(state.currentPage).toBe(1);
  });

  it("plus currentPage", () => {
    let state = store.getState().diary;
    const preCurrentPage = state.currentPage;
    store.dispatch(diaryActions.setCurrentPage());
    state = store.getState().diary;
    expect(state.currentPage).toBeGreaterThan(preCurrentPage);
  });

  it("update load status", () => {
    let state = store.getState().diary;
    const preIsLoaded = state.isLoaded;
    store.dispatch(diaryActions.setIsload({ status: true }));
    state = store.getState().diary;
    expect(state.isLoaded).not.toEqual(preIsLoaded);
  });

  it("update search date", () => {
    store.dispatch(
      diaryActions.setSearhDate({
        startDate: "2023-10-10",
        endDate: "2023-10-10",
      })
    );

    let state = store.getState().diary;
    expect(state.startDate).toBe("2023-10-10");
    expect(state.endDate).toBe("2023-10-10");
    expect(state.currentPage).toEqual(1);
  });
});

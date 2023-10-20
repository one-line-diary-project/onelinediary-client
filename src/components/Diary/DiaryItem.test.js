import userEvent from "@testing-library/user-event";
import { screen, act } from "../../test/utils/testUtil";
import DiaryItem from "./DiaryItem";
import { Provider } from "react-redux";
import store from "../../store";
import { render } from "@testing-library/react";
import { uiActions } from "../../store/UI/ui-slice";
const mockdata = {
  _id: "b1234",
  content: "diaryMaker Test1",
  postTime: "PM 3:14",
};

describe("DiaryItem components - unShow", () => {
  let tree;
  beforeEach(() => {
    act(() => {
      tree = render(
        <Provider store={store}>
          <DiaryItem key={mockdata._id} {...mockdata} showChck={true} />
        </Provider>
      );
    });
    act(() => {
      store.dispatch(uiActions.checkWritableMenu({ status: true }));
    });
  });
  it("renders without crashing", () => {
    expect(tree).toBeDefined();
  });
  it("renders diary item", () => {
    const diaryItemElement = screen.getByText("diaryMaker Test1");
    expect(diaryItemElement).toBeInTheDocument();
  });
  it("renders delete checkbox", () => {
    const checkboxElement = screen.getByRole("checkbox");
    expect(checkboxElement).toBeInTheDocument();
  });
  it("change store if edit button clicked ", () => {
    const button = screen.getByRole("button");
    userEvent.click(button);
    let diaryState = store.getState().diary;
    let uiState = store.getState().ui;
    expect(diaryState.editId).toBe("b1234");
    expect(diaryState.content).toBe("diaryMaker Test1");
    expect(uiState.editButtonClicked).toEqual(true);
  });
});

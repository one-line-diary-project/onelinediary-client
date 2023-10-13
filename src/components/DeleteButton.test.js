import userEvent from "@testing-library/user-event";
import { screen, act } from "../test/utils/testUtil";
import DeleteButton from "./DeleteButton";
import { Provider } from "react-redux";
import store from "../store";
import { render } from "@testing-library/react";
import { uiActions } from "../store/ui-slice";
import DiaryItem from "./DiaryItem";

const mockdata = {
  _id: "b1234",
  content: "diaryMaker Test1",
  postTime: "PM 3:14",
};

describe("DeleteButton components", () => {
  let tree;

  beforeEach(() => {
    act(() => {
      tree = render(
        <Provider store={store}>
          <DiaryItem key={mockdata._id} {...mockdata} showChck={true} />
          <DeleteButton />
        </Provider>
      );
    });
  });

  it("renders without crashing", () => {
    expect(tree).toBeDefined();
  });
  it("renders delete button ", () => {
    const buttonElement = screen.getByTestId("deleteButton");
    expect(buttonElement).toBeInTheDocument();
  });
  it("toggle delete state if delete button clicked ", () => {
    let state = store.getState().ui;
    const preShow = state.deleteButtonClicked;
    const buttonElement = screen.getByTestId("deleteButton");
    act(() => {
      userEvent.click(buttonElement);
    });
    state = store.getState().ui;
    expect(state.deleteButtonClicked).not.toEqual(preShow);
  });

  it("renders delete cancel button ", () => {
    const cancelBtnElement = screen.getByTestId("cancelButton");
    expect(cancelBtnElement).toBeInTheDocument();
  });
  it("confirm delete when delete confrm button clicked", () => {
    act(() => {
      const confirmSpy = jest
        .spyOn(window, "confirm")
        .mockImplementation(() => true);
    });
    const confirmBtnElement = screen.getByTestId("confirmButton");
    const checkboxs = screen.getByRole("checkbox");
    act(() => {
      userEvent.click(checkboxs);
    });
    act(() => {
      userEvent.click(confirmBtnElement);
    });
    expect(window.confirm).toHaveBeenCalled();
    window.confirm.mockRestore();
  });

  it("toggle delete state when delete cancel button clicked ", () => {
    act(() => {
      store.dispatch(uiActions.toggleCheckbox());
    });
    let state = store.getState().ui;
    const preShow = state.deleteButtonClicked;
    const buttonElement = screen.getByTestId("cancelButton");
    act(() => {
      userEvent.click(buttonElement);
    });
    state = store.getState().ui;
    expect(state.deleteButtonClicked).not.toEqual(preShow);
  });

  it("confirm delete when no data and delete confrm button clicked ", () => {
    act(() => {
      store.dispatch(uiActions.toggleCheckbox());
    });
    act(() => {
      const confirmSpy = jest
        .spyOn(window, "alert")
        .mockImplementation(() => true);
    });

    const confirmBtnElement = screen.getByTestId("confirmButton");

    act(() => {
      userEvent.click(confirmBtnElement);
    });
    expect(window.alert).toHaveBeenCalled();
    window.alert.mockRestore();
  });
});

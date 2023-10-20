import userEvent from "@testing-library/user-event";
import { screen, act } from "../../test/utils/testUtil";
import DiaryForm from "./DiaryForm";
import { Provider } from "react-redux";
import store from "../../store";
import { render } from "@testing-library/react";
import { uiActions } from "../../store/UI/ui-slice";

describe("DiaryForm components", () => {
  let tree;

  beforeEach(() => {
    act(() => {
      tree = render(
        <Provider store={store}>
          <DiaryForm key="1" />
        </Provider>
      );
    });
    act(() => {
      store.dispatch(uiActions.toggleLogin({ status: true }));
    });
  });

  it("renders without crashing", () => {
    expect(tree).toBeDefined();
  });

  it("renders input text", () => {
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
  });

  it("change value when onChange event called ", () => {
    const inputElement = screen.getByRole("textbox");
    act(() => {
      userEvent.type(inputElement, "change");
    });
    expect(inputElement).toHaveValue("change");
  });

  it("add store value when submit button clicked ", () => {
    const buttonElement = screen.getByRole("button");
    act(() => {
      userEvent.click(buttonElement);
    });
    const state = store.getState().diary;
    expect(state.diary.contents[0].content).toBe("change");
  });

  it("change store value when submit button clicked ", () => {
    act(() => {
      store.dispatch(uiActions.showEditForm({ state: true }));
    });
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toHaveTextContent("수정");
    act(() => {
      userEvent.click(buttonElement);
    });
    expect(buttonElement).toHaveTextContent("등록");
  });

  it("clicked submit button when not logined", () => {
    act(() => {
      const alertSpy = jest
        .spyOn(window, "alert")
        .mockImplementation(() => true);
    });
    act(() => {
      store.dispatch(uiActions.toggleLogin({ status: false }));
    });
    const buttonElement = screen.getByRole("button");
    act(() => {
      userEvent.click(buttonElement);
    });
    expect(window.alert).toHaveBeenCalled();

    window.alert.mockRestore();
  });
});

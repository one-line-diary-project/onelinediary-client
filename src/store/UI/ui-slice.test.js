import { uiActions } from "../store/ui-slice";

import store from "..";

describe("ui-slice", () => {
  it("Update writableMenu status ", () => {
    let state = store.getState().ui;
    const preWritableMenuStatus = state.isWritableMenu;
    store.dispatch(
      uiActions.checkWritableMenu({
        status: true,
      })
    );
    state = store.getState().ui;
    expect(preWritableMenuStatus).not.toEqual(state.isWritableMenu);
    expect(state.deleteButtonClicked).toEqual(false);
    expect(state.editButtonClicked).toEqual(false);
  });

  it("Toggle checkbox view", () => {
    let state = store.getState().ui;
    const preDelBtnStatus = state.deleteButtonClicked;
    store.dispatch(uiActions.toggleCheckbox());
    state = store.getState().ui;
    const nowDelBtnStatus = state.deleteButtonClicked;
    expect(preDelBtnStatus).not.toEqual(nowDelBtnStatus);
  });

  it("Update Edit status", () => {
    let state = store.getState().ui;
    const preEditStatus = state.editButtonClicked;
    store.dispatch(
      uiActions.showEditForm({
        state: true,
      })
    );
    state = store.getState().ui;
    const nowEditStatus = state.editButtonClicked;
    expect(preEditStatus).not.toEqual(nowEditStatus);
  });

  it("Update login status", () => {
    let state = store.getState().ui;
    const preLoginStatus = state.isLogined;
    store.dispatch(
      uiActions.toggleLogin({
        state: true,
      })
    );
    state = store.getState().ui;
    const nowLoginStatus = state.isLogined;
    expect(preLoginStatus).not.toEqual(nowLoginStatus);
  });
});

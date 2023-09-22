import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isWritableMenu: false,
    deleteButtonClicked: false,
    editButtonClicked: false,
  },
  reducers: {
    checkWritableMenu(state, action) {
      state.isWritableMenu = action.payload.status;
      state.deleteButtonClicked = false;
      state.editButtonClicked = false;
    },
    toggleCheckbox(state) {
      state.deleteButtonClicked = !state.deleteButtonClicked;
    },
    showEditForm(state, action) {
      state.editButtonClicked = action.payload.state;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;

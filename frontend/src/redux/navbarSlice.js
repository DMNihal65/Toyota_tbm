import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeItem: "dashboard",
  visible: false,
};

export const navBarSlice = createSlice({
  name: "navBar",
  initialState,
  reducers: {
    setActiveItem: (state, action) => {
      state.activeItem = action.payload;
    },
    setVisible: (state, action) => {
      state.visible = action.payload;
    },
    toggleVisible: (state) => {
      state.visible = !state.visible;
    },
  },
});

export const { setActiveItem, setVisible, toggleVisible } = navBarSlice.actions;

export default navBarSlice.reducer;
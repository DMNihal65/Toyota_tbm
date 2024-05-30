import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  isAuthenticated: false,
  user: null,
  error: "",
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    fetchUserRequest: (state) => {
      state.loading = true;
      state.user = null;
      state.error = "";
    },
    fetchUserSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = "";
    },
    fetchUserFail: (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.payload;
    },
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user; 
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
    },
  },
});

export const {
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFail,
  login,
  logout,
} = authSlice.actions;
export default authSlice.reducer;

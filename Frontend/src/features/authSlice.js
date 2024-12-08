import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticate: false,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticate = true;
      state.token = action.payload.token;
    },
    userLoggedOut: (state, action) => {
      state.user = null;
      state.isAuthenticate = false;
      state.token = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { userLoggedIn , userLoggedOut } = authSlice.actions;

export default authSlice.reducer;

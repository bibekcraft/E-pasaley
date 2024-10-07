// src/slice/authSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
    setUser(state, action) {
      // Set user details or any other state related to user
      state.isLoggedIn = true; // Assuming user is set, mark as logged in
    },
    clearUser(state) {
      // Clear user details or any other state related to user
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout, setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;

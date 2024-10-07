
// authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  user: null | { username: string; email: string }; // Customize as needed
}

const initialState: AuthState = {
  isAuthenticated: !!localStorage.getItem('user'), // Check if user exists in localStorage
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ username: string; email: string }>) {
      state.isAuthenticated = true;
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload)); // Persist user
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('user'); // Remove user from localStorage
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

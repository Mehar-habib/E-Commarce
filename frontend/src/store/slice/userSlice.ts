/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of the user state
interface UserState {
  user: any | null; // User object (can be any type or null)
  isEmailVerified: boolean; // Whether the user's email is verified
  isLoginDialogOpen: boolean; // Controls visibility of login modal/dialog
  isLoggedIn: boolean; // Whether the user is currently logged in
}

// Initial state for the user slice
const initialState: UserState = {
  user: null,
  isEmailVerified: false,
  isLoginDialogOpen: false,
  isLoggedIn: false,
};

// Create the Redux slice for user state management
const userSlice = createSlice({
  name: "user", // Slice name
  initialState,
  reducers: {
    // Set the user data
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },

    // Set email verification status
    setEmailVerified: (state, action: PayloadAction<any>) => {
      state.isEmailVerified = action.payload;
    },

    // Reset user state (e.g. on logout)
    logout: (state) => {
      state.user = null;
      state.isEmailVerified = false;
      state.isLoggedIn = false;
    },

    // Toggle the visibility of the login dialog/modal
    toggleLoginDialog: (state) => {
      state.isLoginDialogOpen = !state.isLoginDialogOpen;
    },

    // Mark user as logged in (used after login success)
    authStatus: (state) => {
      state.isLoggedIn = true;
    },
  },
});

// Export actions to be used in components
export const {
  setUser,
  setEmailVerified,
  logout,
  toggleLoginDialog,
  authStatus,
} = userSlice.actions;

// Export reducer to be included in the store
export default userSlice.reducer;

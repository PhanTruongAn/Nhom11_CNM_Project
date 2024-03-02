import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "../api/userApi";
const initialState = {
  isAuthenticated: false,
  user: {},
};
export const fetchUserToken = createAsyncThunk(
  "userLogin/login-user",
  async () => {
    try {
      const res = await userApi.loginUser();

      if (res && res.EC === 0) {
        return await res.DT;
      } else {
        throw new Error(res.EM);
      }
    } catch (error) {
      console.error("Error fetching user token:", error);
      throw error; // Re-throw the error to be captured by the rejected state
    }
  }
);

export const userSlice = createSlice({
  name: "userLogin",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserToken.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(fetchUserToken.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = {};
      });
  },
});
export const { updateUser } = userSlice.actions;
export default userSlice.reducer;

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
      let res = await userApi.loginUser();

      if (res && res.EC === 0) {
        console.log(res.DT);
        return res.DT;
      } else {
        throw new Error(res.EM);
      }
    } catch (error) {
      throw error;
    }
  }
);
export const userSlice = createSlice({
  name: "userLogin",
  initialState,
  reducers: {},
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

export default userSlice.reducer;

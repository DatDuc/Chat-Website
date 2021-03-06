import signinAPI from "../../api/signinAPI";
import Cookies from "js-cookie";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const signin = createAsyncThunk("auth/signin", async (payload) => {
  const data = await signinAPI.signIn(payload);
  // localStorage.setItem("token", data.data.accessToken);
  // localStorage.setItem("user", JSON.stringify(data.data.user));
  // localStorage.setItem("refreshToken", data.data.refreshToken);

  // Cookies.set("token", data.data.accessToken);
  // Cookies.set("refreshToken", data.data.refreshToken);

  console.log(data);
  // console.log(data);
  return data;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    current: JSON.parse(localStorage.getItem("user")),
  },
  reducers: {},
  extraReducers: {
    [signin.fulfilled]: (state, action) => {
      state.current = action.payload; //update trên store
    },
  },
});

const { reducer } = userSlice;
export default reducer;

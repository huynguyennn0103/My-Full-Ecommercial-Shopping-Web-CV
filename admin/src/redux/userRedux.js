import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    chatUser: null,
    chatId: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state,action)=>{
        state.isFetching = true
    },
    loginSuccess: (state, action)=>{       
        state.isFetching = false;
        state.currentUser=action.payload
        state.error = false
    },
    loginFailure: (state, action)=>{
        state.isFetching = false;
        state.error=true
        state.currentUser = null
    },
    logout: (state) => {
      state.currentUser = null;
      state.chatId = null;
      state.chatUser = null;
    },
    changeUser:(state, action)=>{
      state.chatUser = action.payload;
      state.chatId = state.currentUser._id > action.payload._id? state.currentUser._id  + action.payload._id: action.payload._id + state.currentUser._id ;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout,changeUser, addNoti, removeNoti } = userSlice.actions;
export default userSlice.reducer;
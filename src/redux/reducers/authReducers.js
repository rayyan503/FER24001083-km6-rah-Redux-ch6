import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const initialState = {
  token: null,
  showPassword: false,
  isLoggedIn: false,
  user: null,
  login: null,
};

const persistConfig = {
  key: "auth",
  storage: storage,
};

const loginSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setLogin: (state, action) => {
      state.login = action.payload;
    },
    setShowPassword: (state) => {
      state.showPassword = !state.showPassword;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    // setUserId: (state, action) => {
    //   state.userID = action.payload;
    // },
    // setLogout: (state) => {
    //   state.token = null;
    // },
  },
});

const persistedAuthReducer = persistReducer(persistConfig, loginSlice.reducer);
export const { setToken, setShowPassword, setUser, setIsLoggedIn, setLogin } =
  loginSlice.actions;

export default persistedAuthReducer;

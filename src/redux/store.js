import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import dataReducers from "./reducers/dataReducers";
import navbarReducers from "./reducers/navbarReducers";
import authReducers from "./reducers/authReducers";
import modalReducers from "./reducers/modalReducers";

const rootReducers = combineReducers({
  hero: dataReducers,
  navbar: navbarReducers,
  auth: authReducers,
  modal: modalReducers,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: import.meta.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(thunk),
});

export const persistor = persistStore(store);

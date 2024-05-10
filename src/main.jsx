import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./redux/store.js";
import { store } from "./redux/store.js";
import Home from "./Pages/Home.jsx";
import DataHero from "./Pages/DataHero.jsx";
import SearchHero from "./Pages/SearchHero.jsx";
import DetailHero from "./Pages/DetailHero.jsx";
import Login from "./Pages/Login.jsx";
import HomeUser from "./Pages/HomeUser.jsx";
import Register from "./Pages/Register.jsx";
import About from "./Pages/About.jsx";
import Contact from "./Pages/Contact.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/login/homeuser",
    element: <HomeUser />,
  },
  {
    path: "/homeuser",
    element: <HomeUser />,
  },
  {
    path: "/datahero",
    element: <DataHero />,
  },
  {
    path: "/search",
    element: <SearchHero />,
  },
  {
    path: "/detail",
    element: <DetailHero />,
  },
  {
    path: "/search/detail",
    element: <DetailHero />,
  },
  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "/register/login",
    element: <Login />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GoogleOAuthProvider clientId="3926213107-qa75ehp4erc5okp17ffaa67onkdi1na8.apps.googleusercontent.com">
          <RouterProvider router={router} />
        </GoogleOAuthProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

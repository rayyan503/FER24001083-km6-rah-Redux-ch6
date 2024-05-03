import axios from "axios";
import {
  setIsLoggedIn,
  setLogin,
  setToken,
  setUser,
} from "../reducers/authReducers";
import { toast } from "react-toastify";

export const getMe =
  (navigate, navigatePath, navigatePathError) => async (dispatch, getState) => {
    try {
      const { token } = getState().auth;

      if (!token) return;

      const response = await axios.get(
        `https://shy-cloud-3319.fly.dev/api/v1/auth/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data.data;

      dispatch(setUser(data));

      // jika parameter navigasiPath false/null/undifined, maka tidak akan dieksekusi
      if (navigatePath) navigate(navigatePath);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Jika token tidak valid
        if (error.response.status === 401) {
          dispatch(logout(null));

          // jika parameter navigasiPathError false/null/undifined, maka tidak akan dieksekusi
          if (navigatePathError) navigate(navigatePathError);
          return;
        }

        toast.error(error.response.data.message);
        return;
      }
      toast.error(error.message);
    }
  };

export const login = (data, navigate) => async (dispatch) => {
  try {
    let config = {
      method: "post",
      url: `https://shy-cloud-3319.fly.dev/api/v1/auth/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios.request(config);
    const { token } = response.data.data;

    console.log("response", response);
    dispatch(setLogin("LogindenganEmailPassword"));
    dispatch(setToken(token));
    dispatch(setIsLoggedIn(true));
    dispatch(getMe(null, null, null));

    navigate("/homeuser", {
      state: {
        success: "Login Berhasil",
      },
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response.data.message);
      return;
    }
    toast.error(error.message);
  }
};

export const register = (data, navigate) => async (dispatch) => {
  try {
    let config = {
      method: "post",
      url: `https://shy-cloud-3319.fly.dev/api/v1/auth/register`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios.request(config);
    const { token } = response.data.data;

    dispatch(setToken(token));
    dispatch(setIsLoggedIn(true));
    dispatch(getMe(null, null, null));
    console.log("responseRegister", response);
    navigate("/login", {
      state: {
        success: "Registrasi Berhasil",
      },
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response.data.message);
      return;
    }
    toast.error(error.message);
  }
};

export const registerLoginWithGoogle =
  (accessToken, navigate) => async (dispatch) => {
    try {
      let data = JSON.stringify({
        access_token: accessToken,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `https://shy-cloud-3319.fly.dev/api/v1/auth/google`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios.request(config);
      const { token } = response.data.data;
      dispatch(setLogin("google"));
      dispatch(setToken(token));
      dispatch(setIsLoggedIn(true));
      dispatch(getMe(null, null, null));
      console.log("token", response.data.data);

      navigate("/homeuser", {
        state: {
          success: "Login dengan Google Berhasil",
        },
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response.data.message);
        return;
      }
      toast.error(error.message);
    }
  };

export const logout = (navigate) => (dispatch) => {
  try {
    dispatch(setLogin(null));
    dispatch(setToken(null));
    dispatch(setIsLoggedIn(false));
    dispatch(setUser(null));

    navigate("/login", {
      state: {
        success: "Logout berhasil",
      },
    });
  } catch (error) {
    toast.error(error?.message);
  }
};

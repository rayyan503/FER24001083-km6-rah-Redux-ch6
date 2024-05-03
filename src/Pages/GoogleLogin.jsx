import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerLoginWithGoogle } from "../redux/actions/authActions";

function GoogleLogin({ buttonText }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (responseGoogle) =>
      dispatch(registerLoginWithGoogle(responseGoogle.access_token, navigate)),
  });

  return (
    <button
      type="button"
      className="py-2 px-5 mt-2 bg-yellow-500 text-white rounded-md hover:bg-green-400 flex items-center justify-center"
      onClick={() => loginWithGoogle()}
    >
      {buttonText} Login dengan Google
    </button>
  );
}

export default GoogleLogin;

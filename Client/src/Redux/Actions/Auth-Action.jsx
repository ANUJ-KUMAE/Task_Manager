import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  Clear_Error,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOAD_LOGINUSER_FAIL,
  LOAD_LOGINUSER_REQUEST,
  LOAD_LOGINUSER_SUCCESS,
} from "../Constants/AuthConstant";

const RegisterAction = (newUser) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });

    const configData = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "https://task-manager-api-silk.vercel.app/auth/User/registerNew",
      newUser,
      configData
    );

    dispatch({
      type: REGISTER_SUCCESS,
      payload: data.user,
    });
    localStorage.setItem("token", data.token);
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response,
    });
  }
};

const LoginAction = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const configData = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "https://task-manager-api-silk.vercel.app/auth/User/loginUser",
      { email, password },
      configData
    );

    dispatch({ type: LOGIN_SUCCESS, payload: data.findEmail });
    localStorage.setItem("token", data.token);
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response,
    });
  }
};

const LoadLoginUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_LOGINUSER_REQUEST });

    const token = localStorage.getItem("token");
    const AuthorizationToken = `Bearer ${token}`;

    const configData = {
      headers: {
        "Content-Type": "application/json",
        Authorization: AuthorizationToken,
      },
    };

    const { data } = await axios.get(
      "https://task-manager-api-silk.vercel.app/auth/User/Loginuserdata",
      configData
    );

    dispatch({
      type: LOAD_LOGINUSER_SUCCESS,
      payload: data.userData,
    });
  } catch (error) {
    dispatch({
      type: LOAD_LOGINUSER_FAIL,
      payload: error.response,
    });
  }
};

const LogOutuser = () => async (dispatch) => {
  try {
    localStorage.removeItem("token");
    dispatch({
      type: LOGOUT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

const ClearErrors = () => async (dispatch) => {
  dispatch({
    type: Clear_Error,
  });
};

export { LoginAction, LogOutuser, ClearErrors, RegisterAction, LoadLoginUser };

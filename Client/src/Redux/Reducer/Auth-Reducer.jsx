import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOAD_LOGINUSER_REQUEST,
  LOAD_LOGINUSER_SUCCESS,
  LOGOUT_FAIL,
  LOAD_LOGINUSER_FAIL,
  Clear_Error,
  LOGOUT_SUCCESS,
} from "../Constants/AuthConstant";

const initialState = {
  loading: false,
  isAuthenticated: false,
  //user:{}
  user: null,
  error: null,
};

const LoginSignupReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
    case LOAD_LOGINUSER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };

    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
    case LOAD_LOGINUSER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };

    case LOGOUT_SUCCESS:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        error: null,
      };

    case LOGOUT_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: action.payload,
      };

    case LOAD_LOGINUSER_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    case LOGIN_FAIL:
    case REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    case Clear_Error:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export { LoginSignupReducer };

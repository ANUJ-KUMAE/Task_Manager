import axios from "axios";
import {
  GET_SINGLE_PRODUCT,
  NEW_PRODUCT_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_FAIL,
  PRODUCT_REQUEST,
  PRODUCT_SUCCESS,
  SINGLE_PRODUCT_FAIL,
  SINGLE_PRODUCT_REQUEST,
  SINGLE_PRODUCT_UPDATE_FAIL,
  SINGLE_PRODUCT_UPDATE_REQUEST,
  SINGLE_PRODUCT_UPDATE_SUCCESS,
} from "../Constants/WorkConstant";

const GetAllTaskData = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_REQUEST });

    const token = localStorage.getItem("token");
    const AuthorizationToken = `Bearer ${token}`;

    const configData = {
      headers: {
        "Content-Type": "application/json",
        Authorization: AuthorizationToken,
      },
    };

    const { data } = await axios.get(
      "http://localhost:5083/api/work/viewAlltask",
      configData
    );

    dispatch({
      type: PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_FAIL,
      payload: error.response,
    });
  }
};

const GetSingleTaskData = (id) => async (dispatch) => {
  try {
    dispatch({ type: SINGLE_PRODUCT_REQUEST });

    const token = localStorage.getItem("token");
    const AuthorizationToken = `Bearer ${token}`;

    const configData = {
      headers: {
        "Content-Type": "application/json",
        Authorization: AuthorizationToken,
      },
    };

    const { data } = await axios.get(
      `http://localhost:5083/api/work/getSingleTask/${id}`,
      configData
    );

    dispatch({
      type: GET_SINGLE_PRODUCT,
      payload: data.singleTask,
    });
  } catch (error) {
    dispatch({
      type: SINGLE_PRODUCT_FAIL,
      payload: error.response,
    });
  }
};

const AdduserNewtask = (taskData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PRODUCT_REQUEST });

    const token = localStorage.getItem("token");
    const AuthorizationToken = `Bearer ${token}`;

    const configData = {
      headers: {
        "Content-Type": "application/json",
        Authorization: AuthorizationToken,
      },
    };

    const { data } = await axios.post(
      "http://localhost:5083/api/work/addTask",
      taskData,
      configData
    );

    dispatch({
      type: NEW_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: error.response,
    });
  }
};

const TaskDeleted = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST });

    const token = localStorage.getItem("token");
    const AuthorizationToken = `Bearer ${token}`;

    const configData = {
      headers: {
        "Content-Type": "application/json",
        Authorization: AuthorizationToken,
      },
    };

    const { data } = await axios.delete(
      `http://localhost:5083/api/work/deleteTask/${id}`,
      configData
    );

    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
      payload: data.deleteTask,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: error.response,
    });
  }
};

const TaskUpdate = (id, taskdata) => async (dispatch) => {
  try {
    dispatch({ type: SINGLE_PRODUCT_UPDATE_REQUEST });

    const token = localStorage.getItem("token");
    const AuthorizationToken = `Bearer ${token}`;

    const configData = {
      headers: {
        "Content-Type": "application/json",
        Authorization: AuthorizationToken,
      },
    };

    const { data } = await axios.put(
      `http://localhost:5083/api/work/updatetask/${id}`,
      taskdata,
      configData
    );

    dispatch({
      type: SINGLE_PRODUCT_UPDATE_SUCCESS,
      payload: data.updateData,
    });
  } catch (error) {
    dispatch({
      type: SINGLE_PRODUCT_UPDATE_FAIL,
      payload: error.response,
    });
  }
};

export { GetAllTaskData, GetSingleTaskData, AdduserNewtask, TaskDeleted, TaskUpdate };

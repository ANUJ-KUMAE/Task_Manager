import {
  PRODUCT_REQUEST,
  PRODUCT_SUCCESS,
  PRODUCT_FAIL,
  CLEAR_ERROR,
  SINGLE_PRODUCT_REQUEST,
  GET_SINGLE_PRODUCT,
  SINGLE_PRODUCT_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  RESET_NEW_PRODUCT,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  RESET_DELETED_PRODUCT,
  SINGLE_PRODUCT_UPDATE_REQUEST,
  SINGLE_PRODUCT_UPDATE_SUCCESS,
  SINGLE_PRODUCT_UPDATE_FAIL,
  RESET_PRODUCT_UPDATE,
} from "../Constants/WorkConstant";

const workInitialState = {
  loading: false,
  AllTasks: [],
  error: null,
};

const SingleTaskState = {
  TaskLoading: false,
  singleTaskdetail: false,
  singletaskData: {},
  error: null,
  updateTaskSuccess: false,
};

const AddNewtaskState = {
  NewtaskLoading: false,
  success: false,
  newtaskData: {},
  error: null,
};

const TaskupdatDeleteState = {
  taskLoading: false,
  error: null,
  deleteProductSuccess: false,
};

const WorkReducers = (state = workInitialState, action) => {
  switch (action.type) {
    case PRODUCT_REQUEST:
      return {
        loading: true,
        AllTasks: [],
        error: null,
      };
    case PRODUCT_SUCCESS:
      return {
        loading: false,
        AllTasks: action.payload.GetAllData,
      };

    case PRODUCT_FAIL:
      return {
        loading: false,
        AllTasks: [],
        error: action.payload,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

const SingleTaskReducers = (state = SingleTaskState, action) => {
  switch (action.type) {
    case SINGLE_PRODUCT_REQUEST:
    case SINGLE_PRODUCT_UPDATE_REQUEST:
      return {
        ...state,
        TaskLoading: true,
        singleTaskdetail: false,
      };

    case GET_SINGLE_PRODUCT:
      return {
        ...state,
        TaskLoading: false,
        singleTaskdetail: true,
        singletaskData: action.payload,
        error: null,
      };

    case SINGLE_PRODUCT_FAIL:
      return {
        ...state,
        TaskLoading: false,
        singleTaskdetail: false,
        singletaskData: {},
        error: action.payload,
      };

    case SINGLE_PRODUCT_UPDATE_SUCCESS:
      return {
        ...state,
        TaskLoading: false,
        singleTaskdetail: true,
        singletaskData: action.payload,
        updateTaskSuccess: true,
        error: null,
      };

    case SINGLE_PRODUCT_UPDATE_FAIL:
      return {
        ...state,
        TaskLoading: false,
        singleTaskdetail: false,
        updateTaskSuccess: false,
        error: action.payload,
      };

    case RESET_PRODUCT_UPDATE:
      return {
        TaskLoading: false,
        singleTaskdetail: false,
        updateTaskSuccess: false,
        error: null,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        TaskLoading: false,
        singleTaskdetail: false,
        singletaskData: {},
        error: null,
      };

    default:
      return state;
  }
};

const AddNewTaskReducer = (state = AddNewtaskState, action) => {
  switch (action.type) {
    case NEW_PRODUCT_REQUEST:
      return {
        ...state,
        NewtaskLoading: true,
        success: false,
      };

    case NEW_PRODUCT_SUCCESS:
      return {
        ...state,
        NewtaskLoading: false,
        success: action.payload.success,
        newtaskData: action.payload.taskAdded,
        error: null,
      };

    case NEW_PRODUCT_FAIL:
      return {
        ...state,
        NewtaskLoading: false,
        newtaskData: {},
        error: action.payload,
      };

    case RESET_NEW_PRODUCT:
      return {
        NewtaskLoading: false,
        newtaskData: {},
        error: null,
      };

    case CLEAR_ERROR:
      return {
        NewtaskLoading: false,
        newtaskData: {},
        error: null,
      };

    default:
      return state;
  }
};

const TaskUpdateDeleteReducer = (state = TaskupdatDeleteState, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return {
        ...state,
        taskLoading: true,
        error: null,
      };

    case PRODUCT_DELETE_SUCCESS:
      return {
        ...state,
        taskLoading: false,
        deleteProductSuccess: true,
      };

    case PRODUCT_DELETE_FAIL:
      return {
        ...state,
        taskLoading: false,
        deleteProductSuccess: false,
        error: action.payload,
      };

    case RESET_DELETED_PRODUCT:
      return {
        taskLoading: true,
        deleteProductSuccess: false,
        error: null,
      };

    default:
      return state;
  }
};

export {
  WorkReducers,
  SingleTaskReducers,
  AddNewTaskReducer,
  TaskUpdateDeleteReducer,
};

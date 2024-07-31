import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import { LoginSignupReducer } from "../Reducer/Auth-Reducer";
import { AddNewTaskReducer, SingleTaskReducers, TaskUpdateDeleteReducer, WorkReducers } from "../Reducer/Work-Reducer";
import { ProductSearch } from "../Reducer/Search-Sort-Reducer";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
    Authentication: LoginSignupReducer,
    AllWorks: WorkReducers,
    singleTask:SingleTaskReducers,
    userAddtask:AddNewTaskReducer,
    usertaskactions:TaskUpdateDeleteReducer,
    searchProduct:ProductSearch,
});

let initialstate = {};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialstate,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;

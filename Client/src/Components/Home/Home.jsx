import React from "react";
import "./Home.css";
import Todo from "../Tasks/Todo";
import InProgress from "../Tasks/InProgress";
import TaskDone from "../Tasks/TaskDone";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SearchAction } from "../../Redux/Actions/Search-Sort-Action";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const AddNewTask = () => {
    navigate("/addNewTask");
  };

  const SearchProduct = (event) => {
    let key = event.target.value;
    dispatch(SearchAction(key));

    if (key.trim() == "") {
      navigate("/home");
    } else {
      navigate("/user/Searchdata");
    }
  };

  return (
    <section>
      <div className="Home-Page-Container">
        <div className="Add-Task-Button">
          <button onClick={AddNewTask}>Add Task</button>
        </div>
        <div className="search-sort-section">
          <div className="search-task">
            <form>
              <label htmlFor="search">Search: </label>
              <input
                type="search"
                placeholder="Search"
                onChange={SearchProduct}
              />
            </form>
          </div>
          <div className="sort-Selection">
            <form action="#" className="sort-form">
              <label htmlFor="sort">Sort:</label>
              <select
                name="sort"
                id="sort"
                className="sort-selection--style"
                // onChange={sorting}
                style={{ cursor: "pointer" }}
              >
                <option value="a-z">Name(a-z)</option>
                <option value="#" disabled></option>
                <option value="z-a">Name(z-a)</option>
              </select>
            </form>
          </div>
        </div>
        <div className="display-all-task">
          <div className="todo-task">
            <div className="task-button">
              <button className="task-doto-done">Todo</button>
              <Todo />
            </div>
          </div>
          <div className="In-Process-Task">
            <div className="task-button">
              <button className="task-doto-done">In Process</button>
              <InProgress />
            </div>
          </div>
          <div className="All-Completed-task">
            <div className="task-button">
              <button className="task-doto-done">Done</button>
              <TaskDone />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;

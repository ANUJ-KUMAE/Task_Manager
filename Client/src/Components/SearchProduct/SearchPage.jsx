import React, { useEffect } from "react";
import "./SearchPage.css";
import { useSelector } from "react-redux";
import { TaskDeleted } from "../../Redux/Actions/Work-Actions";
import { RESET_DELETED_PRODUCT } from "../../Redux/Constants/WorkConstant";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  const { SearchLoading, SearchProduct, error, SearchSuccess } = useSelector(
    (state) => state.searchProduct
  );

  const { taskLoading, deleteProductSuccess } = useSelector(
    (state) => state.usertaskactions
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (deleteProductSuccess) {
      toast.success("Task Deleted");
      navigate("/home");

      dispatch({
        type: RESET_DELETED_PRODUCT,
      });
    }
  }, [deleteProductSuccess, navigate]);

  const AddNewTask = () => {
    navigate("/addNewTask");
  };

  const ViewDetails = (id) => {
    navigate(`/singleTaskdata/` + id);
  };

  const DeleteUserTask = (id) => {
    dispatch(TaskDeleted(id));
  };

  const UpdateSingleTask = (id) => {
    navigate(`/updateusertask/` + id);
  };

  const SearchProducts = (event) => {
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
        <div className="search-task">
          <form>
            <label htmlFor="search">Search: </label>
            <input
              type="search"
              placeholder="Search"
              onChange={SearchProducts}
            />
          </form>
        </div>
        <div className="display-all-search-task">
          <div className="search-todo-progress-task">
            <div className="Search-task-button">
              {SearchProduct &&
                SearchProduct.map((curElement) => {
                  const { _id, workName, description, progress, createdAt } =
                    curElement;
                  return (
                    <div key={_id} className="AllWork-lists-data-grid">
                      <div className="Task-Name-and-Description">
                        <h3>{workName}</h3>
                        <p>{description}</p>
                      </div>
                      <div className="Task-CreatedAt">
                        <p>CreatedAt: {createdAt}</p>
                      </div>
                      <div className="Apply-Operations">
                        <button
                          className="Delete"
                          style={{ backgroundColor: "red" }}
                          onClick={() => DeleteUserTask(_id)}
                        >
                          Delete
                        </button>
                        <button
                          className="Edit"
                          style={{ backgroundColor: "lightblue" }}
                          onClick={() => UpdateSingleTask(_id)}
                        >
                          Edit
                        </button>
                        <button
                          className="View-Details"
                          style={{ backgroundColor: "blue" }}
                          onClick={() => ViewDetails(_id)}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchPage;

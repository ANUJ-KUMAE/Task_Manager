import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllTaskData } from "../../Redux/Actions/Work-Actions";
import { useNavigate } from "react-router-dom";
import { TaskDeleted } from "../../Redux/Actions/Work-Actions";
import { RESET_DELETED_PRODUCT } from "../../Redux/Constants/WorkConstant";
import { toast } from "react-toastify";

const InProgress = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, AllTasks, error } = useSelector((state) => state.AllWorks);

  const { taskLoading, deleteProductSuccess } = useSelector(
    (state) => state.usertaskactions
  );

  useEffect(() => {
    dispatch(GetAllTaskData());
  }, [dispatch]);

  useEffect(() => {
    if (deleteProductSuccess) {
      toast.success("Task Deleted");
      navigate("/home");

      dispatch({
        type: RESET_DELETED_PRODUCT,
      });
    }
  }, [deleteProductSuccess, navigate]);

  const ViewDetails = (id) => {
    navigate(`/singleTaskdata/` + id);
  };

  const DeleteUserTask = (id) => {
    dispatch(TaskDeleted(id));
  };

  const UpdateSingleTask = (id) => {
    navigate(`/updateusertask/` + id);
  };

  return (
    <div className="todo-lists-data">
      {AllTasks &&
        AllTasks.filter((curElem) => curElem.progress === "InProgress").map(
          (curElement) => {
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
          }
        )}
    </div>
  );
};

export default InProgress;

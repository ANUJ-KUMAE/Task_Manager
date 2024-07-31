import React, { useState, useEffect } from "react";
import "./UpdateTask.css";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RESET_PRODUCT_UPDATE } from "../../Redux/Constants/WorkConstant";
import {
  GetSingleTaskData,
  TaskUpdate,
} from "../../Redux/Actions/Work-Actions";

const Updatetask = () => {
  const { id } = useParams();

  const [workName, setWorkName] = useState("");
  const [description, setDiscription] = useState("");
  const [progress, setProgress] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    TaskLoading,
    singleTaskdetail,
    singletaskData,
    error,
    updateTaskSuccess,
  } = useSelector((state) => state.singleTask);

  const Typedata = ["Todo", "InProgress", "Done"];

  useEffect(() => {
    if (updateTaskSuccess) {
      toast.success("Updated Successfully");

      navigate("/home");

      dispatch({
        type: RESET_PRODUCT_UPDATE,
      });
    }
  }, [dispatch, updateTaskSuccess, navigate]);

  useEffect(() => {
    if (singleTaskdetail) {
      setWorkName(singletaskData.workName || "");
      setDiscription(singletaskData.description || "");
      setProgress(singletaskData.progress || "");
    }
  }, [singleTaskdetail, dispatch, id]);

  useEffect(() => {
    dispatch(GetSingleTaskData(id));
  }, [dispatch, id]);

  const UpdateuserProductDetail = (e) => {
    e.preventDefault();

    const updatetaskData = {
      workName,
      description,
      progress,
    };

    dispatch(TaskUpdate(id, updatetaskData));
  };

  const Addcancel = () => {
    //dispatch({ type: RESET_NEW_PRODUCT });
    navigate("/home");
  };

  return (
    <section>
      <div className="Add-new-Product">
        <div className="Product-Details">
          <div className="title-name-user">
            <h3>Add New Product Details</h3>
          </div>
          <form onSubmit={UpdateuserProductDetail}>
            <div className="Product-inputs">
              <label>Task Name:</label>
              <input
                type="text"
                name="workName"
                value={workName}
                onChange={(e) => setWorkName(e.target.value)}
                required
                autoComplete="off"
                placeholder="Enter New task"
              />
            </div>
            <div className="Product-inputs">
              <label>Description</label>
              <input
                type="text"
                name="description"
                value={description}
                onChange={(e) => setDiscription(e.target.value)}
                required
                autoComplete="off"
                placeholder="Description"
              />
            </div>
            <div className="Product-Description">
              <label htmlFor="Task type">Task Types</label>
              <select
                value={progress}
                onChange={(e) => setProgress(e.target.value)}
              >
                {Typedata.map((progress) => {
                  return (
                    <option key={progress} value={progress}>
                      {progress}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-button">
              <button className="btn">Submit</button>
            </div>
          </form>
          <div className="Close-Page-Button">
            <button
              className="Cancel-Button"
              onClick={Addcancel}
              style={{
                backgroundColor: "lightgreen",
                padding: "0.3rem",
                color: "white",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Updatetask;

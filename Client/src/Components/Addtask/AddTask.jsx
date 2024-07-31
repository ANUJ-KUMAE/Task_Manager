import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AdduserNewtask } from "../../Redux/Actions/Work-Actions";
import { RESET_NEW_PRODUCT } from "../../Redux/Constants/WorkConstant";
import { toast } from "react-toastify";
import "./Addtask.css"

const AddTask = () => {
  const [workName, setWorkName] = useState("");
  const [description, setDiscription] = useState("");
  const [progress, setProgress] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { NewtaskLoading, success, newtaskData, error } = useSelector(
    (state) => state.userAddtask
  );

  useEffect(() => {
    if (error) {
      toast.error(
        error.data.extraDetails ? error.data.message : error.data.extraDetails
      );
    }

    if (success) {
      toast.success("Task Successfully Added");
      navigate("/home");
      dispatch({ type: RESET_NEW_PRODUCT });
    }
  }, [dispatch, toast, error, success]);

  const Typedata = ["Todo", "InProgress", "Done"];

  const AddNewProductDetails = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("workName", workName);
    formData.set("description", description);
    formData.set("progress", progress);

    dispatch(AdduserNewtask(formData));
  };

  const Addcancel = () => {
     dispatch({type:RESET_NEW_PRODUCT});
     navigate("/home")
  }

  return (
    <section>
      <div className="Add-new-Product">
        <div className="Product-Details">
          <div className="title-name-user">
            <h3>Add New Product Details</h3>
          </div>
          <form onSubmit={AddNewProductDetails}>
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
            <button className="Cancel-Button" onClick={Addcancel} style={{backgroundColor:"lightgreen", padding:"0.3rem", color:"white", cursor:"pointer"}}>Cancel</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddTask;

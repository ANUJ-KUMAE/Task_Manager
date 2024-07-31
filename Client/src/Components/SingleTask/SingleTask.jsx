import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { GetSingleTaskData } from "../../Redux/Actions/Work-Actions";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import "./SingleTak.css"

const SingleTask = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { TaskLoading, singletaskData, error } = useSelector(
    (state) => state.singleTask
  );

  useEffect(() => {
    dispatch(GetSingleTaskData(id));
  }, [dispatch, id]);

  const ClosePage = () => {
    navigate("/home");
  };

  const {
    id: alias,
    workName,
    description,
    progress,
    createdAt,
  } = singletaskData;

  if (TaskLoading) {
    return (
      <div className="page_Loading">
        <AiOutlineLoading3Quarters className="page_loading_icon" />
        <div className="page_Loading_name">Page Loading..... </div>
      </div>
    );
  }

  return (
    <section>
     <div className="Single-Page-Section">
      <div className="Single-Page-Container">
        <div className="Single-task-data">
          <h2>Task Details</h2>
          <div className="task-details-lists">
            <h3>Title: {workName}</h3>
            <div className="Task-Description-and-Detail">
              <p>Description: {description}</p>
              <p>CreatedAt: {createdAt}</p>
            </div>
          </div>
        </div>
        <div className="Single-Page-Button">
          <button className="Close-Button" onClick={ClosePage}>
            Close
          </button>
        </div>
      </div>
      </div>
    </section>
  );
};

export default SingleTask;

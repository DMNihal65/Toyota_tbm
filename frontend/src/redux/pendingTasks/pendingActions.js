import {
  PENDING_TASK_FETCH_REQUEST,
  PENDING_TASK_FETCH_SUCCESS,
  PENDING_TASK_FETCH_FAIL,
} from "./pendingTypes";
import axios from "axios";

export const pendingTaskFetchRequest = () => {
  return {
    type: PENDING_TASK_FETCH_REQUEST,
  };
};

export const pendingTaskFetchSuccess = (tasks) => {
  return {
    type: PENDING_TASK_FETCH_SUCCESS,
    payload: tasks,
  };
};

export const pendingTaskFetchFail = (error) => {
  return {
     type: PENDING_TASK_FETCH_FAIL,
    error: error,
  };
};

export const getPendingTasks = (queryStr) => {
  console.log(queryStr)
  return (dispatch) => {
    dispatch(pendingTaskFetchRequest());
    let url = `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/pendingTasks?${queryStr}`;
    axios
      .get(url)
      .then((result) => {
    
        dispatch(pendingTaskFetchSuccess(result.data));
      })
      .catch((err) => {
        dispatch(pendingTaskFetchFail(err.message));
      });
  };
};

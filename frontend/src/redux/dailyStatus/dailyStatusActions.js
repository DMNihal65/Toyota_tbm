import axios from "axios";
import {
  DAILYSTATUS_FETCH_REQUEST,
  DAILYSTATUS_FETCH_SUCCESS,
  DAILYSTATUS_FETCH_FAIL,
} from "./dailyStatusTypes";

export const dailyStatusFetchRequest = () => {
  return {
    type: DAILYSTATUS_FETCH_REQUEST,
  };
};

export const dailyStatusFetchSuccess = (dailyStatus) => {
  return {
    type: DAILYSTATUS_FETCH_SUCCESS,
    payload: dailyStatus,
  };
};

export const dailyStatusFetchFail = (error) => {
  return {
    type: DAILYSTATUS_FETCH_FAIL,
    error: error,
  };
};

export const getDailyStatus = (queryStr) => {
  return (dispatch) => {
    console.log("qw",queryStr);
    dispatch(dailyStatusFetchRequest());
    axios
      .get(
        `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/dailyStatus?${queryStr}`
      )
      .then((result) => {
        dispatch(dailyStatusFetchSuccess(result.data));
      })
      .catch((error) => {
        dispatch(dailyStatusFetchFail(error.message));
      });
  };
};

import axios from "axios";
import {
  ABNORMALITY_FETCH_REQUEST,
  ABNORMALITY_FETCH_SUCCESS,
  ABNORMALITY_FETCH_FAIL,
} from "./abnormalityTypes";

export const abnormalityFetchRequest = () => {
  return {
    type: ABNORMALITY_FETCH_REQUEST,
  };
};

export const abnormalityFetchSuccess = (abnormalityList) => {
  return {
    type: ABNORMALITY_FETCH_SUCCESS,
    payload: abnormalityList,
  };
};
export const abnormalityFetchFail = (error) => {
  return {
    type: ABNORMALITY_FETCH_FAIL,
    error: error,
  };
};

export const getAbnormality = (fromDateSt, toDateSt, queryStr) => {
  return (dispatch) => {
    dispatch(abnormalityFetchRequest());
    axios
      .get(
        `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/abnormality/find/fromDate/${fromDateSt}/toDate/${toDateSt}?${queryStr}`
      )
      .then((result) => {
        console.log("results ab", result.data);
        dispatch(abnormalityFetchSuccess(result.data));
      })
      .catch((error) => {
        dispatch(abnormalityFetchFail(error.message));
        console.log("triggered getAbnormality & Error", error.message);
      });
  };
};

import {
  MACHINE_FETCH_REQUEST,
  MACHINE_FETCH_SUCCESS,
  MACHINE_FETCH_FAIL,
} from "./machineTypes";
import axios from "axios";

export const machineFetchRequest = () => {
  return {
    type: MACHINE_FETCH_REQUEST,
  };
};

export const machineFetchSuccess = (machines) => {
  return {
    type: MACHINE_FETCH_SUCCESS,
    payload: machines,
  };
};

export const machineFetchFail = (error) => {
  return {
    type: MACHINE_FETCH_FAIL,
    error: error,
  };
};

export const getMachines = (queryStr) => {
  return (dispatch) => {
    dispatch(machineFetchRequest());
    let url = `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/head/headMachineList?${queryStr}`;
    axios
      .get(url)
      .then((result) => {
        dispatch(machineFetchSuccess(result.data));
      })
      .catch((err) => {
        dispatch(machineFetchFail(err.message));
      });
  };
};

export const getAllMachines = (queryStr) => {
  return (dispatch) => {
    dispatch(machineFetchRequest());
    let url = `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/head/allMachineList?${queryStr}`;
    axios
      .get(url)
      .then((result) => {
        dispatch(machineFetchSuccess(result.data));
      })
      .catch((err) => {
        dispatch(machineFetchFail(err.message));
      });
  };
};

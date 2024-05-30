import {
  MACHINE_FETCH_REQUEST,
  MACHINE_FETCH_SUCCESS,
  MACHINE_FETCH_FAIL,
} from "./machineTypes";

const initialMachineState = {
  loading: false,
  machineData: {},
  error: "",
};

const machineReducer = (state = initialMachineState, action) => {
  switch (action.type) {
    case MACHINE_FETCH_REQUEST:
      return {
        loading: true,
        machineData: {},
        error: "",
      };
    case MACHINE_FETCH_SUCCESS:
      return {
        loading: false,
        machineData: action.payload,
        error: "",
      };
    case MACHINE_FETCH_FAIL:
      return {
        loading: false,
        machineData: {},
        error: action.error,
      };

    default:
      return state;
  }
};

export default machineReducer;

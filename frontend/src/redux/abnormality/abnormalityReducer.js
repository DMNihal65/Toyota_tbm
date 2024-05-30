import {
  ABNORMALITY_FETCH_REQUEST,
  ABNORMALITY_FETCH_SUCCESS,
  ABNORMALITY_FETCH_FAIL,
} from "./abnormalityTypes";

const inititalAbnormalityState = {
  loading: false,
  abnormalities: {},
  error: "",
};

const abnormalityReducer = (state = inititalAbnormalityState, action) => {
  switch (action.type) {
    case ABNORMALITY_FETCH_REQUEST:
      return {
        loading: true,
        abnormalities: {},
        error: "",
      };
    case ABNORMALITY_FETCH_SUCCESS:
      return {
        loading: false,
        abnormalities: action.payload,
        error: "",
      };
    case ABNORMALITY_FETCH_FAIL:
      return {
        loading: false,
        abnormalities: {},
        error: action.error,
      };
    default:
      return state;
  }
};

export default abnormalityReducer;

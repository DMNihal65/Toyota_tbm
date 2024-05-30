import {
  DAILYSTATUS_FETCH_REQUEST,
  DAILYSTATUS_FETCH_SUCCESS,
  DAILYSTATUS_FETCH_FAIL,
} from "./dailyStatusTypes";

const initilaDailyStatusState = {
  loading: false,
  dailyStatus: {},
  error: "",
};

const dailyStatusReducer = (state = initilaDailyStatusState, action) => {
  switch (action.type) {
    case DAILYSTATUS_FETCH_REQUEST:
      return {
        loading: true,
        dailyStatus: {},
        error: "",
      };
    case DAILYSTATUS_FETCH_SUCCESS:
      return {
        loading: false,
        dailyStatus: action.payload,
        error: "",
      };
    case DAILYSTATUS_FETCH_FAIL:
      return {
        loading: false,
        dailyStatus: {},
        error: action.error,
      };
    default:
      return state;
  }
};




export default dailyStatusReducer;




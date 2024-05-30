import {
  FILTER_CHECK,
  FILTER_DATE,
  FILTER_DEPT,
  FILTER_LINE,
  FILTER_GROUP
} from "./filterTypes";
const todayDate = new Date(Date.now());
const dt = todayDate.getDate();
const d = todayDate.getDay();
const m = todayDate.getMonth() + 1;
const y = todayDate.getFullYear();
const w = Math.floor(dt / 7.1) + 1;
const pS = "S";
const line = null;
const rS = null;
const group = null;
const initialFilterState = {
  d,
  m,
  y,
  w,
  pS,
  dt,
  line,
  rS, 
  group
};

const filterReducer = (state = initialFilterState, action) => {
  switch (action.type) {
    case FILTER_DATE:
      return {
        ...state,
        ...action.payload,
      };
    case FILTER_DEPT:
      return {
        ...state,
        pS: action.payload,
      };
    case FILTER_LINE:
      return {
        ...state,
        line: action.payload,
      };
    case FILTER_CHECK:
      return {
        ...state,
        rS: action.payload,
      };
      case FILTER_GROUP:
        return {
          ...state,
          group: action.payload,
        };
    default:
      return state;
  }
};

export default filterReducer;

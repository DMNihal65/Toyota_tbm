import { combineReducers } from "redux"; 
import machineReducer from "./redux/machine/machineReducer";
import checkItemReducer from "./redux/checkItem/checkItemsReducer";
import filterReducer from "./redux/filter/filterReducer"; 
import dailyStatusReducer from "./redux/dailyStatus/dailyStatusReducer";
import abnormalityReducer from "./redux/abnormality/abnormalityReducer";
import cardReducer from "./redux/card/cardReducer";
import pendingTaskReducer from "./redux/pendingTasks/pendingReducer";
import navBarReducer from "./redux/navbarSlice"
import processDataReducer from "./redux/processData/processReducer";
import authReducer from "./redux/auth/AuthSlice";
import checkedByReducer from "./redux/checkedBy";

const rootReducer = combineReducers({ 
  machines: machineReducer,
  checkItems: checkItemReducer,
  filters: filterReducer, 
  dailyStatuses: dailyStatusReducer,
  abnormalities: abnormalityReducer,
  cards: cardReducer,
  pendingTasks: pendingTaskReducer,
  navBar : navBarReducer,
  processData : processDataReducer,
  auth : authReducer,
  checkedBy: checkedByReducer
});

export default rootReducer;

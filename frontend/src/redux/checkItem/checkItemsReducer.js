import {
  CHECKITEM_FETCH_REQUEST,
  CHECKITEM_FETCH_SUCCESS,
  CHECKITEM_FETCH_FAIL,
} from "./checkItemsTypes";

const initialCheckItemState = {
  loading: false,
  checkItem: {},
  error: "",
};

const checkItemReducer = (state = initialCheckItemState, action) => {
  switch (action.type) {
    case CHECKITEM_FETCH_REQUEST:
      return {
        loading: true,
        checkItem: {},
        error: "",
      };
    case CHECKITEM_FETCH_SUCCESS:
      return {
        loading: false,
        checkItem: action.payload,
        error: "",
      };
    case CHECKITEM_FETCH_FAIL:
      return {
        loading: false,
        checkItem: {},
        error: action.error,
      };
    default:
      return state;
  }
};

export default checkItemReducer;

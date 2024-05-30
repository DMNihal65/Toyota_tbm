import {
  CARD_FETCH_REQUEST,
  CARD_FETCH_SUCCESS,
  CARD_FETCH_FAIL,
} from "./cardTypes";

const initialCardState = {
  loading: false,
  cards: {},
  error: "",
};

const cardReducer = (state = initialCardState, action) => {
  switch (action.type) {
    case CARD_FETCH_REQUEST:
      return {
        loading: true,
        cards: {},
        error: "",
      };
    case CARD_FETCH_SUCCESS:
      return {
        loading: false,
        cards: action.payload,
        error: "",
      };
    case CARD_FETCH_FAIL:
      return {
        loading: false,
        cards: {},
        error: action.error,
      };
    default:
      return state;
  }
};

export default cardReducer;

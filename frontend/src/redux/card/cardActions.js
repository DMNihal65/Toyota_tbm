import axios from "axios";
import {
  CARD_FETCH_REQUEST,
  CARD_FETCH_SUCCESS,
  CARD_FETCH_FAIL,
} from "./cardTypes";

export const cardFetchRequest = () => {
  return {
    type: CARD_FETCH_REQUEST,
  };
};

export const cardFetchSuccess = (cards) => {
  return {
    type: CARD_FETCH_SUCCESS,
    payload: cards,
  };
};

export const cardFetchFail = (error) => {
  return {
    type: CARD_FETCH_FAIL,
    error: error,
  };
};

export const getCards = (fromDateSt, toDateSt, queryStr) => {
  return (dispatch) => {
    dispatch(cardFetchRequest());
    axios
      .get(
        `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/card/find/fromDate/${fromDateSt}/toDate/${toDateSt}?${queryStr}`
      )
      .then((result) => {
        dispatch(cardFetchSuccess(result.data));
      })
      .catch((error) => {
        dispatch(cardFetchFail(error.message));
      });
  };
};

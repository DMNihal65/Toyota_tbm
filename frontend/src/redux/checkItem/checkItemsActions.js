import axios from "axios";
import {
  CHECKITEM_FETCH_REQUEST,
  CHECKITEM_FETCH_SUCCESS,
  CHECKITEM_FETCH_FAIL,
} from "./checkItemsTypes";

export const checkItemFetchRequest = () => {
  return {
    type: CHECKITEM_FETCH_REQUEST,
  };
};

export const checkItemFetchSuccess = (checkItem) => {
  return {
    type: CHECKITEM_FETCH_SUCCESS,
    payload: checkItem,
  };
};

export const checkItemFetchFail = (error) => {
  return {
    type: CHECKITEM_FETCH_FAIL,
    error: error,
  };
};

export const getCheckItem = (queryStr, page, entryForQueryStr) => {
  return (dispatch) => {
    dispatch(checkItemFetchRequest());
    let url = `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/head/headCheckList?${queryStr}&page=${page}`;
    axios
      .get(url)
      .then((result) => {
        // getting additional data & added to first result
        axios
          .get(
            `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/dailyStatus/find/${result.data.headCheckList[0]._id}/entryFor/${entryForQueryStr}`
          )
          .then((result2) => {
            result.data.headCheckList[0].dailyStatus =
              result2.data.dailyStatus.result;
              result.data.headCheckList[0].judgementRemarks=
              result2.data.dailyStatus.remarks;
            result.data.headCheckList[0].value = result2.data.dailyStatus.value;
            result.data.headCheckList[0].checkedBy = result2.data.dailyStatus.checkedBy;
            dispatch(checkItemFetchSuccess(result.data));
          })
          .catch((err) => {
            console.log(err.message);
          });
      })
      .catch((err) => {
        dispatch(checkItemFetchFail(err.message));
      });
  };
};

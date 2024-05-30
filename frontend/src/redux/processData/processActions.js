import { SET_PROCESS_DATA } from "./processTypes"

export const setProcessData = (data) => {
    return {
      type: SET_PROCESS_DATA,
      payload: data
    }
  }
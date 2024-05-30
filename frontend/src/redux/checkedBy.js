const initialState = "";

export const setCheckedBy = (payload) => {
  return {
    type: "setCheckedBy",
    payload: payload,
  };
};

const checkedByReducer = (state = initialState, action) => {
  switch (action.type) {
    case "setCheckedBy":
      return (state = action.payload);
    default:
      return state;
  }
};

export default checkedByReducer;

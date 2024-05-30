const initialState = {
    processData: [],
  };
  
  const processDataReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_PROCESS_DATA':
        return {
          ...state,
          processData: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default processDataReducer;
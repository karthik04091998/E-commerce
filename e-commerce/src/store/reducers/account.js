

const initialState = {
    userInfo: null,
    authenticated: false,
    apiToken: null,
  };
  
  const accountReducer = (state = initialState, action) => {
    switch (action.type) {
      case "account_authenticate":
        return {
          ...state,
          authenticated: true,
          userInfo: action.userInfo,
        };
      case "account_logout":
        return {
          ...state,
          authenticated: false,
          userInfo: null,
        };
      default:
        return state;
    }
  };
  
  export default accountReducer;
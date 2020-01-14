const users = (state = { isLoading: false, error: '', data: [] }, action) => {
  switch (action.type) {
    case 'REQUEST_USERS_START':
      return {
        ...state,
        isLoading: true
      };
    case 'REQUEST_USERS_SUCCESS':
      console.log(action);
      return {
        ...state,
        isLoading: false,
        data: action.users
      };
    // case 'REQUEST_CREATE_SUCCESS':
    //   console.log(action);
    //   return {
    //     ...state,
    //     isLoading: false,
    //     data: [
    //       ...state.data, 
    //       { ...action.user}
    //     ]
    //   };
    // case 'REQUEST_UPDATE_SUCCESS':
    //   console.log(action);
    //   const index = state.data.findIndex(user => user._id === action.userId);
    //   return {
    //     ...state,
    //     isLoading: false,
    //     data: Object.assign([],state.data, {index: action.user})
    //   };
    // case 'REQUEST_DELETE_SUCCESS':
    //   console.log(action);
    //   const index1 = state.data.findIndex(user => user._id === action.userId);
    //   return {
    //     ...state,
    //     isLoading: false,
    //     data: [
    //       ...state.data.splice(0,index1), 
    //       ...state.data.splice(index1+1)
    //     ]
    //   };
    
    case 'REQUEST_USERS_FAIL':
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default users;

import {
    GET_DATA_FROM_SERVER,
  } from "../Constants";
  //102
  function reducer(state, action) {
    let newState;
    switch (action.type) {
      case GET_DATA_FROM_SERVER:
        newState = action.payload;
        break;
      default:
    }
  
    return newState; //paimam state sena ir po to ji paverciam i nauja newState
  }
  
  export default reducer;
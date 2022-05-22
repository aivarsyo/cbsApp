import {
    SET_USER_PHOTOS
  } from "../actions/photosActions";
  
  const initialState = {
    photos: {}
  };
  
  function photosReducer(state = initialState, action) {
    switch (action.type) {
      case SET_USER_PHOTOS:
        return {
          ...state,
          photos: action.payload
        };
      default:
        return state;
    }
  }
  
  export default photosReducer;
  
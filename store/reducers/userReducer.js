import {
  RESTORE_USER,
  SIGNUP_USER,
  RESET_USER,
  SET_USER_PHOTO,
  SET_USER_NAME,
} from "../actions/userActions";

const initialState = {
  name: undefined,
  email: undefined,
  id: undefined,
  photo: undefined,
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case RESTORE_USER:
      return {
        ...state,
        email: action.payload.user.email,
        name: action.payload.user.name,
        id: action.payload.userID,
        photo: action.payload.userPhoto,
      };
    case SIGNUP_USER:
      return {
        ...state,
        email: action.payload.userEmail,
        name: action.payload.userName,
        id: action.payload.userID,
      };
    case RESET_USER:
      return initialState;
    case SET_USER_PHOTO:
      return { ...state, photo: action.payload };
    case SET_USER_NAME:
      return { ...state, name: action.payload };
    default:
      return state;
  }
}

export default userReducer;

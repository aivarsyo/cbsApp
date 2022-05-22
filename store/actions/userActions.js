export const RESTORE_USER = 'RESTORE_USER';
export const SIGNUP_USER = 'SIGNUP_USER';
export const RESET_USER = 'RESET_USER';
export const SET_USER_PHOTO = 'SET_USER_PHOTO';
export const SET_USER_NAME = 'SET_USER_NAME';
export const SET_CHAT_ID = 'SET_CHAT_ID';

export const RestoreUser = (user, userID, userPhoto) => dispatch => {
    dispatch( { type: RESTORE_USER, payload: {user, userID, userPhoto }})
}

export const SignupUser = (userName, userEmail, userID) => dispatch => {
    dispatch( { type: SIGNUP_USER, payload: {userName, userEmail, userID}})
}

export const ResetUser = () => dispatch => {
    dispatch( { type: RESET_USER})
}

export const SetUserPhoto = (photo) => dispatch => {
    dispatch( { type: SET_USER_PHOTO, payload: photo})
}

export const SetUserName = (name) => dispatch => {
    dispatch( { type: SET_USER_NAME, payload: name})
}

export const SetChatID = (chatID) => dispatch => {
    dispatch( { type: SET_CHAT_ID, payload: chatID})
}
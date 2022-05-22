export const SET_USER_PHOTOS = 'SET_USER_PHOTOS';

export const SetUserPhotos = (userPhotos) => dispatch => {
    dispatch( { type: SET_USER_PHOTOS, payload: userPhotos})
}
import axios from '../../node_modules/axios';
const API_URL = 'http://localhost:8080/api/users/';

function requestStart() {
  return {
    type: 'REQUEST_CURRENTUSER_START'
  };
}
function requestSuccess(currentUser) {
  return {
    type: 'REQUEST_CURRENTUSER_SUCCESS',
    currentUser
  };
}
function requestFail(error) {
  return {
    type: 'REQUEST_CURRENTUSER_FAIL',
    error
  };
}
export function getCurrentUser(userId) {
  return (dispatch, getState) => {
    dispatch(requestStart());
    axios({ method: 'get', url: 'http://localhost:8080/api/users/' + userId})
      // .get(API_URL + userId)
      .then(response => {
        console.log(response);
        dispatch(requestSuccess(response.data));
      })
      .catch(err => {
        dispatch(requestFail(err.response.statusText));
      });
  };
}

import axios from '../../node_modules/axios';
const API_URL = 'http://localhost:8080/api/users';

function requestStart() {
  return {
    type: 'REQUEST_USERS_START'
  };
}
function requestSuccess(users) {
  return {
    type: 'REQUEST_USERS_SUCCESS',
    users
  };
}
function requestCreate(user) {
  return {
    type: 'REQUEST_CREATE_SUCCESS',
    user
  }
}
function requestUpdate(userId, user) {
  return {
    type: 'REQUEST_UPDATE_SUCCESS',
    userId,
    user
  }
}
function requestDelete(userId) {
  return {
    type: 'REQUEST_CREATE_SUCCESS',
    userId
  }
}
function requestFail(error) {
  return {
    type: 'REQUEST_USERS_FAIL',
    error
  };
}
export function getUsers() {
  return (dispatch, getState) => {
    dispatch(requestStart());
    axios
      .get(API_URL)
      .then(response => {
        dispatch(requestSuccess(response.data));
      })
      .catch(err => {
        if(!err.status) {
          dispatch(requestFail('Server Down'))
        } else {
          dispatch(requestFail(err.response.statusText));
        }
      });
  };
}

export function createUser(user,history) {
  return (dispatch, getState) => {
    dispatch(requestStart());
    axios
      .post(API_URL, user)
      .then(response => {
        if(response.request.status === 200) {
              history.push('/');
            };
      })
      .catch(err => {
        dispatch(requestFail(err.response.statusText));
      });
  };
}

export function updateUser(userId, user, history) {
  return (dispatch, getState) => {
    dispatch(requestStart());
    axios
      .put('http://localhost:8080/api/users/' + userId, user)
      .then(response => {
        // dispatch(requestUpdate(userId, response.data));
        if(response.request.status === 200) {
              history.push('/');
            }
      })
      .catch(err => {
        dispatch(requestFail(err.response.statusText));
      })
  };
}

export function deleteUser(userId) {
  return (dispatch, getState) => {
    dispatch(requestStart());
    axios
      .delete('http://localhost:8080/api/users/' + userId)
      .then(response => {
        dispatch(getUsers());
      })
      .catch(err => {
        dispatch(requestFail(err.response.statusText));
      });
  };
}
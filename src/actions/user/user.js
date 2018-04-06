import fetch from 'isomorphic-fetch';

export const SET_USER_INFO = 'SET_USER_INFO';
export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';
export const USER_LOGOUT_REQUEST = 'USER_LOGOUT_REQUEST';
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';
export const USER_LOGOUT_FAILURE = 'USER_LOGOUT_FAILURE';
export const CLEAR_USER_INFO = 'CLEAR_USER_INFO';

export const clearUser = () => ({
  type: CLEAR_USER_INFO,
});

export const setUserInfo = userInfo => ({
  type: SET_USER_INFO,
  userInfo,
});

export const userLoginRequest = () => ({
  type: USER_LOGIN_REQUEST,
  timestamp: Date.now(),
  callInProgress: true,
});

export const userLoginSuccess = userInfo => ({
  type: USER_LOGIN_SUCCESS,
  timestamp: Date.now(),
  callInProgress: false,
  userInfo,
});

export const userLoginFailure = errorMessage => ({
  type: USER_LOGIN_FAILURE,
  timestamp: Date.now(),
  callInProgress: false,
  errorMessage,
});

export const userLogoutRequest = () => ({
  type: USER_LOGOUT_REQUEST,
  callInProgress: true,
  timestamp: Date.now(),
});

export const userLogoutSuccess = () => ({
  type: USER_LOGOUT_SUCCESS,
  callInProgress: false,
  timestamp: Date.now(),
});

export const userLogoutFailure = errorMessage => ({
  type: USER_LOGOUT_FAILURE,
  callInProgress: false,
  timestamp: Date.now(),
  errorMessage,
});

export const loginUser = creds => (dispatch => {
  dispatch(userLoginRequest());
  return fetch('http://localhost:3001/users/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
      'Content-Type': 'application/json; charset=utf-8'
      },
    body: JSON.stringify(creds),
  })
    .then(res => res.json())
    .then(({ status, errorMessage }) => {
      if(status === 200) dispatch(userLoginSuccess(creds))
      if(status === 400) dispatch(userLoginFailure(errorMessage))
    })
});

export const logoutUser = () => (dispatch => {
  dispatch(userLogoutRequest());
  // return http.post(LOGOUT_PATH, {})
  //   .then(response => {
  //     if (response.success) {
        dispatch(
          userLogoutSuccess()
        );
    //   } else {
    //     dispatch(
    //       userLogoutFailure(response)
    //     );
    //   }
    // });
});

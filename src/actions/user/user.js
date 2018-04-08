import fetch from 'isomorphic-fetch';
import { HOST, headers, parseBody } from '../../config/fetchConfig';

export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';
export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_REGISTRATION_REQUEST = 'USER_REGISTRATION_REQUEST';
export const USER_REGISTRATION_SUCCESS = 'USER_REGISTRATION_SUCCESS';
export const USER_REGISTRATION_FAILURE = 'USER_REGISTRATION_FAILURE';

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

export const userLogout = () => ({
  type: USER_LOGOUT,
  callInProgress: false,
  timestamp: Date.now(),
});

export const userRegistrationRequest = creds => ({
  type: USER_REGISTRATION_REQUEST,
  timestamp: Date.now(),
  callInProgress: true,
});

export const userRegistrationSuccess = userInfo => ({
  type: USER_REGISTRATION_SUCCESS,
  timestamp: Date.now(),
  callInProgress: false,
  userInfo,
});

export const userRegistrationFailure = registrationMessage => ({
  type: USER_REGISTRATION_FAILURE,
  timestamp: Date.now(),
  callInProgress: false,
  registrationMessage,
});


export const loginUser = creds => (dispatch => {
  dispatch(userLoginRequest());
  return fetch(`${HOST}users/login`, {
    method: 'POST',
    headers,
    body: parseBody(creds),
  })
    .then(res => res.json())
    .then(({ status, id, role, orders, errorMessage }) => {
      if(status === 200) dispatch(userLoginSuccess({ ...creds, id, role, orders }))
      if(status === 400) dispatch(userLoginFailure(errorMessage))
    })
});

export const logoutUser = () => (dispatch => {
  dispatch(userLogout());
});


export const registerUser = creds => (dispatch => {
  dispatch(userRegistrationRequest());
  return fetch(`${HOST}users/registration`, {
    method: 'POST',
    headers,
    body: parseBody(creds),
  })
    .then(res => res.json())
    .then(({ status, id, role, registrationMessage }) => {
      if(status === 200) dispatch(userRegistrationSuccess({ ...creds, id, role }))
      if(status === 400) dispatch(userRegistrationFailure(registrationMessage))
    })
});
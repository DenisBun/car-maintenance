import {
  SET_USER_INFO,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAILURE,
  CLEAR_USER_INFO
} from '../../actions';

const initialState = {
  isAuthenticated: false,
  isAuthentication: false,
  userInfo: null,
  errorMessage: '',
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_INFO:
      return {
        ...state,
        userInfo: action.userInfo,
        isAuthenticated: true,
      };
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        logInCallStarted: action.timestamp,
        isAuthentication: true,
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        userInfo: action.userInfo,
        userLoggedInAt: action.timestamp,
        isAuthenticated: true,
        isAuthentication: false,
        messageText: action.message,
      };
    case USER_LOGIN_FAILURE:
      return {
        ...state,
        userInfo: null,
        loginErrorAt: action.timestamp,
        isAuthentication: false,
        errorMessage: action.errorMessage,
        errorCode: action.errorCode,
      };

    case USER_LOGOUT_REQUEST:
      return {
        ...state,
        logOutCallStarted: action.timestamp,
        isFetching: true,
      };
    case USER_LOGOUT_SUCCESS:
      return {
        ...state,
        userLoggedOutAt: action.timestamp,
        userInfo: null,
        isAuthenticated: false,
        isFetching: false,
        messageText: '',
      };
    case USER_LOGOUT_FAILURE:
      return {
        ...state,
        logoutErrorAt: action.timestamp,
        isFetching: false,
        messageText: action.errorMessage,
        errorCode: action.errorCode,
      };
    case CLEAR_USER_INFO:
      return {
        ...state,
        isAuthenticated: false,
        userInfo: null,
        messageText: '',
      };    
    default:
      return state;
  }
};

export default user;

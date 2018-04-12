import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGOUT,
  USER_REGISTRATION_REQUEST,
  USER_REGISTRATION_SUCCESS,
  USER_REGISTRATION_FAILURE,
  ADD_USER_ORDERS,
} from '../../actions';

const initialState = {
  isAuthenticated: false,
  isAuthentication: false,
  userInfo: null,
  errorMessage: '',
  registrationMessage: '',
};

const user = (state = initialState, action) => {
  switch (action.type) {
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
        errorMessage: '',
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
    case USER_LOGOUT:
      return {
        ...state,
        userLoggedOutAt: action.timestamp,
        userInfo: null,
        isAuthenticated: false,
        isFetching: false,
        messageText: '',
      };
    case USER_REGISTRATION_REQUEST:
      return {
        ...state,
        logInCallStarted: action.timestamp,
        isAuthentication: true,
      }; 
    case USER_REGISTRATION_SUCCESS:
      return {
        ...state,
        userInfo: action.userInfo,
        userLoggedInAt: action.timestamp,
        isAuthenticated: true,
        isAuthentication: false,
        registrationMessage: '',
      };
    case USER_REGISTRATION_FAILURE:
      return {
        ...state,
        userInfo: null,
        loginErrorAt: action.timestamp,
        isAuthentication: false,
        registrationMessage: action.registrationMessage,
      };
    case ADD_USER_ORDERS:
      return {
        ...state,
        userInfo: { ...state.userInfo, orders: action.userOrders },
      };  
      
    default:
      return state;
  }
};

export default user;

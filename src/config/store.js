import reduxLogger from 'redux-logger';
import reduxThunk from 'redux-thunk';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { autoRehydrate } from 'redux-persist';
import user from '../reducers/user/user';
import buyCar from '../reducers/buyCar/buyCar';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = (preloadedState = {}) => {
  return createStore(
    combineReducers({
      user,
      buyCar,
    }),
    preloadedState,
    composeEnhancers(applyMiddleware(reduxThunk, reduxLogger), autoRehydrate()),
  );
};

export const store = configureStore();

// const store = createStore(app, composeEnhancers(
//   applyMiddleware(...middlewares),
//   autoRehydrate()
// ));

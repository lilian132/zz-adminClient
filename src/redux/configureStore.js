/* eslint-disable */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import reducer from './reducer';

export default function (preloadedState) {
  const middlewares = [thunk];  
  if (process.env.NODE_ENV === `development`) {
    const { logger } = require(`redux-logger`);  
    middlewares.push(logger);
  }
  const store = createStore(
    reducer,
    preloadedState,
    applyMiddleware(thunk, ...middlewares),
  );
  return store;
}

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../modules';
import createMiddleware from './clientMiddleware';

const store = createStore(rootReducer,
  compose(
    applyMiddleware(thunk, createMiddleware()),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

export default store;

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createStore, StoreEnhancer } from "redux";
import './index.css';
import { App } from './App';
import { initialState } from './redux/initialState';
import { reducers } from './redux/reducers';

type WindowWithDevTools = Window & {
 __REDUX_DEVTOOLS_EXTENSION__: () => StoreEnhancer<unknown, {}>
}

const doesReduxDevtoolsExtenstionExist = 
(arg: Window | WindowWithDevTools): 
  arg is WindowWithDevTools  => {
    return  '__REDUX_DEVTOOLS_EXTENSION__' in arg;
}

const store = createStore(reducers, initialState,
  doesReduxDevtoolsExtenstionExist(window) ? 
  window.__REDUX_DEVTOOLS_EXTENSION__() : undefined)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

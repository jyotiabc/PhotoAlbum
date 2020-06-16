/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import React from 'react';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxMiddleware from 'redux-thunk';
import reducers from './app/store/reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const createStoreWithMiddleware = createStore(reducers, composeEnhancers(applyMiddleware(reduxMiddleware)));

const appRedux = () => {
    return (
        <Provider store={createStoreWithMiddleware}>
            <App />
        </Provider>
    );
}

AppRegistry.registerComponent(appName, () => appRedux);

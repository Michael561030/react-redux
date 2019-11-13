import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {applyMiddleware, combineReducers, createStore} from "redux";
import createSagaMiddleware from 'redux-saga';
import { shallow } from 'enzyme';
import {Provider} from "react-redux";
import {composeWithDevTools} from 'redux-devtools-extension';
import * as reducers from './ducks/index'

const rootReducer = combineReducers({products: reducers.default});
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(sagaMiddleware)

    )
);

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render((<Provider store={store}><App/></Provider>), div);
//   ReactDOM.unmountComponentAtNode(div);
// });

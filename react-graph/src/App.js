import React, { useState, useEffect } from 'react';
import Graph from './components/Graph';
import { Provider, useDispatch } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers';
import Manager from './components/Manager/Manager';
import input from './input';
import { initGraph } from './actions';

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

function App() {
    return (
        <Provider store={store}>
            <React.Fragment>
                <Graph input={input} />
                <Manager workerCount={6} />
            </React.Fragment>
        </Provider>
    );
}

export default App;

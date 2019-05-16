import React, { useState, useEffect } from 'react';
import Graph from './components/Graph';
import { Provider, useDispatch } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers';
import Manager from './components/Manager/Manager';
import input from './input';
import styled from 'styled-components';
import './App.css';

const actionSanitizer = (action) => (
    action.type === 'ADD_NODE_REF' && action.payload ?
    { ...action, payload: {...action.payload, node: `--NODE for ${action.payload.step}--`} } : action
  );

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({
        actionSanitizer,
        stateSanitizer: state => ({...state, graph: {...state.graph, nodeRefs: 'Node refs'}})
    }),
);

function App() {
    return (
        <Provider store={store}>
            <Container>
                <Graph input={input} />
                <Manager workerCount={6} />
            </Container>
        </Provider>
    );
}

const Container = styled.div`
  background-color: #fafafa;
  height: 100vh;
  overflow: scroll;
`;

export default App;

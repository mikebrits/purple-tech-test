import React from 'react';
import Graph from './components/Graph'
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./reducers";
import Manager from './components/Manager/Manager';

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

function App() {
  return (
    <Provider store={store}>
      <React.Fragment>
        <Graph/>
        <Manager workerCount={3}/>
      </React.Fragment>
    </Provider>
  );
}

export default App;

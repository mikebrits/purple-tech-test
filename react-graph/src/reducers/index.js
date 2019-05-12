import { combineReducers } from "redux";
import manager from "./manager.reducer";
import graph from "./graph.reducer";

export default combineReducers({ manager, graph });
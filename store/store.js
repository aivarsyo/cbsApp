import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import userReducer from "./reducers/userReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({userReducer})

//export const Store = createStore(rootReducer, applyMiddleware(thunk));
export const Store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
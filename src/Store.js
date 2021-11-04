import {createStore} from "redux";
import RootReducer from "./reducers/RootReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import {applyMiddleware} from "redux";
import thunk from "redux-thunk";

const Store = createStore(RootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default Store;
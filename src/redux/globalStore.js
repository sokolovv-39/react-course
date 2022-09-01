import { combineReducers, createStore } from "redux";
import { chatsReducer } from "./reducers/allReducers";
import { messagesReducer } from "./reducers/allReducers";

const reducer = combineReducers({ chats: chatsReducer, messages: messagesReducer });
export const globalStore = createStore(reducer);
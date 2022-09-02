import { applyMiddleware, combineReducers, createStore } from "redux";
import { chatsReducer } from "./reducers/allReducers";
import { messagesReducer } from "./reducers/allReducers";
import { deferEvent } from "./middlewares";
import { logger } from "./middlewares";
import { persistReducer, persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage
}
const reducer = combineReducers({ chats: chatsReducer, messages: messagesReducer });
const persistedReducer = persistReducer(persistConfig, reducer)
export const globalStore = createStore(persistedReducer, applyMiddleware(deferEvent, logger));
export const persist = persistStore(globalStore);
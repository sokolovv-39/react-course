import { createLogger } from "redux-logger";

export const deferEvent = store => next => action => {
    setTimeout(() => {
        alert('Отложенное событие');
        next(action);
    }, 1500)
};

export const logger = createLogger({
    predicate: (getState, action) => action.type !== 'DELETE_CHAT'
});
import * as types from '../actionTypes';

const initialState = {
    loading: false,
    currentUser: null,
    error: null
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LOGIN_START:
        case types.LOGOUT_START:
        case types.REGISTER_START:
            return {
                ...state,
                loading: true
            }
        case types.REGISTER_SUCCESS:
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                loading: false
            }
        case types.LOGOUT_SUCCESS:
            return {
                ...state,
                currentUser: null
            }
        case types.LOGOUT_ERROR:
        case types.REGISTER_ERROR:
        case types.LOGIN_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}
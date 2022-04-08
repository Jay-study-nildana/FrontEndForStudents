//note - the example project I was referencing was doing it with TODOs.
//I have retained the names.
//in my project, I am consuming an API server of my own design.
//https://jay-study-nildana.github.io/RandomStuffDocs/

import {
    LOAD_TODOS_IN_PROGRESS,
    LOAD_TODOS_SUCCESS,
    LOAD_TODOS_FAILURE,
} from './actions';

const initialState = { isLoading: false, data: [] };

export const todos = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case LOAD_TODOS_SUCCESS: {
            const { todos } = payload;
            return {
                ...state,
                isLoading: false,
                data: todos,
            };
        }
        case LOAD_TODOS_IN_PROGRESS:
            return {
                ...state,
                isLoading: true,
            }
        case LOAD_TODOS_FAILURE:
            return {
                ...state,
                isLoading: false,
            }
        default:
            return state;        
    }

}
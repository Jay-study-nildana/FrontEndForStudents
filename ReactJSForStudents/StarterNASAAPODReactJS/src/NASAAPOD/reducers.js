import {
    LOAD_APOD_IN_PROGRESS,
    LOAD_APOD_SUCCESS,
    LOAD_APOD_FAILURE   
} from './actions';

const initialState = { isLoading: false, data: [] };

export const apod = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case LOAD_APOD_SUCCESS: {
            const { apod } = payload;
            return {
                ...state,
                isLoading: false,
                data: apod,
            };
        }
        case LOAD_APOD_IN_PROGRESS:
            return {
                ...state,
                isLoading: true,
            }
        case LOAD_APOD_FAILURE:
            return {
                ...state,
                isLoading: false,
            }
        default:
            return state;        
    }

}
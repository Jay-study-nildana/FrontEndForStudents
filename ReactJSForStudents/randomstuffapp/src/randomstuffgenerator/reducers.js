//note - the example project I was referencing was doing it with TODOs.
//I have retained the names.
//in my project, I am consuming an API server of my own design.
//https://jay-study-nildana.github.io/RandomStuffDocs/

import {
    LOAD_TODOS_IN_PROGRESS,
    LOAD_TODOS_SUCCESS,
    LOAD_TODOS_FAILURE,
    LOAD_CLAIMS_IN_PROGRESS,
    LOAD_CLAIMS_SUCCESS,
    LOAD_CLAIMS_FAILURE,
    ADD_QUOTE_IN_PROGRESS,
    ADD_QUOTE_SUCCESS,
    ADD_QUOTE_FAILURE,    
} from './actions';

const initialState = { isLoading: false, data: [] };

//its essential that you give unique names to each data item (actual data, loading things)
//or they wont work and start clashing with each other.
//for example, look at data and claimdata

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
        case LOAD_CLAIMS_SUCCESS: {
            const { claims } = payload;
            return {
                ...state,
                isLoadingClaim: false,
                claimdata: claims,
            };
        }
        case LOAD_CLAIMS_IN_PROGRESS:
            return {
                ...state,
                isLoadingClaim: true,
            }
        case LOAD_CLAIMS_FAILURE:
            return {
                ...state,
                isLoadingClaim: false,
            }
        case ADD_QUOTE_SUCCESS: {
            const { quotes } = payload;
            return {
                ...state,
                isLoadingQuote: false,
                quotedata: quotes,
            };
        }
        case ADD_QUOTE_IN_PROGRESS:
            return {
                ...state,
                isLoadingQuote: true,
            }
        case ADD_QUOTE_FAILURE:
            return {
                ...state,
                isLoadingQuote: false,
            }                         
        default:
            return state;        
    }

}
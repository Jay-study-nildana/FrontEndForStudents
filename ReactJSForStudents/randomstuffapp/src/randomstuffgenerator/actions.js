//note - the example project I was referencing was doing it with TODOs.
//I have retained the names.
//in my project, I am consuming an API server of my own design.
//https://jay-study-nildana.github.io/RandomStuffDocs/

export const LOAD_TODOS_IN_PROGRESS = 'LOAD_TODOS_IN_PROGRESS';
export const loadTodosInProgress = () => ({
    type: LOAD_TODOS_IN_PROGRESS,
});

export const LOAD_TODOS_SUCCESS = 'LOAD_TODOS_SUCCESS';
export const loadTodosSuccess = todos => ({
    type: LOAD_TODOS_SUCCESS,
    payload: { todos },
});

export const LOAD_TODOS_FAILURE = 'LOAD_TODOS_FAILURE';
export const loadTodosFailure = () => ({
    type: LOAD_TODOS_FAILURE,
});

//for claims.

export const LOAD_CLAIMS_IN_PROGRESS = 'LOAD_CLAIMS_IN_PROGRESS';
export const loadclaimsInProgress = () => ({
    type: LOAD_CLAIMS_IN_PROGRESS,
});

export const LOAD_CLAIMS_SUCCESS = 'LOAD_CLAIMS_SUCCESS';
export const loadclaimsSuccess = claims => ({
    type: LOAD_CLAIMS_SUCCESS,
    payload: { claims },
});

export const LOAD_CLAIMS_FAILURE = 'LOAD_CLAIMS_FAILURE';
export const loadclaimsFailure = () => ({
    type: LOAD_CLAIMS_FAILURE,
});

//for adding new quote.

export const ADD_QUOTE_IN_PROGRESS = 'ADD_QUOTE_IN_PROGRESS';
export const addQuotesInProgress = () => ({
    type: ADD_QUOTE_IN_PROGRESS,
});

export const ADD_QUOTE_SUCCESS = 'ADD_QUOTE_SUCCESS';
export const loadQuotesSuccess = quotes => ({
    type: ADD_QUOTE_SUCCESS,
    payload: { quotes },
});

export const ADD_QUOTE_FAILURE = 'ADD_QUOTE_FAILURE';
export const loadQuotesFailure = () => ({
    type: ADD_QUOTE_FAILURE,
});

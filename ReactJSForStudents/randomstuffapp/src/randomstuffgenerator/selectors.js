//note - the example project I was referencing was doing it with TODOs.
//I have retained the names.
//in my project, I am consuming an API server of my own design.
//https://jay-study-nildana.github.io/RandomStuffDocs/

import { createSelector } from 'reselect';

//note here. 'todos' is the name of the component from reducers.js

export const getTodos = state => state.todos.data;
export const getTodosLoading = state => state.todos.isLoading;

//this is for the Claims stuff.

export const getClaims = state => state.todos.claimdata;
export const getClaimsLoading = state => state.todos.isLoadingClaim;

//this is the quote adding thing. 

export const addQuotes = state => state.todos.quotedata;
export const addQuotesLoading = state => state.todos.isLoadingQuote;

//from what I understand, selectors are used for doing things like filtering and stuch. 
//as of now, I am not really doing any filtering. So, selectors are being used but they dont play any role
//as of now. 

// export const getIncompleteTodos = createSelector(
//     getTodos,
//     (todos) => todos.filter(todo => !todo.isCompleted),
// );

// export const getCompletedTodos = createSelector(
//     getTodos,
//     (todos) => todos.filter(todo => todo.isCompleted),
// );

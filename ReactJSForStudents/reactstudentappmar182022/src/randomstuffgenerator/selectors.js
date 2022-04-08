//note - the example project I was referencing was doing it with TODOs.
//I have retained the names.
//in my project, I am consuming an API server of my own design.
//https://jay-study-nildana.github.io/RandomStuffDocs/

import { createSelector } from 'reselect';

export const getTodos = state => state.todos.data;
export const getTodosLoading = state => state.todos.isLoading;

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

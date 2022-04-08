//note - the example project I was referencing was doing it with TODOs.
//I have retained the names.
//in my project, I am consuming an API server of my own design.
//https://jay-study-nildana.github.io/RandomStuffDocs/

import {
    loadTodosInProgress,
    loadTodosSuccess,
    loadTodosFailure,
} from './actions';

export const displayAlert = text => () => {
    alert(text);
};

export const loadTodos = () => async (dispatch, getState) => {
    try {
        dispatch(loadTodosInProgress());
        const response = await fetch('https://randomstuffapizeropoint4.azurewebsites.net/api/UserNotLoggedIn/GetHoldOfthem');
        const todos = await response.json();
    
        dispatch(loadTodosSuccess(todos));
    } catch (e) {
        dispatch(loadTodosFailure());
        dispatch(displayAlert(e));
    }
}
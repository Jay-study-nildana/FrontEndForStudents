//note - the example project I was referencing was doing it with TODOs.
//I have retained the names.
//in my project, I am consuming an API server of my own design.
//https://jay-study-nildana.github.io/RandomStuffDocs/

import {
    loadTodosInProgress,
    loadTodosSuccess,
    loadTodosFailure,
    loadclaimsInProgress,
    loadclaimsSuccess,
    loadclaimsFailure,
    addQuotesInProgress,
    loadQuotesSuccess,
    loadQuotesFailure,    
} from './actions';


export const displayAlert = text => () => {
    alert(text);
};

//TODOJAY - can we move this to a json file so we can update all endpoints at once?
const baseURI = `https://randomstuffapizeropoint4.azurewebsites.net`

const loadTodosURI = baseURI+'/api/UserNotLoggedIn/GetHoldOfthem';
const loadclaimsURI = baseURI+'/api/TheOthers/claims';
const addQuoteURI = baseURI+'/api/Moderator/AddNewQuote';

//some notes : 
//this call does not actual need a bearer token
//still I pass it anyway. just for the sake of it

export const loadTodos = (recieved) => async (dispatch, getState) => {
    console.log(`Thunking in loadTodos`);
    const requesttype = 'GET';
    console.log(recieved);
    try {
        dispatch(loadTodosInProgress());
        const response = await fetch(
                        loadTodosURI,
                        {
                            method: requesttype,
                            headers: {
                                Authorization: `Bearer ${recieved.tokentStuff}`,
                                'Content-Type': 'application/json'
                              },
                        }
                        );
        const todos = await response.json();
    
        dispatch(loadTodosSuccess(todos));
    } catch (e) {
        dispatch(loadTodosFailure());
        dispatch(displayAlert(e));
    }
}

export const loadClaims = (recieved) => async (dispatch, getState) => {
    console.log(`Thunking in loadClaims`);
    const requesttype = 'GET';
    console.log(recieved);
    try {
        dispatch(loadclaimsInProgress());
        const response = await fetch(
                        loadclaimsURI,
                        {
                            method: requesttype,
                            headers: {
                                Authorization: `Bearer ${recieved.tokentStuff}`,
                                'Content-Type': 'application/json'
                              },
                        }
                        );
        const claims = await response.json();
    
        dispatch(loadclaimsSuccess(claims));
    } catch (e) {
        dispatch(loadclaimsFailure());
        dispatch(displayAlert(e));
    }
}

export const loadAddQuotes = (recieved) => async (dispatch, getState) => {
    console.log(`Thunking in addQuotes`);
    const requesttype = 'POST';
    console.log(recieved);
    console.log(recieved.quoteObject);
    const tempObject = {
        "quoteAuthor": "string",
        "quoteContent": "string",
        "optionalAdditionalNotes": "string"
        }
    let JSONbody = JSON.stringify(recieved.quoteObject);    
    console.log(JSONbody);
    try {
        dispatch(addQuotesInProgress());
        const response = await fetch(
            addQuoteURI,
                        {
                            method: requesttype,
                            headers: {
                                Authorization: `Bearer ${recieved.tokentStuff}`,
                                'Content-Type': 'application/json'
                              },
                            body : JSONbody
                        }
                        );
        const quotes = await response.json();

        console.log(`Thunking after FETCH in addQuotes`);
        console.log(quotes);
        console.log(`Thunking after quotes in addQuotes`);
    
        dispatch(loadQuotesSuccess(quotes));
    } catch (e) {
        dispatch(loadQuotesFailure());
        dispatch(displayAlert(e));
    }
}
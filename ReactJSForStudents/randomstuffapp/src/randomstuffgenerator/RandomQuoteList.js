//note - the example project I was referencing was doing it with TODOs.
//I have retained the names.
//in my project, I am consuming an API server of my own design.
//https://jay-study-nildana.github.io/RandomStuffDocs/

import React, { useEffect } from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import RandomQuoteItem from './RandomQuoteItem';
import { useAuth0 } from "@auth0/auth0-react";

import {
    getTodosLoading,
    getTodos,
} from './selectors';

import { loadTodos } from './thunks';

const ListWrapper = styled.div`
    max-width: 700px;
    margin: auto;
`;

const GeneralWrapper = styled.div`
    max-width: 700px;
    margin: auto;
`;

const Button = styled.button`
    font-size: 16px;
    padding: 8px;
    border: none;
    border-radius: 8px;
    outline: none;
    cursor: pointer;
    margin-left: 8px;
    width: 50%;
    background-color: #22ee22;
`;

const Parragraph = styled.p`
    font-size: 16px;
    padding: 8px;
    border: none;
    border-bottom: 2px solid #ddd;
    border-radius: 8px;
    width: 70%;
    outline: none;
`;

//original CSS. compare this with the styled components aboves
// .list-wrapper {
//     max-width: 700px;
//     margin: auto;
// }

//Note : At the time of this code writing, I dont actually have a API endpoint that returns a list of 
//quotes.
//So, as of now, I am simply showing a single quote, but inside a list code
//eventually, I plan to have a list of quotes returning in my API server.

//a dummy todo
/*

            <h3>{todo.quoteContent}</h3>
            <h4>{todo.quoteAuthor}</h4>
            <h4>{todo.quoteIdentifierString}</h4>
            <p>-------------------------------</p>
            <h4>{todo.quoteIdentifierCompadre}</h4>
            <h4>{todo.dateTimeOfResponse}</h4>
            <h4>{todo.detailsAboutOperation}</h4>

            <GeneralWrapper>
                <RandomQuoteItem todo = {dummtodo} inputValue = {inputValue}/>
            </GeneralWrapper>            

*/

const dummtodo = {
    quoteContent : "loading...quote",
    quoteAuthor : "loading...author",
    quoteIdentifierString : "loading...identifier",
    quoteIdentifierCompadre : "loading...identifiercompadre",
    // dateTimeOfResponse : "loading...timeofresponse",
    detailsAboutOperation : "loading...operationdetails",
}

const stuffToSend = {
    tokentStuff : "emptyforNow"
}

const RandomQuoteList = ({ todobaz, isLoading, startLoadingTodos }) => {

    const { getAccessTokenSilently,isAuthenticated } = useAuth0();
    var [token, settoken] = useState("");

    async function GrabThetoken() {
        console.log("RandomQuoteList - GrabThetoken");
        var getThetoken = await getAccessTokenSilently();        
        settoken(getThetoken);
        stuffToSend.tokentStuff = token;
        console.log(token);
        startLoadingTodos();        
    }

    useEffect(() => {
        GrabThetoken();
    }, []);

    const [inputValue, setInputValue] = useState(`HelloThere`);

    function changeRandomText(e) {
        
        // const item = e.target.value;
        var something = Math.random();
        console.log(`changeRandomText clicked + ${something}`);
        setInputValue(`changeRandomText clicked + ${something}`);
        console.log(inputValue);
        startLoadingTodos();

        if(isAuthenticated)
        {
            console.log(`Already Logged In`);
            // console.log("AccountClaims - GrabThetoken");
            // var getThetoken = await getAccessTokenSilently();        
            // settoken(getThetoken);
            // stuffToSend.tokentStuff = token;            
            // startLoadingClaims();
        }
        else
        {
            console.log(`Not Logged In`);
        }         
      }    
    
    // const loadingMessage = <div>Loading todos...</div>;
    const loadingMessage2 = (
        <GeneralWrapper>
            {/* <div>Loading quote stuff...</div> */}
            <GeneralWrapper>
                <RandomQuoteItem todo = {dummtodo} inputValue = {inputValue}/>
            </GeneralWrapper>    
            <hr />                    
            <GeneralWrapper>
                <Button onClick={changeRandomText}>Get A New Quote</Button>
            </GeneralWrapper>
            {/* <GeneralWrapper>
                <p>{dummtodo.quoteAuthor}</p>
            </GeneralWrapper> */}

        </GeneralWrapper>   
    ); 
    const content = (
        <GeneralWrapper>
            <GeneralWrapper>
                <RandomQuoteItem todo = {todobaz} inputValue = {inputValue}/>
            </GeneralWrapper>
            <hr />
            <GeneralWrapper>
                <Button onClick={changeRandomText}>Get A New Quote</Button>
            </GeneralWrapper>

        </GeneralWrapper>
        

    );
    return isLoading ? loadingMessage2 : content;
};


const mapStateToProps = state => ({
    isLoading: getTodosLoading(state),
    todobaz: getTodos(state),
});

const mapDispatchToProps = dispatch => ({
    startLoadingTodos: () => dispatch(loadTodos(stuffToSend)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RandomQuoteList);


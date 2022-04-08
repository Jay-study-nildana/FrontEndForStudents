//note - the example project I was referencing was doing it with TODOs.
//I have retained the names.
//in my project, I am consuming an API server of my own design.
//https://jay-study-nildana.github.io/RandomStuffDocs/

import React, { useEffect } from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import RandomQuoteItem from './RandomQuoteItem';

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
const RandomQuoteList = ({ todo, isLoading, startLoadingTodos }) => {
    useEffect(() => {
        startLoadingTodos();
    }, []);

    const [inputValue, setInputValue] = useState(`HelloThere`);

    function changeRandomText(e) {
        
        // const item = e.target.value;
        var something = Math.random();
        console.log(`changeRandomText clicked + ${something}`);
        setInputValue(`changeRandomText clicked + ${something}`);
        console.log(inputValue);
        startLoadingTodos();
      }    
    
    const loadingMessage = <div>Loading todos...</div>;
    const loadingMessage2 = (
        <GeneralWrapper>
            <div>Loading quote stuff...</div>
            <GeneralWrapper>
                <Button onClick={changeRandomText}>Get A New Quote</Button>
            </GeneralWrapper>

        </GeneralWrapper>   
    ); 
    const content = (
        <GeneralWrapper>
            <GeneralWrapper>
                <RandomQuoteItem todo = {todo} inputValue = {inputValue}/>
            </GeneralWrapper>
            <GeneralWrapper>
                <Button onClick={changeRandomText}>Get A New Quote</Button>
            </GeneralWrapper>

        </GeneralWrapper>
        

    );
    return isLoading ? loadingMessage2 : content;
};


const mapStateToProps = state => ({
    isLoading: getTodosLoading(state),
    todo: getTodos(state),
});

const mapDispatchToProps = dispatch => ({
    startLoadingTodos: () => dispatch(loadTodos()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RandomQuoteList);


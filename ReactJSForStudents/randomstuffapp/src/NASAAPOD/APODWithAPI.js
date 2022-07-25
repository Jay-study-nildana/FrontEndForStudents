import React, { useEffect } from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import localImageDiamondMoon from "./mike-van-den-bos-jf1EomjlQi0-unsplash.jpg";

import {
    getApodLoading,
    getApod,
} from './selectors';

import { loadApod } from './thunks';

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

const stuffToSend = {
    tokentStuff : "emptyforNow"
}


let imageURLLoading = localImageDiamondMoon;
//APODWithAPI.js
//the actual component
const APODWithAPI = ({ todobaz, isLoading, startLoadingApod }) => {

    const [inputValue, setInputValue] = useState(`HelloThere`);

    function changeRandomText(e) {
        
        // const item = e.target.value;
        var something = Math.random();
        console.log(`changeRandomText clicked + ${something}`);
        setInputValue(`changeRandomText clicked + ${something}`);
        console.log(inputValue);
        startLoadingApod();        
      } 

    const loadingMessage = <div>Loading todos...</div>;  

    const loadingMessage2 = (
        <GeneralWrapper>
            <GeneralWrapper>
                {/* <RandomQuoteItem todo = {todobaz} inputValue = {inputValue}/> */}
                <h3>{`TITLE Loading`}</h3>
                <img src={localImageDiamondMoon} className="img-fluid" alt="..."></img>
                <p>{`COPYRIGHT Loading`}</p>
                <p>{`DATE Loading`}</p>
                <p>{`EXPLANATION loading...loading...loading...loading...loading...loading...loading`}</p>
                
            </GeneralWrapper>
            <hr />
            <GeneralWrapper>
                <Button onClick={changeRandomText}>Get APID data</Button>
            </GeneralWrapper>

        </GeneralWrapper>
    );    
    
    const content = (
        <GeneralWrapper>
            <GeneralWrapper>
                {/* <RandomQuoteItem todo = {todobaz} inputValue = {inputValue}/> */}
                <h3>{todobaz.title}</h3>
                <img src={todobaz.hdurl} className="img-fluid" alt="..."></img>
                <p>{todobaz.copyright}</p>
                <p>{todobaz.date}</p>
                <p>{todobaz.explanation}</p>
                
            </GeneralWrapper>
            
            <hr />
            <GeneralWrapper>
                <Button onClick={changeRandomText}>Get APID data</Button>
            </GeneralWrapper>

        </GeneralWrapper>
    );    
    return isLoading ? loadingMessage2 : content;
}

const mapStateToProps = state => ({
    isLoading: getApodLoading(state),
    todobaz: getApod(state),
});

const mapDispatchToProps = dispatch => ({
    startLoadingApod: () => dispatch(loadApod(stuffToSend)),
});

export default connect(mapStateToProps, mapDispatchToProps)(APODWithAPI);
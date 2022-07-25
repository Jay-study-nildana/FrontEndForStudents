import React, { useEffect } from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { useAuth0 } from "@auth0/auth0-react";
import AccountClaimsTable from './AccountClaimsTable';

import {
    getClaimsLoading,
    getClaims,
} from './selectors';

import { loadClaims } from './thunks';

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

//here, I simply took the output from swagger

const dummyClaims = [
    {
      "type": "iss",
      "value": "loading..."
    },
    {
      "type": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier",
      "value": "loading..."
    },
    {
      "type": "aud1",
      "value": "loading..."
    },
    {
      "type": "aud2",
      "value": "loading..."
    },
    {
      "type": "iat",
      "value": "loading..."
    },
    {
      "type": "exp",
      "value": "loading..."
    },
    {
      "type": "azp",
      "value": "loading..."
    },
    {
      "type": "scope",
      "value": "loading..."
    }
  ];

const stuffToSend = {
    tokentStuff : "emptyforNow"
}

const AccountClaims = ({claim, isLoading, startLoadingClaims}) => {

    const { getAccessTokenSilently,isAuthenticated } = useAuth0();
    var [token, settoken] = useState("");

    async function GrabThetoken() {

        if(isAuthenticated)
        {
            console.log(`Already Logged In`);
            console.log("AccountClaims - GrabThetoken");
            var getThetoken = await getAccessTokenSilently();        
            settoken(getThetoken);
            stuffToSend.tokentStuff = token;            
            if(token=='')
            {
                console.log('token is empty. not calling claims')
            }
            else
            {
                startLoadingClaims();
            }
        }
        else
        {
            console.log(`Not Logged In`);
        }

    }    

    useEffect(() => {

        GrabThetoken();
    }, []);    

    const [inputValue, setInputValue] = useState(`HelloThere`);    

    async function changeRandomText(e) {
        
        // const item = e.target.value;
        var something = Math.random();
        console.log(`changeRandomText clicked + ${something}`);
        setInputValue(`changeRandomText clicked + ${something}`);
        console.log(inputValue);

        if(isAuthenticated)
        {
            console.log(`Already Logged In`);
            console.log("AccountClaims - changeRandomText");
            var getThetoken = await getAccessTokenSilently();        
            settoken(getThetoken);
            stuffToSend.tokentStuff = token;            
            if(token=='')
            {
                console.log('token is empty. not calling claims')
            }
            else
            {
                startLoadingClaims();
            }

        }
        else
        {
            console.log(`Not Logged In`);
        }        

        // startLoadingClaims();
      }     

      const loadingMessage2 = (
        <GeneralWrapper>
            {/* <div>Loading quote stuff...</div> */}
            <GeneralWrapper>
                <p>{dummyClaims.toString()}</p>
                <AccountClaimsTable claimrows = {dummyClaims} />
            </GeneralWrapper>    
            <hr />                    
            {/* <GeneralWrapper>
                <Button onClick={changeRandomText}>Acquire Claims</Button>
            </GeneralWrapper> */}
            {isAuthenticated && (
                <GeneralWrapper>
                    <Button onClick={changeRandomText}>Acquire Claims</Button>
                </GeneralWrapper>                
            )}
            {!isAuthenticated && (
                <GeneralWrapper>
                    <Button >You are Not Logged In</Button>
                </GeneralWrapper>                
            )}             

        </GeneralWrapper>   
    );      

    const content = (
        <GeneralWrapper>
            <GeneralWrapper>
            <AccountClaimsTable claimrows = {claim} />
            </GeneralWrapper>
            <hr />
            {/* <GeneralWrapper>
                <Button onClick={changeRandomText}>Acquire Claims</Button>
            </GeneralWrapper> */}
            {isAuthenticated && (
                <GeneralWrapper>
                    <Button onClick={changeRandomText}>Acquire Claims</Button>
                </GeneralWrapper>                
            )}
            {!isAuthenticated && (
                <GeneralWrapper>
                    <Button >You are Not Logged In</Button>
                </GeneralWrapper>                
            )}            

        </GeneralWrapper>
        

    );    

      return isLoading ? loadingMessage2 : content;      

};

//get stuff is coming from selectors
//selectors are getting all the information from state redux

const mapStateToProps = state => ({
    isLoading: getClaimsLoading(state),
    claim: getClaims(state),
});

//loadClaims is coming from thunks
const mapDispatchToProps = dispatch => ({
    startLoadingClaims: () => dispatch(loadClaims(stuffToSend)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountClaims);
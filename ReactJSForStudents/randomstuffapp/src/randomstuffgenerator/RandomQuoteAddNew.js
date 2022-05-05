import React, { useEffect } from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { useAuth0 } from "@auth0/auth0-react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


import {
    addQuotesLoading,
    addQuotes,
} from './selectors';

import { loadAddQuotes } from './thunks';

const GeneralWrapper = styled.div`
    max-width: 700px;
    margin: auto;
`;

const GeneralWrapper2 = styled.div`
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

let tempNewQuoteObject = {
    "quoteAuthor": "string",
    "quoteContent": "string",
    "optionalAdditionalNotes": "string"
  }

let tempQuoteResponse = {
    "quoteIdentifierString": "LOADING.......................................",
    "listOfResponses": [
      "AddNewQuoteCRUDResponse Response Below",
      "LOADING.......................................",
      "CRUD Response Below",
      "LOADING.......................................",
      "Create and History Operations Completed. Please dont assume success. Check OperationSuccessful and ListOfResponses for more details"
    ],
    "dateTimeOfResponse": "LOADING.......................................",
    "operationSuccessful": true,
    "detailsAboutOperation": "LOADING......................................."
  }

const stuffToSend = {
    tokentStuff : "emptyforNow",
    quoteObject : tempNewQuoteObject
}  

const RandomQuoteAddNew = ({ addquoteaz, isLoading, startAddingQuotes }) => {

    const { getAccessTokenSilently,isAuthenticated } = useAuth0();
    var [token, settoken] = useState("");

    const [quoteAuthor, setquoteAuthor] = useState('');
    const [quoteContent, setquoteContent] = useState('');
    const [optionalAdditionalNotes, setoptionalAdditionalNotes] = useState('');
    const [quoteResponse,setquoteResponse] = useState('Nothing To Show Yet');
    const [quoteAuthorInputStatus,setquoteAuthorInputStatus] = useState('');
    const [quoteContentInputStatus,setquoteContentInputStatus] = useState('');
    const [buttonQuoteAllow,setbuttonQuoteAllow] = useState(false);

    function clearEverything(e) {
        console.log(e);
        setquoteAuthor(``);
        setquoteContent(``);
        setoptionalAdditionalNotes(``);
        addquoteaz = tempQuoteResponse;
        console.log(addquoteaz);
    }
    async function addQuote(e) {
        // console.log(e);
        console.log(quoteAuthor);
        console.log(quoteContent);
        console.log(optionalAdditionalNotes);

        if(stuffToSend.tokentStuff=='emptyforNow' || 
        stuffToSend.tokentStuff=='')
        {
            console.log("RandomQuoteAddNew - GrabThetoken");
            var getThetoken = await getAccessTokenSilently();        
            settoken(getThetoken);
            stuffToSend.tokentStuff = token;   
        }

     

        stuffToSend.quoteObject.quoteAuthor = quoteAuthor;
        stuffToSend.quoteObject.quoteContent = quoteContent;
        stuffToSend.quoteObject.optionalAdditionalNotes = optionalAdditionalNotes;

        console.log(stuffToSend);

        //call the add thunk
        startAddingQuotes();

        //clear the fields
        setquoteAuthor(``);
        setquoteContent(``);        
    }

    async function GrabThetoken() {
        console.log("RandomQuoteAddNew - GrabThetoken");
        var getThetoken = await getAccessTokenSilently();        
        settoken(getThetoken);
        stuffToSend.tokentStuff = token;
        // console.log(token);
    }    

    function checkInput()
    {
        console.log('inside checkInput');
        if(quoteAuthor.length==0)
        {
            setquoteAuthorInputStatus('Quote Author is currently empty');
            setbuttonQuoteAllow(false);
        }
        else
        {
            setquoteAuthorInputStatus('Quote Author is ready');
        }
        if(quoteContent.length==0)
        {
            setquoteContentInputStatus('Quote Content is currently empty');
            setbuttonQuoteAllow(false);
        }   
        else
        {
            setquoteContentInputStatus('Quote Content is ready');
        }     

        if(quoteAuthor.length>0 && quoteContent.length>0)
        {
            setbuttonQuoteAllow(true);
        }
        console.log(buttonQuoteAllow);
    }

    useEffect(() => {
        GrabThetoken();

        console.log(quoteAuthor);
        console.log(quoteContent);
        console.log(optionalAdditionalNotes);   
        checkInput();     

    }, [quoteAuthor,quoteContent]);    

    // const loadingMessage = <div>Loading todos...</div>;
    const loadingMessage2 = (
        <GeneralWrapper>
            <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            >
            <div>
                <TextField id="outlined-basic" label="Outlined" variant="outlined" />    
            </div>
            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
            <TextField id="filled-basic" label="Filled" variant="filled" />
            <TextField id="standard-basic" label="Standard" variant="standard" />
            </Box>
        </GeneralWrapper>   
    ); 
    const loadingMessage3 = (
        <GeneralWrapper>
            <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            >
            <div>
                <TextField id="outlined-basic" label="Quote Author" variant="outlined"
                onChange={e => setquoteAuthor(e.target.value)}
                value={quoteAuthor} />    
            </div>                
            <div>
                <TextField id="outlined-basic" label="Quote Content" variant="outlined"
                onChange={e => setquoteContent(e.target.value)}
                value={quoteContent} />                
            </div>
            <div>
                <TextField id="filled-basic" label="Notes" variant="filled"
                onChange={e => setoptionalAdditionalNotes(e.target.value)}
                value={optionalAdditionalNotes} />
            </div>  
                 
            </Box>
            <GeneralWrapper>
                <Button onClick={clearEverything}>Clear Everything</Button>
            </GeneralWrapper>
            <GeneralWrapper>
                (buttonQuoteAllow && <Button onClick={addQuote}>Add Quote</Button>)
                (!buttonQuoteAllow && <Button onClick={addQuote}>Not Allowed Quote</Button>)
            </GeneralWrapper>             
            <GeneralWrapper>
            <Typography variant="button" display="block" gutterBottom>
                {JSON.stringify(tempQuoteResponse)}
            </Typography>
            </GeneralWrapper>                         

        </GeneralWrapper>
    ); 
    
    const loadingMessage4 = (
        <GeneralWrapper>
            <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '100ch' },
            }}
            noValidate
            autoComplete="off"
            >
            <div>
                <TextField required fullWidth id="outlined-basic" label="Quote Author" variant="outlined"
                onChange={e => setquoteAuthor(e.target.value)}
                value={quoteAuthor} />    
            </div>                
            <div>
                <TextField required fullWidth id="outlined-basic" label="Quote Content" variant="outlined"
                onChange={e => setquoteContent(e.target.value)}
                value={quoteContent} />                
            </div>
            <div>
                <TextField fullWidth id="filled-basic" label="Notes" variant="filled"
                onChange={e => setoptionalAdditionalNotes(e.target.value)}
                value={optionalAdditionalNotes} />
            </div>  
            <Stack sx={{ m: 1,width: '100%' }} spacing={2}>
                <Alert severity="error">{quoteAuthorInputStatus}</Alert>
                <Alert severity="warning">{quoteContentInputStatus}</Alert>
                {/* <Alert severity="info">This is an info alert — check it out!</Alert>
                <Alert severity="success">This is a success alert — check it out!</Alert> */}
            </Stack>                  
            </Box>
            <GeneralWrapper>

            </GeneralWrapper>
           
            <GeneralWrapper>
                <Button  onClick={clearEverything}>Clear Everything</Button>
            </GeneralWrapper>
            <GeneralWrapper>
                <Button onClick={addQuote}>Add Quote</Button>
            </GeneralWrapper>             
            <GeneralWrapper>
            {/* <Typography variant="button" display="block" gutterBottom>
                {JSON.stringify(addquoteaz)}
            </Typography> */}
                <Alert severity="info">{tempQuoteResponse.quoteIdentifierString}</Alert>
                <Alert severity="success">{tempQuoteResponse.detailsAboutOperation}</Alert>            
            </GeneralWrapper>                         

        </GeneralWrapper>
    );  
    const content = (
        <GeneralWrapper>
            <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '100ch' },
            }}
            noValidate
            autoComplete="off"
            >
            <div>
                <TextField required fullWidth id="outlined-basic" label="Quote Author" variant="outlined"
                onChange={e => setquoteAuthor(e.target.value)}
                value={quoteAuthor} />    
            </div>                
            <div>
                <TextField required fullWidth id="outlined-basic" label="Quote Content" variant="outlined"
                onChange={e => setquoteContent(e.target.value)}
                value={quoteContent} />                
            </div>
            <div>
                <TextField fullWidth id="filled-basic" label="Notes" variant="filled"
                onChange={e => setoptionalAdditionalNotes(e.target.value)}
                value={optionalAdditionalNotes} />
            </div>  
            <Stack sx={{ m: 1,width: '100%' }} spacing={2}>
                <Alert severity="error">{quoteAuthorInputStatus}</Alert>
                <Alert severity="warning">{quoteContentInputStatus}</Alert>
                {/* <Alert severity="info">This is an info alert — check it out!</Alert>
                <Alert severity="success">This is a success alert — check it out!</Alert> */}
            </Stack>                  
            </Box>
            <GeneralWrapper>

            </GeneralWrapper>
           
            <GeneralWrapper>
                <Button  onClick={clearEverything}>Clear Everything</Button>
            </GeneralWrapper>
            <GeneralWrapper>
                {/* <Button onClick={addQuote}>Add Quote</Button> */}
                {buttonQuoteAllow && <Button onClick={addQuote}>Add Quote</Button>}
                {!buttonQuoteAllow && <Button >Check Missing Fields</Button>}
            </GeneralWrapper>             
            <GeneralWrapper>
            {/* <Typography variant="button" display="block" gutterBottom>
                {JSON.stringify(addquoteaz)}
            </Typography> */}
                <Alert severity="info">{addquoteaz.quoteIdentifierString}</Alert>
                <Alert severity="success">{addquoteaz.detailsAboutOperation}</Alert>            
            </GeneralWrapper>                         

        </GeneralWrapper>
    );    

    return isLoading ? loadingMessage4 : content;
};

const mapStateToProps = state => ({
    isLoading: addQuotesLoading(state),
    addquoteaz: addQuotes(state),
});

const mapDispatchToProps = dispatch => ({
    startAddingQuotes: () => dispatch(loadAddQuotes(stuffToSend)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RandomQuoteAddNew);
// export default RandomQuoteAddNew;
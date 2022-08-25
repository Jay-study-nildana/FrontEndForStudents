//APODWithLocalImage.js

import localImageDiamondMoon from "./DiamondMoonWSMALL.jpg";
import localAntEaterImage from ""

let string1 = `Showing a Local Image From Local Directory`;

const APODWithLocalImage = () => (
    <div className="text-center hero my-5">
    {/* <img className="mb-3 app-logo" src={logo} alt="React logo" width="120" /> */}
    <h1 className="mb-4">{string1}</h1>   
    <img src={localImageDiamondMoon} className="img-fluid" alt="..."></img>
  </div>
);

export default APODWithLocalImage;

//ShowSomeStuff

//const RandomQuoteItem = ({ todo,inputValue }) => {

import { useState } from 'react';
import { useEffect } from 'react';

const ShowSomeStuff = ({someObject1,someObject2}) => {

    const [quoteContent, setquoteContent] = useState('');
    const [quoteContentMimic, setquoteContentMimic] = useState('');

    useEffect(() => {
        console.log(quoteContent);
        setquoteContentMimic(quoteContent);
        console.log(quoteContentMimic);

        if(quoteContent.length === 0)
        {
            let someMessage = `You have not yet typed anything. Type something`;
            setquoteContentMimic(someMessage);
        }

    }, [quoteContent,quoteContentMimic]);    

    function clearEverything()
    {
        console.log(`input has been cleared`);
        setquoteContent(``);
    }

    const stuff = (<div className="text-center">
        <p>Here, we are just showing some things.</p>
        <hr></hr>
        <h1>{someObject1.name}</h1>
        <hr></hr>
        <h1>{someObject2.name}</h1>
        <hr></hr>       
        <div className="input-group mb-3">
            <div>
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="enter anything you want"
                    onChange={e => setquoteContent(e.target.value)}
                    value={quoteContent}                
                />
                <p>You are typing : {quoteContentMimic}</p>
            </div>
            <div>
                {/* <Button onClick={clearEverything}>Clear Everything</Button> */}
                <button 
                    type="button" 
                    className="btn btn-primary" 
                    onClick={clearEverything}
                    >Primary</button>
            </div>
        </div>      
    </div>);
    return stuff;
};

export default ShowSomeStuff;


// import localImageDiamondMoon from "./DiamondMoonWSMALL.jpg";
import localAntEaterImage from "../images/vijayasimha-br-J9Oqt2iQFBU-unsplash.jpg";
import axios from "axios";
import { useState, useEffect } from 'react';
import React from "react";

let string1 = `This is coming from GetSomething Component`;
let stringloading = `loading........`;
let stringloaded = `NASA DATA IS HERE FROM AXIOS`;
let apikeyfromnasa = `JjP84CKefxzmg2fyAvN4zWsRyAAqg1nzrXvHdtc6`;
let loadApodURI = `https://api.nasa.gov/planetary/apod?api_key=${apikeyfromnasa}`;

const GetSomething = () => {

    const [post, setPost] = useState(null);

    useEffect ( () => {
        //call NASA API the moment page loads. 
        axios.get(loadApodURI).then(
            (response) => {
                console.log(response.data);
                setPost(response.data);
            }
        );
    },[]);

    const outputWhenNull = 
    (
        
        <div className="text-center hero my-5">
        {/* <img className="mb-3 app-logo" src={logo} alt="React logo" width="120" /> */}
        <h1 className="mb-4">{string1}</h1> 
        <h1 className="mb-4">{stringloading}</h1>   
        <img src={localAntEaterImage} className="img-fluid" alt="..."></img>
        </div>
    );

    if(!post) 
    {
        return outputWhenNull;
    }
    const outputWithNASARESPONSE = 
    (
        
        <div className="text-center hero my-5">
        {/* <img className="mb-3 app-logo" src={logo} alt="React logo" width="120" /> */}
        <h1 className="mb-4">{string1}</h1> 
        <h1 className="mb-4">{stringloaded}</h1>   
        <img src={post.hdurl} className="img-fluid" alt="..."></img>
        <h6 className="mb-4">{post.explanation}</h6>
        </div>
    );    
    //if we are here, that means, post has been update
    //and the API call was successfull
    return outputWithNASARESPONSE;        
    }


export default GetSomething;
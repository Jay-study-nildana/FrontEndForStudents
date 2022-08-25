
// import localImageDiamondMoon from "./DiamondMoonWSMALL.jpg";
import axios from "axios";
import { useState, useEffect } from 'react';
import React from "react";

let string1 = `This is coming from GetSomethingMongo Component`;
let stringloading = `loading........`;
let stringloaded = `MONGO DB DATA IS HERE FROM AXIOS`;
let listofmovies =`Here is your list of Movies in a nice simple list`;
let MongoURI = 'http://localhost:8081/mongodb/returnsomemovies'

const GetSomethingMongo = () => {

    const [post, setPost] = useState(null);

    function MovieItem(props) {
        // console.log(props);
        const moviething = (
            <div>
                <h4>Movie Name : {props.movie.title}</h4>
                <br></br>
                <p>rating : {props.movie.imdb.rating}</p>
                <p>votes : {props.movie.imdb.votes}</p>
                <p>id : {props.movie.imdb.id}</p>
                {/* <p>hello</p> */}
                <hr></hr>
            </div>
        );
        return moviething;
    }

    useEffect ( () => {
        //call NASA API the moment page loads. 
        axios.get(MongoURI).then(
            (response) => {
                console.log(response.data);
                setPost(response.data);
                // console.log(post.movies)
            }
        );
    },[]);

    const outputWhenNull = 
    (
        
        <div className="text-center hero my-5">
        {/* <img className="mb-3 app-logo" src={logo} alt="React logo" width="120" /> */}
        <h1 className="mb-4">{string1}</h1> 
        <h1 className="mb-4">{stringloading}</h1>   
        {/* <img src={localAntEaterImage} className="img-fluid" alt="..."></img> */}
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
        {/* <img src={post.hdurl} className="img-fluid" alt="..."></img>
        <h6 className="mb-4">{post.explanation}</h6> */}
        <h6 className="mb-4">{listofmovies}</h6>
        {post.movies.map( (singlemovieitem) => 
        <MovieItem key={singlemovieitem.title} movie={singlemovieitem} />
                 )}
        
        </div>
    );    
    //if we are here, that means, post has been update
    //and the API call was successfull
    return outputWithNASARESPONSE;        
    }


export default GetSomethingMongo;
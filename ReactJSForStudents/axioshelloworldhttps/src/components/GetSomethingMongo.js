
// import localImageDiamondMoon from "./DiamondMoonWSMALL.jpg";
import axios from "axios";
import { useState, useEffect } from 'react';
import React from "react";

let string1 = `Basic GET usage from web api is happening here`;
let stringloading = `loading........`;
let stringloaded = `Basic GET usage from web api is happening here`;
//let listofmovies =`Here is your list of Movies in a nice simple list`;
let MongoURI = 'http://localhost:8081/dummycar'

const GetSomethingMongo = () => {

    const [post, setPost] = useState(null);

    function MovieItem(props) {
        // console.log(props);
        const moviething = (
            <div>
                <h4>Car Name : {props.name}</h4>
                <br></br>
                <p>Driver : {props.driver}</p>
                {/* <p>hello</p> */}
                <hr></hr>
            </div>
            //     <div>
            //     <h4>Movie Name : {props.movie.title}</h4>
            //     <br></br>
            //     <p>rating : {props.movie.imdb.rating}</p>
            //     <p>votes : {props.movie.imdb.votes}</p>
            //     <p>id : {props.movie.imdb.id}</p>
            //     {/* <p>hello</p> */}
            //     <hr></hr>
            // </div>            
        );
        return moviething;
    }

    useEffect(() => {
        //call NASA API the moment page loads. 
        axios.get(MongoURI).then(
            (response) => {
                console.log(response.data);
                setPost(response.data);
                // console.log(post.movies)
            }
        );
    }, []);

    const outputWhenNull =
        (

            <div className="text-center hero my-5">
                {/* <img className="mb-3 app-logo" src={logo} alt="React logo" width="120" /> */}
                <h1 className="mb-4">{string1}</h1>
                <h1 className="mb-4">{stringloading}</h1>
                {/* <img src={localAntEaterImage} className="img-fluid" alt="..."></img> */}
            </div>
        );

    if (!post) {
        return outputWhenNull;
    }
    const outputWithNASARESPONSE =
        (

            <div className="text-center hero my-5">
                {/* <img className="mb-3 app-logo" src={logo} alt="React logo" width="120" /> */}
                <h1 className="mb-4">{string1}</h1>
                <h1 className="mb-4">{stringloaded}</h1>
                <h4>Car Name : {post.name}</h4>
                <br></br>
                <p>Driver : {post.driver}</p>
                {/* <p>hello</p> */}
                <hr></hr>


            </div>
        );
    //if we are here, that means, post has been update
    //and the API call was successfull
    return outputWithNASARESPONSE;
}


export default GetSomethingMongo;
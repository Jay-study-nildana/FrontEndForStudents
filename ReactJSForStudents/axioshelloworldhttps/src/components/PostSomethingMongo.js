
// import localImageDiamondMoon from "./DiamondMoonWSMALL.jpg";
import axios from "axios";
import { useState, useEffect } from 'react';
import React from "react";

let string1 = `This is coming from PostSomethingMongo Component`;
let stringloading = `loading........`;
let stringloaded = `MONGO DB DATA IS HERE FROM AXIOS`;
let listofmovies = `Here are all the movies `;
let MongoURI = 'http://localhost:8081/mongodb/searchformovie'
let stringclickButton = `click the button to load data`

const PostSomethingMongo = () => {

    const [post, setPost] = useState(null);
    const [quoteContent, setquoteContent] = useState('');
    const [quoteContentMimic, setquoteContentMimic] = useState('');
    const [loadmessage, setloadmessage] = useState(stringclickButton)

    function callNASAAPI() {
        //call NASA API the moment page loads. 
        setloadmessage(stringloading);
        let postObject = {
            termone : quoteContent
        }
        console.log(postObject);
        // axios.get(loadApodURI).then(
        //     (response) => {
        //         console.log(response.data);
        //         setPost(response.data);
        //         setloadmessage(stringloaded);
        //     }
        // );

        axios.post(MongoURI,
            postObject
        ).then(
            (response) => {
                console.log(response.data);
                setPost(response.data);
                setloadmessage(stringloaded);
            }
        )
    }

    function MovieItem(props) {
        // console.log(props);
        const moviething = (
            <div>
                <h4>Movie ID : {props.movie._id}</h4>
                <br></br>
                <p>plot : {props.movie.plot}</p>
                {/* <p>votes : {props.movie.imdb.votes}</p>
                <p>id : {props.movie.imdb.id}</p>
                <p>hello</p> */}
                <hr></hr>
            </div>
        );
        return moviething;
    }

    function clearEverything() {
        console.log(`input has been cleared`);
        setquoteContent(``);
    }

    function resetView() {
        setPost(null);
        setloadmessage(stringclickButton);
    }

    useEffect(() => {
        //call NASA API the moment page loads. 
        // axios.get(MongoURI).then(
        //     (response) => {
        //         console.log(response.data);
        //         //setPost(response.data);
        //         // console.log(post.movies)
        //     }
        // );

        console.log(quoteContent);
        // setquoteContentMimic(quoteContent);
        // console.log(quoteContentMimic);

        if(quoteContent.length === 0)
        {
            let someMessage = `You have not yet typed anything. Type something`;
            setquoteContentMimic(someMessage);
        }        
    }, [quoteContent,quoteContentMimic]);

    const outputWhenNull =
        (

            <div className="text-center hero my-5">
                {/* <img className="mb-3 app-logo" src={logo} alt="React logo" width="120" /> */}
                <h1 className="mb-4">{string1}</h1>
                <h1 className="mb-4">{loadmessage}</h1>
                {/* <img src={localAntEaterImage} className="img-fluid" alt="..."></img> */}
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
                    <br></br>
                    <div>
                        {/* <Button onClick={clearEverything}>Clear Everything</Button> */}
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={clearEverything}
                        >clear Everything
                        </button>
                        <button className="btn btn-primary" onClick={callNASAAPI}>call API</button>
                    </div>
                </div>
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
                {/* <img src={post.hdurl} className="img-fluid" alt="..."></img>
        <h6 className="mb-4">{post.explanation}</h6> */}
                <h6 className="mb-4">{listofmovies} about {quoteContent}</h6>
                <button className="btn btn-primary" onClick={resetView}>reset view</button>

                {post.movies.map((singlemovieitem) =>
                    <MovieItem key={singlemovieitem._id} movie={singlemovieitem} />
                )}

            </div>
        );
    //if we are here, that means, post has been update
    //and the API call was successfull
    return outputWithNASARESPONSE;
}


export default PostSomethingMongo;
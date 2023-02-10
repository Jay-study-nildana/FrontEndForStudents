//ListMovies.js

import { useState } from "react";
import { useEffect } from "react";
import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import batmanData from "../sampledata/batmandata.js";
import movieData from "../sampledata/moviedbdata.js";
import {Link} from "react-router-dom";


const ListMovies = () => {

    const [batmanDataObject, setbatmanDataObject] = useState({});
    const [movieDataObject, setmovieDataObject] = useState({});
    const [imageURLBase, setimageURLBase] = useState("");

    useEffect(() => {
        console.log("ListMovies.js useEffect");

        //if I don't put this check here, 
        //then the batman data will keeping loading infinitely. 

        if (batmanDataObject === {} || batmanDataObject.length === undefined) {
            //initialize the batmanData object
            batmanData.constructor()
            //updated collection of batman data with id
            batmanData.addId();
            // console.log(batmanData);
            // console.log(batmanData.constructor());
            // console.log(batmanData.getBatmanData());
            // console.log(batmanData.getBatmanDataById(1));

            setbatmanDataObject(batmanData.getBatmanData());
            console.log(batmanDataObject);
        }
        else {
            console.log("batmanDataObject is not empty");
            console.log(batmanDataObject);
            console.log(batmanDataObject.length);
        }

        if (movieDataObject === {} 
            || movieDataObject.length === undefined
            || imageURLBase === "") {
            //initialize the batmanData object
            movieData.constructor()
            //updated collection of batman data with id
            //batmanData.addId();
            // console.log(batmanData);
            // console.log(batmanData.constructor());
            // console.log(batmanData.getBatmanData());
            // console.log(batmanData.getBatmanDataById(1));

            setmovieDataObject(movieData.getMovieData());
            setimageURLBase(movieData.getMovieImageBaseURL());
            console.log(movieDataObject);
            console.log(imageURLBase);

        }
        else {
            console.log("movieDataObject is not empty");
            console.log(movieDataObject);
            console.log(movieDataObject.length);
            console.log(imageURLBase);
        }


    }, [batmanDataObject,movieDataObject,imageURLBase]);

    const IndividualItemBatman = ({ item }) => (
        <div>
            <li key={item.id}>{item.id} {item.name}</li>
        </div>
    );

    const ShowBatmanList = () => (

        <div>
            {movieDataObject.map ?
                <div>
                    <h3>Accordion List</h3>
                    <Accordion defaultActiveKey="0">
                        {movieDataObject.map((item) => (
                            <Accordion.Item eventKey={item.id}>
                                <Accordion.Header> {item.original_title}</Accordion.Header>
                                <Accordion.Body>
                                    <div className="container-fluid text-center">
                                    <h2>{item.original_title}</h2>
                                    <hr></hr>
                                    </div>
                                    <div className="row">
        <div className="col"></div>
        <div className="col">
        <img src={imageURLBase+item.poster_path} alt="poster"
                                    className="img-fluid"></img>
        </div>
        <div className="col"></div>
      </div>
      <hr></hr>
      <div>
        <p>{item.overview}</p>
        <Link to={`/listmovies/${item.id}`}>{item.original_title}'s Page</Link>
      </div>
                                    
                                </Accordion.Body>
                            </Accordion.Item>
                        ))}
                    </Accordion>
                    {/* <h3>Batman List basic</h3>
            <ul>
                {batmanDataObject.map((item) => (
                    // <li key={item.id}>{item.id}. {item.name}</li>
                    <IndividualItemBatman item={item} />
                ))}
            </ul> */}

                </div>
                : <div>batmanData is false</div>}

        </div>
    );

    return (
        <div className="container-fluid text-center">
            <h1>Batman List with Functions feeding data</h1>
            <p className="lead">
                getting a simple array object from a function in a separate file
            </p>
            <hr></hr>
            <ShowBatmanList />

        </div>
    );
};

export default ListMovies;

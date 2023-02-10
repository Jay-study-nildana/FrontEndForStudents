//MovieDetailsPage.js
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import movieData from "../sampledata/moviedbdata.js";
import ProgressBar from 'react-bootstrap/ProgressBar';
import Carousel from 'react-bootstrap/Carousel';

const MovieDetailsPage = ({match}) => {

    //get URI parameters
    let params = useParams();
    let progressBarValue = 0;
    let popularity_ReferenceValue = 230;//The batman is roughly this popular

    const [movieDataObject, setmovieDataObject] = useState({});
    const [imageURLBase, setimageURLBase] = useState("");
    const [singleMovieData, setsingleMovieData] = useState({});
    const [moviePopularity, setmoviePopularity] = useState(0);

    function calculateprogressBarValue() {

        progressBarValue = singleMovieData.popularity/popularity_ReferenceValue * 100;
        progressBarValue = roundToTwo(progressBarValue);
        setmoviePopularity(progressBarValue);
    }

    //if I don't use this
    //then the math percentage decimal will be too long
    function roundToTwo(num) {

        return +(Math.round(num + "e+2") + "e-2");
    
    }

    useEffect(() => {
        console.log("MovieDetailsPage.js useEffect");

        if (movieDataObject === {} 
            || movieDataObject.length === undefined
            || imageURLBase === ""
            || singleMovieData === {}) {
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
            setsingleMovieData(movieData.getMovieDataById(params.movieid));
            // console.log(movieDataObject);
            // console.log(imageURLBase);
            // console.log(singleMovieData);

        }
        else {
            console.log("movieDataObject is not empty");
            console.log(movieDataObject);
            console.log(movieDataObject.length);
            console.log(imageURLBase);
            console.log(singleMovieData);

            calculateprogressBarValue();

            console.log("moviePopularity: " + moviePopularity);
        }        
    }, [movieDataObject,imageURLBase,singleMovieData,moviePopularity]);

return (
    <div className="container-fluid text-center">
            <h1>Movie Details Page</h1>
            <p className="lead">
                for movie with id : {params.movieid}
            </p>
            <Link to="/listmovies">Return to Movies</Link>
            <hr></hr>
            <h2>{singleMovieData.original_title}</h2>
            <img src={imageURLBase+singleMovieData.poster_path} alt="poster"
                                    className="img-fluid"></img>
            <p>{singleMovieData.overview}</p>
            <img src={imageURLBase+singleMovieData.backdrop_path} alt="poster"
                                    className="img-fluid"></img>
            <hr></hr>
            <ProgressBar striped  variant="warning" 
            now={moviePopularity} 
            label={`Popularity ${moviePopularity} %`}
            />
            <hr></hr>
            <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={imageURLBase+singleMovieData.backdrop_path}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>{`release date`}</h3>
          <p>{singleMovieData.release_date}</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={imageURLBase+singleMovieData.backdrop_path}
          alt="Second slide"
        />

        <Carousel.Caption>
            <h3>{`vote average`}</h3>
          <p>{singleMovieData.vote_average}</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={imageURLBase+singleMovieData.backdrop_path}
          alt="Third slide"
        />

        <Carousel.Caption>
        <h3>{`vote count`}</h3>
          <p>{singleMovieData.vote_count}</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
            <hr></hr>
            <Link to="/listmovies">Return to Movies</Link>
    </div>
);

}

export default MovieDetailsPage;
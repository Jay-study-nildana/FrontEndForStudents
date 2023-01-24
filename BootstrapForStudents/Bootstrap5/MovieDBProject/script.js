console.log(`I am Batman`);

//initial load

let moviesearchinputbox = document.getElementById(`moviesearchinputbox`);
let searchclickbutton = document.getElementById(`searchclickbutton`);

let imgfromnasafetch = document.getElementById(`sample_movieimage`);
let movietitle = document.getElementById(`movietitle`);

function LetsCallAPIFetchMovieDBwithMovieID(movieid) {
  console.log(`Entering  LetsCallAPIFetchMovieDBwithMovieID ${movieid}`);
  //show the loading image.
  imgfromnasafetch.src = `images/mike-van-den-bos-jf1EomjlQi0-unsplash.jpg`;

  let baseURL = `https://api.themoviedb.org/3/movie/${movieid}?api_key=${movieAPIkey}`;
  // let extraString = `&language=en-US&query=${query}&page=1&include_adult=false`

  fetch(baseURL) //waits for the api to resolve and returns a response
    .then((response) => response.json()) //convert response to json, wait for conversion to happen
    .then((data) => {
      //wait for the data to arrive as json
      console.log(`Recieved stuff using the fetch API`);
      console.log(data); //do whatever you want with it.
      UpdateMovieInformation(data);
    })
    .catch((error) => {
      console.log(error);
    });

  console.log(`Leaving  LetsCallAPIFetchMovieDBwithMovieID`);
}

function LetsCallAPIFetchMovieDBImagesWithMovieID(movieid) {
  console.log(`Entering  LetsCallAPIFetchMovieDBImagesWithMovieID`);
  //show the loading image.
  // imgfromnasafetch.src = `images/mike-van-den-bos-jf1EomjlQi0-unsplash.jpg`;

  let baseURL = `https://api.themoviedb.org/3/movie/${movieid}/images?api_key=${movieAPIkey}`;

  fetch(baseURL) //waits for the api to resolve and returns a response
    .then((response) => response.json()) //convert response to json, wait for conversion to happen
    .then((data) => {
      //wait for the data to arrive as json
      console.log(`Recieved stuff using the fetch API`);
      console.log(data); //do whatever you want with it.
      UpdateImageInformation(data);
    })
    .catch((error) => {
      console.log(error);
    });

  console.log(`Leaving  LetsCallAPIFetchMovieDBImagesWithMovieID`);
}

function LetsCallAPIFetchMovieDBWithQuery(query) {
    console.log(`Entering  LetsCallAPIFetchMovieDBWithQuery`);
    //show the loading image.
    imgfromnasafetch.src = `images/mike-van-den-bos-jf1EomjlQi0-unsplash.jpg`;
  
    //https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&query=avengers&page=1&include_adult=false
    let baseURL = `https://api.themoviedb.org/3/search/movie?api_key=${movieAPIkey}`;
    let extraString = `&language=en-US&query=${query}&page=1&include_adult=false`;
  
    fetch(baseURL + extraString) //waits for the api to resolve and returns a response
      .then((response) => response.json()) //convert response to json, wait for conversion to happen
      .then((data) => {
        //wait for the data to arrive as json
        console.log(`Recieved stuff using the fetch API`);
        console.log(data); //do whatever you want with it.
  
        //as of now, just showing the first movie
        if (data.results[0]) {
          // UpdateMovieInformation(data.results[0]);
          LetsCallAPIFetchMovieDBwithMovieID(data.results[0].id);
        } else {
          //show sample movie.
          sampleMovieObject.original_title =
            sampleMovieObject.original_title +
            "no results. showing default movie";
          UpdateMovieInformation(sampleMovieObject);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  
    console.log(`Leaving  LetsCallAPIFetchMovieDBWithQuery`);
  }

function UpdateMovieInformation(movieObject) {
  console.log(`entered UpdateMovieInformation`);
  console.log(movieObject);

  //get all the dom elements.
  let movietitle = document.getElementById(`sample_movietitle`);
  let sample_genrelist = document.getElementById(`sample_genrelist`);
  let sample_productioncompanies = document.getElementById(
    `sample_productioncompanies`
  );
  let sample_movieimage = document.getElementById(`sample_movieimage`);
  let sample_plotsummary = document.getElementById(`sample_plotsummary`);
  let sample_release_date = document.getElementById(`sample_release_date`);
  let sample_revenue = document.getElementById(`sample_revenue`);
  let sample_runtime = document.getElementById(`sample_runtime`);
  let sample_vote_average = document.getElementById(`sample_vote_average`);
  let sample_tagline = document.getElementById(`sample_tagline`);
  let moviewebsitehref = document.getElementById(`moviewebsitehref`);

  //update dom elements with data
  movietitlestring = movieObject.original_title;
  // movietitlestring += " (local JSON object)";
  movietitle.innerHTML = movietitlestring;
  sample_movieimage.src = imageURLBase + movieObject.backdrop_path;
  moviewebsitehref.href = movieObject.homepage;

  //update plot summary
  sample_plotsummary.innerHTML = movieObject.overview;

  //update key points
  sample_release_date.innerHTML = movieObject.release_date + " (release date)";
  sample_revenue.innerHTML = movieObject.revenue + " (box office)";
  sample_runtime.innerHTML = movieObject.runtime + " (running time)";
  sample_vote_average.innerHTML = movieObject.vote_average + " (movie rating)";

  sample_tagline.innerHTML = movieObject.tagline;

  //empty all children first
  while (sample_genrelist.hasChildNodes()) {
    sample_genrelist.removeChild(sample_genrelist.firstChild);
  }

  //show genre list.
  for (var i = 0; i < movieObject.genres.length; i++) {
    console.log(movieObject.genres[i]);
    const node = document.createElement("li");
    node.className = "list-group-item";
    // const textnode = document.createTextNode("Water");
    const textnode = document.createTextNode(movieObject.genres[i].name);
    node.appendChild(textnode);
    sample_genrelist.appendChild(node);
  }

  //empty all children first
  while (sample_productioncompanies.hasChildNodes()) {
    sample_productioncompanies.removeChild(
      sample_productioncompanies.firstChild
    );
  }

  //show production list
  for (var i = 0; i < movieObject.production_companies.length; i++) {
    console.log(movieObject.genres[i]);
    const node = document.createElement("li");
    node.className = "list-group-item";
    // const textnode = document.createTextNode("Water");
    const textnode = document.createTextNode(
      movieObject.production_companies[i].name
    );
    node.appendChild(textnode);
    sample_productioncompanies.appendChild(node);
  }

  //now get all the images

  LetsCallAPIFetchMovieDBImagesWithMovieID(movieObject.id);

  console.log(`leaving UpdateMovieInformation`);
}

function UpdateImageInformation(sampleMovieImagesObject) {
  console.log(`entered UpdateImageInformation`);
  //first get two wide backdrop images for the slider.
  let image_backdrops_one =
    imageURLBase + sampleMovieImagesObject.backdrops[1].file_path;
  let image_backdrops_two =
    imageURLBase + sampleMovieImagesObject.backdrops[2].file_path;

  console.log(image_backdrops_one);
  console.log(image_backdrops_two);

  let cocoensliderone = document.getElementById(`cocoensliderone`);
  let cocoenslidertwo = document.getElementById(`cocoenslidertwo`);

  cocoensliderone.src = image_backdrops_one;
  cocoenslidertwo.src = image_backdrops_two;

  console.log(`sliders are done`);

  //now, let's put rest of the backdrops in the slider.
  let swiperwrappermain = document.getElementById(`swiperwrappermain`);

  //empty all children first
  while (swiperwrappermain.hasChildNodes()) {
    swiperwrappermain.removeChild(swiperwrappermain.firstChild);
  }

  //lets stop at 10 images
  let stoppingat = 10;
  for (
    var i = 3;
    i < sampleMovieImagesObject.backdrops.length && i < stoppingat;
    i++
  ) {
    const nodeDiv = document.createElement("div");
    nodeDiv.className = "swiper-slide";
    const nodeImage = document.createElement("img");
    nodeImage.className = "img-fluid";
    nodeImage.src =
      imageURLBase + sampleMovieImagesObject.backdrops[i].file_path;
    nodeDiv.appendChild(nodeImage);
    swiperwrappermain.appendChild(nodeDiv);
    // console.log(i);
  }
  console.log(`leaving UpdateImageInformation`);
}

function searchformovie() {
  console.log(`entered searchformovie`);

  let inputmoviequery = moviesearchinputbox.value;

  moviesearchinputbox.value = "";
  console.log(`searching for ${inputmoviequery}`);

  LetsCallAPIFetchMovieDBWithQuery(inputmoviequery);

  console.log(`leaving searchformovie`);
}

// Execute a function when the user presses a key on the keyboard
moviesearchinputbox.addEventListener("keypress", function (event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    searchclickbutton.click();
  }
});

function searchforrandommovie() {
  console.log(`Leaving  searchforrandommovie`);
  let listOfRandomMovieStuff = [
    "basic",
    "baywatch",
    "indiana jones",
    "phantom",
    "mission impossible",
    "joker",
    "batman",
    "tomb raider",
  ];

  // Returns a random integer from 0 to 9:

  let randomNumber = Math.floor(Math.random() * listOfRandomMovieStuff.length);

  let inputmoviequery = listOfRandomMovieStuff[randomNumber];

  moviesearchinputbox.value = inputmoviequery;

  console.log(inputmoviequery);

  console.log(`Leaving  LetsCallAPIFetchMovieDBWithQuery`);

  LetsCallAPIFetchMovieDBWithQuery(inputmoviequery);
}

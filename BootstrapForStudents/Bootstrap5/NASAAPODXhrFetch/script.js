console.log(`I am Batman`);

//TODO : I am not using Camel Case. 
//TODO : variable names are not meaningful.

//let's do an API call


let ptagapiline4 = document.getElementById(`apiline4`);
let ptagapiline5 = document.getElementById(`apiline5`);
let ptagapiline6 = document.getElementById(`apiline6`);
let imgfromnasa = document.getElementById(`imgfromnasa`);

function apiLoad() {

    let apikeyfromnasa = `JjP84CKefxzmg2fyAvN4zWsRyAAqg1nzrXvHdtc6`;
    let url = `https://randomstuffapizeropoint4.azurewebsites.net/api/UserNotLoggedIn/GetHoldOfthem`;
    // let url2 = `https://api.nasa.gov/planetary/apod?api_key=JjP84CKefxzmg2fyAvN4zWsRyAAqg1nzrXvHdtc6`;
    let url2 = `https://api.nasa.gov/planetary/apod?api_key=${apikeyfromnasa}`;
    console.log(url);
    console.log(url2);

    // Create new promise with the Promise() constructor;
    // This has as its argument a function
    // with two parameters, resolve and reject
    return new Promise(function (resolve, reject) {
        // Standard XHR to load an image
        var request = new XMLHttpRequest();
        request.open('GET', url2);
        request.responseType = 'json';
        //for the sake of CORS
        request.setRequestHeader("Access-Control-Allow-Origin", "*");
        request.setRequestHeader("Content-Type", "application/json");
        // When the request loads, check whether it was successful
        request.onload = function () {
            if (request.status === 200) {
                // If successful, resolve the promise by passing back the request response
                resolve(request.response);
            } else {
                // If it fails, reject the promise with a error message
                reject(Error('Image didn\'t load successfully; error code:' + request.statusText));
            }
        };
        request.onerror = function () {
            // Also deal with the case when the entire request fails to begin with
            // This is probably a network error, so reject the promise with an appropriate message
            reject(Error('There was a network error.'));
        };
        // Send the request
        request.send();
    });
}

//call the api function
function LetsCallAPI() {

    console.log(`Entering  LetsCallAPI`);
    //show the loading image.
    imgfromnasa.src = `images/mike-van-den-bos-jf1EomjlQi0-unsplash.jpg`;
    apiLoad().then(function (response) {
        // The first runs when the promise resolves, with the request.response
        // specified within the resolve() method.
        // var imageURL = window.URL.createObjectURL(response);
        // myImage.src = imageURL;
        // body.appendChild(myImage);
        console.log(`in the response function now. API call has finished`);
        console.log(response);
        console.log(`hope you are seeing the json object before this line.`)

        ptagapiline4.innerHTML = response.date;
        ptagapiline5.innerHTML = response.explanation;
        ptagapiline6.innerHTML = `API from NASA loaded. Thank you`;
        imgfromnasa.src = response.hdurl;

        // The second runs when the promise
        // is rejected, and logs the Error specified with the reject() method.
    }, function (Error) {
        console.log(Error);
    });

    console.log(`Leaving  LetsCallAPI`);
}



let ptagapiline4fetch = document.getElementById(`apiline4fetch`);
let ptagapiline5fetch = document.getElementById(`apiline5fetch`);
let ptagapiline6fetch = document.getElementById(`apiline6fetch`);
let imgfromnasafetch = document.getElementById(`imgfromnasafetch`);

function LetsCallAPIFetch() {

    console.log(`Entering  LetsCallAPIFetch`);
    //show the loading image.
    imgfromnasafetch.src = `images/mike-van-den-bos-jf1EomjlQi0-unsplash.jpg`;

    let apikeyfromnasa = `JjP84CKefxzmg2fyAvN4zWsRyAAqg1nzrXvHdtc6`;
    let url = `https://randomstuffapizeropoint4.azurewebsites.net/api/UserNotLoggedIn/GetHoldOfthem`;
    // let url2 = `https://api.nasa.gov/planetary/apod?api_key=JjP84CKefxzmg2fyAvN4zWsRyAAqg1nzrXvHdtc6`;
    let url2 = `https://api.nasa.gov/planetary/apod?api_key=${apikeyfromnasa}`;
    console.log(url);
    console.log(url2);    

    fetch(url2). //waits for the api to resolve and returns a response
        then(response => response.json())  //convert response to json, wait for conversion to happen
        .then(data => { //wait for the data to arrive as json
            console.log(`Recieved stuff using the fetch API`);
            console.log(data); //do whatever you want with it.
            apiline4fetch.innerHTML = data.date;
            apiline5fetch.innerHTML = data.explanation;
            apiline6fetch.innerHTML = `API from NASA loaded. Thank you`;
            imgfromnasafetch.src = data.hdurl;            
        })
        .catch((error) => {
            console.log(error)
          });

    console.log(`Leaving  LetsCallAPIFetch`);
}
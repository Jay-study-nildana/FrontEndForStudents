console.log(`I am Batman`);

//TODO : I am not using Camel Case. 
//TODO : variable names are not meaningful.

let ptagapiline4fetch = document.getElementById(`apiline4fetch`);
let ptagapiline5fetch = document.getElementById(`apiline5fetch`);
let ptagapiline6fetch = document.getElementById(`apiline6fetch`);
let imgfromnasafetch = document.getElementById(`imgfromnasafetch`);

function LetsCallAPIFetch() {

    console.log(`Entering  LetsCallAPIFetch`);
    //show the loading image.
    imgfromnasafetch.src = `images/loading.jpg`;

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
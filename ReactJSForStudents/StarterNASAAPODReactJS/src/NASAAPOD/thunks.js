import {
    loadApodInProgress,
    loadApodSuccess,
    loadApodFailure,
} from './actions';

export const displayAlert = text => () => {
    alert(text);
};


//TODOJAY - can we move this to a json file so we can update all endpoints at once?
let apikeyfromnasa = `JjP84CKefxzmg2fyAvN4zWsRyAAqg1nzrXvHdtc6`;
let loadApodURI = `https://api.nasa.gov/planetary/apod?api_key=${apikeyfromnasa}`;


export const loadApod = (recieved) => async (dispatch, getState) => {
    console.log(`Thunking in loadApod`);
    const requesttype = 'GET';
    console.log(recieved);
    try {
        dispatch(loadApodInProgress());
        const response = await fetch(
                        loadApodURI,
                        {
                            method: requesttype,
                            headers: {
                                'Content-Type': 'application/json'
                              },
                        }
                        );
        const apod = await response.json();
        console.log(`response shown from inside thunk before dispatch`)
        console.log(apod);
        dispatch(loadApodSuccess(apod));
    } catch (e) {
        dispatch(loadApodFailure());
        dispatch(displayAlert(e));
    }
}
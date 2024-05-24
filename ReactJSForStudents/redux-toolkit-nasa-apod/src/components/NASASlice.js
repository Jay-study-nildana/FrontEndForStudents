//this is the reducer file

//this should be linked to the main redux store, store.js

//and it should be used in the Text component.

//NASASlice.js

import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

let apikeyfromnasa = `JjP84CKefxzmg2fyAvN4zWsRyAAqg1nzrXvHdtc6`;
let loadApodURI = `https://api.nasa.gov/planetary/apod?api_key=${apikeyfromnasa}`;
const requesttype = 'GET';
const defaultNASAObject = {
  copyright : "nothing yet",
  msg : "showing a default image",
  url : "https://sandkdesignstudioin.files.wordpress.com/2022/10/showcaseoneoctober13thwatermarkseta.jpg",
  date : "2021-10-13",
  explanation : "nothing yet",
  title : "nothing yet"
}

function fetchNASAAPODAPIdata() {
  console.log(`reached fetchNASAAPODAPIdata`)
  return fetch(
    loadApodURI,
    {
        method: requesttype,
        headers: {
            'Content-Type': 'application/json'
          },
    }
    )
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      return data;
    })
  .catch((error) => {
    console.error("Error:", error);
  });
}

//we need the initial state

const initialState = {
  value: "Hello World",
  status: "idle",
  nasaObject: defaultNASAObject
};

//the async thunks goes here.

//fetch call with thunk

export const fetchNASAAPODAPIdataAsync = createAsyncThunk(
  "nasa/fetchNASAAPODAPIdata",
  async () => {
    const response = await fetchNASAAPODAPIdata();
    // The value we return becomes the `fulfilled` action payload
    console.log(response);
    return response;
  }
);



//then we need the reducer. the main component that is exported
//to the view components

//payload contains the data that is 'dispatched' from the components

export const NASASlice = createSlice({
  name: "nasa",
  initialState,
  reducers: {
    resetNasa: (state, action) => {
      state.nasaObject = defaultNASAObject;
    }
  },

  //add an extra reducer

  extraReducers: (builder) => {
    builder
      //add the extra reducer for the NASA APOD API call

      .addCase(fetchNASAAPODAPIdataAsync.pending, (state) => {
        state.status = "loading";
        state.nasaObject.msg = "loading the image from the NASA APOD API";
      })
      .addCase(fetchNASAAPODAPIdataAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.nasaObject = action.payload;
        state.nasaObject.msg = "showing the image from the NASA APOD API";
        //state.value = action.payload;
      });
  }
});

//then we need the action

export const { resetNasa } = NASASlice.actions;

//then we need the selector
//this is how the components get the new, updated value
export const selectnasaObject = (state) => state.nasa.nasaObject;

//then we need the export

export default NASASlice.reducer;

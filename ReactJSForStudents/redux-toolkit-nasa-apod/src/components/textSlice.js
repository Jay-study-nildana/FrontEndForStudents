//textSlice.js

//this is the reducer file

//this should be linked to the main redux store, store.js

//and it should be used in the Text component.

//textSlice.js

import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

// A mock function to mimic making an async request for data
//in a real project
//1. this can be a web api call to a 3rd party service.
//1. this can be a call to the mongo db database

function fetchText(text = "empty text") {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: text }), 500)
  );
}

//we need the initial state

const initialState = {
  value: "Hello World",
  status: "idle"
};

//the async thunks goes here.

export const fetchTextAsync = createAsyncThunk(
  "text/fetchText",
  async (text) => {
    const response = await fetchText(text);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

//then we need the reducer. the main component that is exported
//to the view components

//payload contains the data that is 'dispatched' from the components

export const textSlice = createSlice({
  name: "text",
  initialState,
  reducers: {
    changeText: (state, action) => {
      let tempString = action.payload;
      if (tempString == null || tempString.length === 0) {
        state.value = "you have entered nothing. try again";
      } else {
        state.value = action.payload;
      }
    },
    resetText: (state, action) => {
      state.value = "this is default text";
    }
  },

  //add an extra reducer

  extraReducers: (builder) => {
    builder
      .addCase(fetchTextAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTextAsync.fulfilled, (state, action) => {
        state.status = "idle";
        let tempString = action.payload;
        if (tempString == null || tempString.length === 0) {
          state.value = "you have entered nothing. try again";
        } else {
          state.value = action.payload;
        }
        //state.value = action.payload;
      });
  }
});

//then we need the action

export const { changeText, resetText } = textSlice.actions;

//then we need the selector
//this is how the components get the new, updated value

export const selectText = (state) => state.text.value;
export const selectstatus = (state) => state.text.status;

//then we need the export

export default textSlice.reducer;

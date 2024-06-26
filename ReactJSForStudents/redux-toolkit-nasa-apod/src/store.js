//store.js

//this is the main store file. this will have all the 'reducers' that are created in the project.

//usually, you will have one reducer for each component.

import { configureStore } from "@reduxjs/toolkit";
import textReducer from "./components/textSlice";
import nasaReducer from "./components/NASASlice";

export const store = configureStore({
  reducer: {
    text: textReducer,
    nasa: nasaReducer
  }
});

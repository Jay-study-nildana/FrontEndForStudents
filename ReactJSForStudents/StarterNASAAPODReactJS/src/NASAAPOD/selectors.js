import { createSelector } from 'reselect';

//i am not doing any filtering. so this is simply passing 
//whatever is coming in.

//note here. 'apod' is the name of the component from reducers.js

export const getApod = state => state.apod.data;
export const getApodLoading = state => state.apod.isLoading;
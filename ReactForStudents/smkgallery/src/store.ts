import { ArtSingleObject } from "../src/Interfaces/ArtSingleObject";
import { SingleArtwork } from "../src/Interfaces/SingleArtwork";
import { SearchResults } from "../src/Interfaces/SearchResults";
import { Store, createStore, combineReducers } from "redux";

//TypeScript types for the state of our store:

//Note about artobjectviewing with two type definitions
//the SMK api returns different things for different search returns
//As of now, I am yet to decide on the final structure of the art response

interface ArtObjectState {
  readonly loading: boolean;
  readonly artobjectviewing: ArtSingleObject | SingleArtwork | null;
}

interface SearchResultsState {
  readonly loadingSearchResults: boolean;
  readonly searchResultsdata: SearchResults | null;
}

export interface AppState {
  readonly artobject: ArtObjectState;
  readonly searchresults: SearchResultsState;
}

//define the initial state for the store
const initialArtObjectState: ArtObjectState = {
  loading: false,
  artobjectviewing: null,
};

const initialSearchResultsState: SearchResultsState = {
  loadingSearchResults: false,
  searchResultsdata: null,
};

//redux related to SearchResults

export const GETTINGSEARCHRESULTS = "GettingSearchResults";
export const GOTSEARCHRESULTS = "GotSearchResults";

export const gettingSearchResultsAction = () =>
  ({
    type: GETTINGSEARCHRESULTS,
  } as const);

export const gotSearchResultsAction = (
  searchResultsObject: SearchResults | null
) =>
  ({
    type: GOTSEARCHRESULTS,
    searchResultsObject: searchResultsObject,
  } as const);

type searchResultsRelatedActions = 
  | ReturnType<typeof gettingSearchResultsAction>
  | ReturnType<typeof gotSearchResultsAction>
  
const searchResultsReducer = (
  state = initialSearchResultsState,
  action: searchResultsRelatedActions
) => {
  switch (action.type) {
    case GETTINGSEARCHRESULTS : {
      return {
        ...state,
        searchResultsdata : null,
        loadingSearchResults : true,
      };
    }
    case GOTSEARCHRESULTS : {
      return {
        ...state,
        searchResultsdata : action.searchResultsObject,
        loadingSearchResults : false,
      }
    }
  }
  return state;
};  

//redux related to ArtSingleObject and SingleArtwork

//action related to loading the artObject
//we will have two actions.
//one for getting the art object
//another when the art object is received.

//the first action
//TODO - why is this even neccessary?
export const GETTINGSINGLEARTOBJECT = "GettingSingleArtObject";
// A const assertion on an object will give it an immutable type.
// It also will result in string properties having a narrow string literal type rather than the wider string type.
//TODO - again, the above comments still dont make sense to me.
export const gettingSingleArtObjectAction = () =>
  ({
    type: GETTINGSINGLEARTOBJECT,
  } as const); //Notice the as const keywords after the object is being returned. This is a TypeScript const assertion.

//the second action

export const GOTSINGLEARTOBJECT = "GotSingleArtObject";
export const gotSingleArtObjectAction = (
  artobject: ArtSingleObject | SingleArtwork | null
) =>
  ({
    type: GOTSINGLEARTOBJECT,
    artobject: artobject,
  } as const);

// here is the reducer things
type ArtRelatedActions =
  | ReturnType<typeof gettingSingleArtObjectAction>
  | ReturnType<typeof gotSingleArtObjectAction>;

const ArtObjectReducer = (
  state = initialArtObjectState,
  action: ArtRelatedActions
) => {
  switch (action.type) {
    case GETTINGSINGLEARTOBJECT: {
      return {
        ...state,
        artobjectviewing: null,
        loading: true,
      };
    }
    case GOTSINGLEARTOBJECT: {
      return {
        ...state,
        artobjectviewing: action.artobject,
        loading: false,
      };
    }
  }
  //NOTE : TypeScript will warn that this is unreachable code.
  //but, if you dont return this, Redux will complain
  //So, please leave it in.
  return state;
};

//create a function that creates the Redux store

const rootReducer = combineReducers<AppState>({
  artobject: ArtObjectReducer,
  searchresults: searchResultsReducer
});

export function configureStore(): Store<AppState> {
  const store = createStore(rootReducer, undefined);
  return store;
}

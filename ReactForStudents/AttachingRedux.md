# Attaching Redux

Redux is an important part of any React app - big or small. Here, I lay down the basic steps.

Please look at included project [smkgallery](smkgallery) to follow along with these steps

- Also read [DeveloperTips.md](DeveloperTips.md)
- Also read [DeveloperThoughts.md](DeveloperThoughts.md)
- Also read [References.md](References.md)
- Also read [BootstrapNotes.md](BootstrapNotes.md)
- Also read [AttachingRedux.md](AttachingRedux.md)
- Also read [EssentialCommands.md](EssentialCommands.md)
- Go back to [README.md](README.md)

# Install Redux

Check [EssentialCommands.md](EssentialCommands.md)

# Step One - Creating the state

Create a new file called Store.ts

create the TypeScript types for the state

define the initial state for the store

    import { ArtSingleObject } from "./Components/SMKGallery/SMKTypes";
    import { Store, createStore, combineReducers } from "redux";

    //TypeScript types for the state of our store:

    interface ArtObjectState {
    readonly loading: boolean;
    readonly SingleArtObject: ArtSingleObject | null;
    }

    export interface AppState {
    readonly SingleArt: ArtObjectState;
    }

    //define the initial state for the store
    const initialArtObjectState: ArtObjectState = {
        loading:false,
        SingleArtObject: null
    }

# Step Two - Creating actions

Create the two actions required to get the data.

//the first action
export const GETTINGSINGLEARTOBJECT = "GettingSingleArtObject";
export const gettingSingleArtObjectAction = () =>
({
type: GETTINGSINGLEARTOBJECT,
} as const);

//the second action

export const GOTSINGLEARTOBJECT = "GotSingleArtObject";
export const gotSingleArtObjectAction = (artobject: ArtSingleObject) =>
({
type: GOTSINGLEARTOBJECT,
artobject: artobject,
} as const);

# Step Three - Creating a reducer

reducer is a function that will make the necessary changes to the state.

create a union type containing all the action types

create the reducer function. The reducer takes in two parameters, one for the current state and another for the action that is being processed.

// here is the reducer things
type ArtRelatedActions =
| ReturnType<typeof gettingSingleArtObjectAction>
| ReturnType<typeof gotSingleArtObjectAction>;

const ArtObjectReducer = (
state = initialArtObjectState,
action: ArtRelatedActions
) => {
switch(action.type){
case GETTINGSINGLEARTOBJECT: {
return {
...state,
singleartobject: null,
loading: true,
}
}
case GOTSINGLEARTOBJECT: {
return {
...state,
singleartobject: action.artobject,
loading: false,
}
}
}
};

# Step Four - Creating the store

create a function that creates the Redux store

const rootReducer = combineReducers<AppState>({
artobject: ArtObjectReducer,
});

export function configureStore(): Store<AppState> {
const store = createStore(rootReducer, undefined);
return store;
}

# Step Fiver - Adding Store to App

import { Provider } from "react-redux";
import { configureStore } from "./store";

const store = configureStore();

function App() {
return (
<Provider store={store}>
<BrowserRouter>
<div>
<Switch>
<Route path="/about">
<AboutPage />
</Route>
<Route path="/otherthings">
<OtherThingsPage />
</Route>
<Route path="/smkgallery">
<LandingPageSMK />
</Route>
<Route path="/">
<LandingPage></LandingPage>
</Route>
</Switch>
</div>
</BrowserRouter>
</Provider>
);
}

# Step Six - Adding Store to Page

import the action functions

connect it to useEffect.

//updating the file to work with redux store
import { useSelector, useDispatch } from "react-redux";
import { getSingleArtObject } from "../SMKGallery/SMKTypes";

import {
gettingSingleArtObjectAction,
gotSingleArtObjectAction,
AppState,
} from "../../store";

const stringThings = require("../../OtherStuff/StringConstants.json");

const LandingPageSMK = () => {
const dispatch = useDispatch();

const singleartobject = useSelector(
(state: AppState) => state.artobject.artobjectviewing
);

const singleartobjectLoading = useSelector(
(state: AppState) => state.artobject.loading
);

React.useEffect(() => {
console.log("Landing Page SMK Rendered");

    //function to load the image data
    const GetTheArtObject = async() => {
      dispatch(gettingSingleArtObjectAction());
      const tempSingleArtObject = await getSingleArtObject();
      dispatch(gotSingleArtObjectAction(tempSingleArtObject));
    };

    //now, call the function and load the image data.
    GetTheArtObject();
    //adding the below line about eslint-disable because eslint keeps expecting dependency for dispatch
    // eslint-disable-next-line

}, []);

# References

1. ASP.NET Core 5 and React - Second Edition By Carl Rippon
1. https://github.com/PacktPublishing/ASP.NET-Core-5-and-React-Second-Edition

# Hire Me

I work as a full time freelance software developer and coding tutor. Hire me at [UpWork](https://www.upwork.com/fl/vijayasimhabr) or [Fiverr](https://www.fiverr.com/jay_codeguy).

# important note

This code is provided as is without any warranties. It's primarily meant for my own personal use, and to make it easy for me share code with my students. Feel free to use this code as it pleases you.

I can be reached through my website - [Jay's Developer Profile](https://jay-study-nildana.github.io/developerprofile)

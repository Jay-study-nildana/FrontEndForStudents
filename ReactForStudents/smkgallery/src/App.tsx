import "./App.css";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import LandingPage from "./Components/Home/LandingPage";
import AboutPage from "./Components/Home/AboutPage";
import OtherThingsPage from "./Components/Others/OtherThingsPage";
import LandingPageSMK from "./Components/SMKGallery/LandingPageSMK";

//this is related to the redux store

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

export default App;

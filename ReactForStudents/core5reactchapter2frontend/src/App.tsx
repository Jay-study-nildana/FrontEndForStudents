// import React from 'react';
//app does not have a logo - TODO - add a logo later
// import logo from './logo.svg';

//we are not using this file anymore.
// import styles from './App.module.css';

//instead of the above module.css file
//we are using this thing
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { fontFamily, fontSize, gray2 } from './Styles';
import React from 'react';

//let's get our Header component here
import { Header } from './Header';
//this is the homepage component
import { HomePage } from './HomePage';

//lets get all the route related things
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { SearchPage } from './SearchPage';
import { SignInPage } from './SignInPage';
import { NotFoundPage } from './NotFoundPage';

import { QuestionPage } from './QuestionPage';

//this is related to the redux store

import { Provider } from 'react-redux';
import { configureStore } from './Store';

//the below thing works with module.css above
// function App() {
//   return (
//     // container is the CSS class name coming from App.css
//     <div className={styles.container}>
//       <Header />
//       <HomePage />
//     </div>
//   );
// }

//LAZY LOADING ROUTES MUST COME AFTER ALL OTHER IMPORTS
//Lazy loading routes
// all the JavaScript for our app is loaded when the app first loads
//pages that are rarely used load the JavaScript for on demand.
//This process is called lazy loading.
//so removing this import
// import { AskPage } from './AskPage';

// The lazy function in React lets us render a dynamic import as a regular component.
// A dynamic import returns a promise for the requested module that is resolved
// after it has been fetched, instantiated, and evaluated.

const AskPage = React.lazy(() => import('./AskPage'));

const store = configureStore();

//this is to use CSS with emotion react
function App() {
  return (
    // we are attaching this store here at the top of App
    // So, everybody below this App, which is the entire App itself,
    // can access this store
    <Provider store={store}>
      <BrowserRouter>
        <div
          css={css`
            font-family: ${fontFamily};
            font-size: ${fontSize};
            color: ${gray2};
          `}
        >
          <Header />
          <Routes>
            <Route path="" element={<HomePage />} />
            <Route path="search" element={<SearchPage />} />
            {/* this code is for without lazy loading */}
            {/* <Route path="ask" element={<AskPage />} /> */}
            {/* the following code is WITH lazy loading */}
            {/* simulate a slow network using developer tools to see this in effect */}
            <Route
              path="ask"
              element={
                <React.Suspense
                  fallback={
                    <div
                      css={css`
                        margin-top: 100px;
                        text-align: center;
                      `}
                    >
                      Loading...
                    </div>
                  }
                >
                  <AskPage />
                </React.Suspense>
              }
            />
            <Route path="signin" element={<SignInPage />} />
            <Route path="questions/:questionId" element={<QuestionPage />} />
            {/* this is for routes that dont exist */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          {/* we dont need this anymore because we are now showing it using routes above */}
          {/* <HomePage /> */}
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

//default App.tsx code below

// function App() {

//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

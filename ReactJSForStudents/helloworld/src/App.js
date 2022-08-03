import logo from './logo.svg';
import './App.css';
import localImageDiamondMoon from "./images/vijayasimha-br-UjhiDnhHBrM-unsplash.jpg";
import ShowImageAgain from "./components/ShowImageAgain";
import ShowSomeStuff from "./components/ShowSomeStuff"

let string1 = `Showing a Local Image From Local Directory`;
let somemessage1 = "keep scrolling for more things";
let someObject1 = {
  name : `Jay`,
  profession : `Freelance Coding Tutor`,
  purpose : `To be my own boss`,
  totalExperience : 10,
  numberOfHoursSleepingEveryDay : 10,
  lifeMotto : `Work as little as possible`
}
let someObject2 = {
  name : `Batman`,
  profession : `SuperHero`,
  purpose : `fight crime`,
  totalExperience : 69,
  numberOfHoursSleepingEveryDay : 0,
  lifeMotto : `I am Batman`
}


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React. 
        </a>
        <p>Note : Scroll down to see a simple image display.</p>
        <p>{somemessage1}</p>
      </header>
      <div className="text-center hero my-5">
        {/* <img className="mb-3 app-logo" src={logo} alt="React logo" width="120" /> */}
        <h1 className="mb-4">{string1}</h1>   
        <img src={localImageDiamondMoon} className="img-fluid" alt="..."></img>
      </div> 
      <div>
        <ShowImageAgain/>
      </div>   
      <div>
        <p>Hello there</p>
        <ShowSomeStuff someObject1 = {someObject1} someObject2 = {someObject2} />
        <p>Hello there End</p>
      </div>      
      <ShowSomeStuff someObject1 = {someObject1} someObject2 = {someObject2} />  
    </div>
  );
}

export default App;

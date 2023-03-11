import './App.css';

//enguerrand-blanchy-3oADW0Ptj8c-unsplash
import GetSomething from './components/GetSomething';
import GetSomethingWithButton from './components/GetSomethingWithButton';
import PostSomethingMongo from './components/PostSomethingMongo';
import localImageDiamondMoon from "./images/enguerrand-blanchy-3oADW0Ptj8c-unsplash.jpg";
import GetSomethingMongo from "./components/GetSomethingMongo";
let string1 = `this is coming from App JS`;



function App() {
  return (
    <div className="App">
      {/* <div className="text-center hero my-5">
        <GetSomething />
      </div> */}
      <div className="text-center hero my-5">
        <GetSomethingWithButton />
      </div>   
      <div className="text-center hero my-5">
        <GetSomethingMongo />
      </div>    
      <div className="text-center hero my-5">
        <PostSomethingMongo />
      </div>             
      <div className="text-center hero my-5">
        {/* <img className="mb-3 app-logo" src={logo} alt="React logo" width="120" /> */}
        <h1 className="mb-4">{string1}</h1>   
        <hr></hr>
        <div className='container-fluid'>
          <img src={localImageDiamondMoon} className="img-fluid" alt="..."></img>  
        </div>
      </div>       
      {/* <header className="App-header">
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
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;

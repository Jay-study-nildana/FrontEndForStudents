import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';


const ShowSomeStuff = () => {

  const [quoteContent, setquoteContent] = useState('');
  const [quoteContentMimic, setquoteContentMimic] = useState('');

  var ls = require('local-storage');

  useEffect(() => {
    console.log(quoteContent);
    setquoteContentMimic(quoteContent);
    console.log(quoteContentMimic);

    if (quoteContent.length === 0) {
      let someMessage = `You have not yet typed anything. Type something`;
      setquoteContentMimic(someMessage);
    }

  }, [quoteContent, quoteContentMimic]);

  function clearEverything() {

    ls.clear();
    console.log(`local storage has been cleared`);

  }

  function addStuff() {
    //foo is the key
    //bar is the value
    //standard key value things that you see in dictionaries
    ls('foo', 'bar');
    ls.set('batman', 'Bruce Wayne');
    ls.set('inputentered',quoteContentMimic);
    // <- 'bar'
    console.log(`added stuff`);
  }

  function showStuff() {
    console.log(ls.get('batman'))
    console.log(ls('foo'));
    console.log(ls.get('inputentered'))
  }

  const stuff = (
    <div className="text-center">
      <p>Here, we are just showing some things.</p>
      <hr></hr>
      <div className="input-group mb-3">
        <div>
          <input
            type="text"
            className="form-control"
            placeholder="enter anything you want"
            onChange={e => setquoteContent(e.target.value)}
            value={quoteContent}
          />
          <p>You are typing : {quoteContentMimic}</p>
        </div>
        <hr></hr>
        <br></br>
        <div>
          {/* <Button onClick={clearEverything}>Clear Everything</Button> */}

        </div>
      </div>
      <div className="text-center">
        <hr></hr>
        <p>Local Storage Things Come Below</p>
        <p>Note : Check console for button click reactions</p>
        <p>TODO : Try showing the values below.</p>
        <p>TODO : Try adding values from an input box</p>
        <button
          type="button"
          className="btn btn-primary"
          onClick={addStuff}
        >
          addStuff
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={showStuff}
        >
          showStuff
        </button>
        <button
            type="button"
            className="btn btn-primary"
            onClick={clearEverything}
          >
            Clear Everything
          </button>        
      </div>
    </div>);
  return stuff;
};

function App() {
  return (
    <div className="App">
      <ShowSomeStuff />
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

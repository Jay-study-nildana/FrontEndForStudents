import { useEffect } from "react"; //automatically trigger things on page load
import { useState } from "react"; //basic state management from react

import "./styles.css";

//here, you can substitute the endpoint to any other api of your choice
const apiurl = `https://official-joke-api.appspot.com/random_joke`;
// i just want to show some emoticons
const loadingsymbols = "🐃🐃🐒🐒🦒🦒";

export default function App() {
  //simple loading indicator
  const [simpleloader, setsimpleloader] = useState("click to load joke");
  const [joketype, setjoketype] = useState("Joke Type");
  const [jokesetup, setjokesetup] = useState("Setup");
  const [jokepunchline, setjokepunchline] = useState("Punchline");
  const [jokeid, setjokeid] = useState("Joke ID");
  const [totaljokes, settotaljokes] = useState(0);

  //function that will load the joke
  async function LoadTheJoke() {
    console.log(`joke about to load`);
    setsimpleloader("joke loading...");
    setjoketype(loadingsymbols);
    setjokepunchline(loadingsymbols);
    setjokesetup(loadingsymbols);
    setjokeid(loadingsymbols);
    const jokeapiresponseobject = await fetch(apiurl);
    const jokedata = await jokeapiresponseobject.json();
    setsimpleloader("click to load joke");
    setjoketype(jokedata.type);
    setjokepunchline(jokedata.setup);
    setjokesetup(jokedata.punchline);
    setjokeid(jokedata.id);
    settotaljokes((c) => c + 1); //lambda function
    console.log(jokedata);
  }

  //function and dependency array
  //as of now, it is empty

  useEffect(function () {
    //call the default advice thing
    //console.log(`useeffect has completed`)
    //if you want to, you could call the joke load function and populate an initial joke
    //I will leave that as an exercise for you to try.
  }, []);

  return (
    <div className="divfirst">
      <header>
        <h1 className="header-h1">Let's show a random joke</h1>
      </header>
      <main>
        <div className="section1">
          <p>{jokepunchline}</p>
          <h3>{jokesetup}</h3>
        </div>

        <div className="section1">
          <p>
            type: {joketype} id: {jokeid}
          </p>
        </div>

        <button onClick={LoadTheJoke}>{simpleloader}</button>

        <p>Total Jokes Read : {totaljokes}</p>
      </main>
      <footer>
        <p>
          code by Jay (Vijayasimha BR).{" "}
          <a href="https://stories.thechalakas.com/">website</a> and{" "}
          <a href="https://github.com/Jay-study-nildana">github</a> and{" "}
          <a href="https://www.youtube.com/channel/UCJJVulg4J7POMdX0veuacXw">
            YouTube Tutorials
          </a>
        </p>
      </footer>
    </div>
  );
}

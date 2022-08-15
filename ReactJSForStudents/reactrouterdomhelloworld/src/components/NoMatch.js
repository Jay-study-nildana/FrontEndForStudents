import localImage from "../images/vijayasimha-br-UjhiDnhHBrM-unsplash.jpg";
let simpleMessage = `OH MY GOD!!!`
let simpleMessage2 = `THIS PAGE DOES NOT EXIST!!!`
let simpleMessage3 = `NOOOOOOOOOOOOOOOOO!!!`

const NoMatch = () => (
    <div className="text-center hero my-5">
        <h1 class="display-1">{simpleMessage}</h1>
        <h1 class="display-3">{simpleMessage2}</h1>
        <p>Go ahead, put any path of your choice, and you will get this, not found, page</p>
        <p>for example, http://localhost:3000/monkey or http://localhost:3000/boldshoot</p>
        <img src={localImage} className="img-fluid" alt="..."></img>
        <h1 class="display-5">{simpleMessage3}</h1>        
  </div>
);

export default NoMatch;
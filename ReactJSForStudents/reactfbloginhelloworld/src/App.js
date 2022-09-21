import './App.css';
import FacebookLogin from 'react-facebook-login';
import { useState } from 'react';
import { useEffect } from 'react';
import fbconfig from './fbconfig.json';

//this is a place holder image, in case, I cannot get the image from facebook.
let sphinximage = `https://commons.wikimedia.org/wiki/File:Jardin_El_Capricho_Sfinxs_at_Plaza_de_los_Emperadores05_cropped.jpg`;

function App() {

  const [loggedin, setloggedin] = useState(false);
  const [userData,setuserData] = useState('');
  const [image,setimage] = useState(sphinximage);

  const responseFacebook = (response) => {  
    console.log(response);
    if(response.email.length >0)
    {
      console.log(`okay, got the email. that means logged in`);
      //loggedintrue = true;
      setloggedin(true);
      setuserData(response);
      if(response.picture.data.url != null)
      {
        setimage(response.picture.data.url);
      }

    }
    else
    {
      console.log(`login failed.`);
    }
  }  

  useEffect(() => {
    console.log(loggedin);
    console.log(userData);
    console.log(image);

  }, [loggedin,userData,image]);  

  function logOut() {
    setloggedin(false);
    console.log(`logOut`);
  }  

  return (
    <div className="App">
      <div className="text-center">
        <p>here, a simple demo of facebook login</p>
        <hr></hr>
        {!loggedin &&
          < FacebookLogin
            appId={fbconfig.appID}
            autoLoad={true}
            fields="name,email,picture"
            callback={responseFacebook}
            cssClass="my-facebook-button-class"
            icon="fa-facebook"
          />        
        }
        {
          loggedin &&         
          <div className="text-center">
            <button
              type="button"
              className="btn btn-primary"
              onClick={logOut}
            >
            logout
            </button>
            <hr></hr>            
            <h3>{userData.name}</h3>
            <p>{userData.email}</p>
            <img src={image} className="img-fluid" alt="..."></img>
            </div>
        }
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

import './App.css';
import GoogleLogin from 'react-google-login';
import { useState } from 'react';
import { useEffect } from 'react';
import googleconfig from './googleconfig.json';
import { gapi } from 'gapi-script';

//this is a place holder image, in case, I cannot get the image from facebook.
let sphinximage = `https://commons.wikimedia.org/wiki/File:Jardin_El_Capricho_Sfinxs_at_Plaza_de_los_Emperadores05_cropped.jpg`;

gapi.load('client:auth2', () => {
  gapi.client.init({
    clientId: googleconfig.appID,
    plugin_name: 'chat',
  });
});

function App() {

  const [loggedin, setloggedin] = useState(false);
  const [userData, setuserData] = useState('');
  const [userDataprofileObj, setuserDataprofileObj] = useState('');
  const [userDatatokenObj, setuserDatatokenObj] = useState('');
  const [image,setimage] = useState(sphinximage);

  const responseGoogle = (response) => {
    console.log(response);
    if (response.googleId.length > 0 && response.profileObj != 'undefined') {
      console.log(`okay, got the googleId. that means logged in`);
      //loggedintrue = true;
      setloggedin(true);
      setuserData(response);
      setuserDataprofileObj(response.profileObj);
      setuserDatatokenObj(response.tokenObj);

      if(response.profileObj.imageUrl!=null)
      {
        setimage(response.profileObj.imageUrl);
      }

      console.log(userData);
      console.log(userDataprofileObj);
      console.log(userDatatokenObj);

    }
    else {
      console.log(`login failed.`);
    }
  }

  useEffect(() => {
    console.log(loggedin);
    console.log(userData);
    console.log(userDataprofileObj);
    console.log(userDatatokenObj);
    console.log(image);

  }, [loggedin, userData, userDataprofileObj, userDatatokenObj,image]);

  function logOut() {
    setloggedin(false);
    console.log(`logOut`);
  }

  return (
    <div className="App">
      {!loggedin &&
        <GoogleLogin
          clientId={googleconfig.appID}
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
      }
      {
        loggedin &&
        userData.profileObj != 'undefined' &&
        <div className="text-center">
          <button
            type="button"
            className="btn btn-primary"
            onClick={logOut}
          >
            logout
          </button>
          <hr></hr>
          <h3>{userDataprofileObj.name}</h3>

          <p>{userDataprofileObj.email}</p>

          <p>{userData.googleId}</p>
          {/* <img src={userData.picture.data.url} className="img-fluid" alt="..."></img> */}
          <img src={image} className="img-fluid" alt="..."></img>
        </div>
      }
      {/* <div className="text-center hero my-5">
        <h1 className="mb-4">{string1}</h1>
        <hr></hr>
        <div className='container-fluid'>
          <img src={localImageDiamondMoon} className="img-fluid" alt="..."></img>
        </div>
      </div> */}
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

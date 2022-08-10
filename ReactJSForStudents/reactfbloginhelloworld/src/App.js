import './App.css';
import FacebookLogin from 'react-facebook-login';
import { useState } from 'react';
import { useEffect } from 'react';
import fbconfig from './fbconfig.json';


function App() {

  const [loggedin, setloggedin] = useState(false);
  const [userData,setuserData] = useState('')

  const responseFacebook = (response) => {  
    console.log(response);
    if(response.email.length >0)
    {
      console.log(`okay, got the email. that means logged in`);
      //loggedintrue = true;
      setloggedin(true);
      setuserData(response);

    }
    else
    {
      console.log(`login failed.`);
    }
  }  

  useEffect(() => {
    console.log(loggedin);
    console.log(userData);

  }, [loggedin,userData]);  

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
        />        }
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
            {/* <img src={userData.picture.data.url} className="img-fluid" alt="..."></img> */}
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

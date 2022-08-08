//ShowImageAgain

import localImageDiamondMoon from "../images/vijayasimha-br-J9Oqt2iQFBU-unsplash.jpg";

let simpleMessage = `This is a image that is loading from a component inside another folder.`

const ShowImageAgain = () => (
    <div className="text-center hero my-5">
        {/* <p>{simpleMessage}</p> */}
        {/* <img className="mb-3 app-logo" src={logo} alt="React logo" width="120" /> */}
        {/* <h1 className="mb-4">{string1}</h1>    */}
        <img src={localImageDiamondMoon} className="img-fluid" alt="..."></img>
  </div>
);

export default ShowImageAgain;
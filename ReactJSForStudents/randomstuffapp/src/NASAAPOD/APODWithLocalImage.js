//APODWithLocalImage.js

import localImageDiamondMoon from "./DiamondMoonWSMALL.jpg";

let string1 = `Showing a Local Image From Local Directory`;

const APODWithLocalImage = () => (
    <div className="text-center hero my-5">
    {/* <img className="mb-3 app-logo" src={logo} alt="React logo" width="120" /> */}
    <h1 className="mb-4">{string1}</h1>   
    <img src={localImageDiamondMoon} className="img-fluid" alt="..."></img>
  </div>
);

export default APODWithLocalImage;
//APODWithDirectURL

let string1 = `Showing a Local Image From Online URL`;
let imageURL = `https://apod.nasa.gov/apod/image/2204/JupiterDarkSpot_JunoTT_3298.jpg`

const APODWithDirectURL = () => (
    <div className="text-center hero my-5">
    {/* <img className="mb-3 app-logo" src={logo} alt="React logo" width="120" /> */}
    <h1 className="mb-4">{string1}</h1>   
    <img src={imageURL} className="img-fluid" alt="..."></img>
  </div>
);

export default APODWithDirectURL;


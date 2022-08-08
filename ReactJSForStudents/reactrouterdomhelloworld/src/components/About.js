import localImage from "../images/vijayasimha-br-iE-3lhWvSPk-unsplash.jpg";
let simpleMessage = `This is a simple and quick project that shows how to use routes in React JS`

const About = () => (
    <div className="text-center hero my-5">
        <blockquote class="blockquote">
        <p>{simpleMessage}</p>
        </blockquote>
        <img src={localImage} className="img-fluid" alt="..."></img>
  </div>
);

export default About;
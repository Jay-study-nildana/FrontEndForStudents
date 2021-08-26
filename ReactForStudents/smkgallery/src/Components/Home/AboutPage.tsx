//AboutPage.tsx
import "../../css/RotatingImage.css";

import Jumbotron from "react-bootstrap/Jumbotron";
import NavbarPage from "../ThemeThings/NavbarPage";
import FooterPage from "../ThemeThings/FooterPage";

const stringThings = require("../../OtherStuff/StringConstants.json");

const AboutPage = () => {
  return (
    <div className="App">
      <NavbarPage></NavbarPage>
      <Jumbotron>
        <h1>{stringThings.About}</h1>
        <p>{stringThings.AboutSentence1}</p>
        <p>{stringThings.AboutSentence2}</p>
        <p>{stringThings.AboutSentence3}</p>
      </Jumbotron>
      <FooterPage></FooterPage>
    </div>
  );
};

export default AboutPage;

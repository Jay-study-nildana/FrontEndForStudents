//LandingPage.tsx
import "../../css/RotatingImage.css";

import Jumbotron from "react-bootstrap/Jumbotron";
import NavbarPage from "../ThemeThings/NavbarPage";
import FooterPage from "../ThemeThings/FooterPage";
const stringThings = require("../../OtherStuff/StringConstants.json");

const LandingPage = () => {
  return (
    <div className="App">
      <NavbarPage></NavbarPage>
      <Jumbotron>
        <h1>{stringThings.ProjectTitle}</h1>
        <p>{stringThings.LandingTitleSentence}</p>
      </Jumbotron>
      <FooterPage></FooterPage>
    </div>
  );
};

export default LandingPage;

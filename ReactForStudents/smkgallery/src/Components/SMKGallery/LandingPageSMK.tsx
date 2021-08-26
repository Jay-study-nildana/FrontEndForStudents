//LandingPageSMK.tsx
import "../../css/RotatingImage.css";
import React from "react";
import { useState } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import NavbarPage from "../ThemeThings/NavbarPage";
import FooterPage from "../ThemeThings/FooterPage";
import Toast from "react-bootstrap/Toast";

import SingleImageShow from "./SingleImageShow";

const stringThings = require("../../OtherStuff/StringConstants.json");

const LandingPageSMK = () => {
  const [showA, setShowA] = useState(true);
  const toggleShowA = () => setShowA(!showA);

  React.useEffect(() => {
    console.log("Landing Page SMK Rendered");

    //adding the below line about eslint-disable because eslint keeps expecting dependency for dispatch
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <NavbarPage></NavbarPage>
      <Jumbotron>
        <h1>{stringThings.SMKLandingTitle}</h1>
        <p>
          {stringThings.SMKLandingDescription}.{" "}
          <a href="https://www.smk.dk/en/article/smk-api/"> (API Source)</a>
        </p>
        <Toast
          style={{
            position: "absolute",
            top: 0,
            right: 0,
          }}
          show={showA}
          onClose={toggleShowA}
        >
          <Toast.Header>
            <small>Developer Note</small>
          </Toast.Header>
          <Toast.Body>
            <p>{stringThings.SMKNudityWarning}</p>
          </Toast.Body>
        </Toast>
          <SingleImageShow></SingleImageShow>
      </Jumbotron>
      <FooterPage></FooterPage>
    </div>
  );
};

export default LandingPageSMK;

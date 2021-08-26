//OtherThingsPage
import "../../css/RotatingImage.css";

import Jumbotron from "react-bootstrap/Jumbotron";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import NavbarPage from "../ThemeThings/NavbarPage";
import FooterPage from "../ThemeThings/FooterPage";
import RotatingHomeThing from "./RotatingHomeThing";
import RotatingImage from "./RotatingImage";
import QuickConsumeAPI from "./QuickConsumeAPI";
import QuickConsumeAPISearchResults from "./QuickConsumeAPISearchResults";

const stringThings = require("../../OtherStuff/StringConstants.json");

const OtherThingsPage = () => {
  return (
    <div className="App">
      <NavbarPage></NavbarPage>
      <Jumbotron>
        <h1>{stringThings.OtherThings}</h1>
        <p>{stringThings.OtherThingsSentence1}</p>
        <p>{stringThings.OtherThingsSentence2}</p>
        <Accordion>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                Rotating Panda - eating something - very cute
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <RotatingHomeThing></RotatingHomeThing>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="1">
                Rotating Bikini Woman - PG 13 image
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <RotatingImage></RotatingImage>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="2">
                Quick Consume API
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="2">
              <Card.Body>
                <QuickConsumeAPI></QuickConsumeAPI>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="3">
              Quick Consume API Search Results - Unchangeable Input
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="3">
              <Card.Body>
                <QuickConsumeAPISearchResults></QuickConsumeAPISearchResults>
              </Card.Body>
            </Accordion.Collapse>
          </Card>                             
        </Accordion>
      </Jumbotron>

      <FooterPage></FooterPage>
    </div>
  );
};

export default OtherThingsPage;

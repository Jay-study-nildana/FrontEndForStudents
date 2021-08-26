//FooterPage.tsx
import "../../css/RotatingImage.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import Col from "react-bootstrap/Col";
const stringThings = require("../../OtherStuff/StringConstants.json");

const FooterPage = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Alert variant="primary">
            <Alert.Link href="https://jay-study-nildana.github.io/developerprofile/">
              {stringThings.Developer}
            </Alert.Link>
          </Alert>
        </Col>
        <Col>
          <Alert variant="primary">
            <Alert.Link href="https://github.com/Jay-study-nildana/BootstrapForStudents">
              {stringThings.GitHub}
            </Alert.Link>
          </Alert>
        </Col>
        <Col>
          <Alert variant="primary">
            <Alert.Link href="https://stackoverflow.com/users/5338888/jay?tab=profile">
              {stringThings.Sentence}
            </Alert.Link>
          </Alert>
        </Col>
      </Row>
    </Container>
  );
};

export default FooterPage;

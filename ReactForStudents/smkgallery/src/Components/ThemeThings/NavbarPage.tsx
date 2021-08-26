//NavbarPage
import "../../css/RotatingImage.css";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
const stringThings = require("../../OtherStuff/StringConstants.json");

const NavbarPage = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="">{stringThings.ProjectTitle}</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <p className="pt-3 px-3 ">
            <Link to="/">{stringThings.Home}</Link>
          </p>
          <p className="pt-3 px-3">
            <Link to="/otherthings">{stringThings.OtherThings}</Link>
          </p>
          <p className="pt-3 px-3">
            <Link to="/smkgallery">{stringThings.SMKLandingTitle}</Link>
          </p>
          <p className="pt-3 px-3">
            <Link to="/about">{stringThings.About}</Link>
          </p>          
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarPage;

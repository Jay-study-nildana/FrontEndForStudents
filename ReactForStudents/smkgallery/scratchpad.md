
    <div ref={sliderRef} className="fader">
      {images.map((src, idx) => (
        <div
          key={idx}
          className="fader__slide"
          style={{ opacity: opacities[idx] }}
        >
          <img src={src} />
        </div>
      ))}
    </div>

<ListGroup>
  <ListGroup.Item>Cras justo odio</ListGroup.Item>
  <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
  <ListGroup.Item>Morbi leo risus</ListGroup.Item>
  <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
  <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
</ListGroup>
            
            
            <Image
              src={singleartobject?.items[0].image_thumbnail}
              alt={singleartobject?.items[0].titles?.toString()}
              fluid
            ></Image>

interface Props {
  data: QuestionData[];
  //renderItem is a function prop. contrast this with data, which is a data prop
  //it takes a questiondata as parameter and returns a JSX element
  //its also option so its not used every time
  renderItem?: (item: QuestionData) => JSX.Element;
}

export const QuestionList = ({ data, renderItem }: Props) => (

<QuestionList data={questions || []} />  
    
    function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>    <li>{number}</li>  );  return (
    <ul>{listItems}</ul>  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,  doculiment.getElementById('root')
);
    
    <Button
      variant="primary"
      disabled={isLoading}
      onClick={!isLoading ? handleClick : null}
    >
      {isLoading ? 'Loading…' : 'Click to load'}
    </Button>

[
  'primary',
  'secondary',
  'success',
  'danger',
  'warning',
  'info',
  'light',
  'dark',
].map((variant, idx) => (
  <Alert key={idx} variant={variant}>
    This is a {variant} alert with{' '}
    <Alert.Link href="#">an example link</Alert.Link>. Give it a click if you
    like.
  </Alert>
));

<Navbar bg="light" expand="lg">
  <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#link">Link</Nav.Link>
      <NavDropdown title="Dropdown" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-success">Search</Button>
    </Form>
  </Navbar.Collapse>
</Navbar>

"dependencies": {
"@emotion/react": "^11.4.0",
"@emotion/styled": "^11.3.0",
"@testing-library/jest-dom": "^5.11.4",
"@testing-library/react": "^11.1.0",
"@testing-library/user-event": "^12.1.10",
"@types/jest": "^26.0.15",
"@types/node": "^12.0.0",
"@types/react": "^17.0.0",
"@types/react-dom": "^17.0.0",
"history": "^5.0.0",
"react": "^17.0.2",
"react-dom": "^17.0.2",
"react-hook-form": "^7.7.1",
"react-redux": "^7.2.4",
"react-router-dom": "^6.0.0-beta.0",
"react-scripts": "4.0.3",
"redux": "^4.1.0",
"typescript": "^4.1.2",
"web-vitals": "^1.0.1"
},

import logo from "./logo.jpg";
import "./App.css";

import RotatingImage from "./Components/RotatingImage";

function App() {
return (
<div className="App">
<header className="App-header">
<img src={logo} className="App-logo" alt="logo" />
<p>
Edit <code>src/App.js</code> and save to reload.
</p>
<a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
Learn React
</a>
</header>
<RotatingImage/>
</div>
);
}

export default App;


{
	"resource": "/D:/crmar2021/bootstrapexpert/ReactJSForStudents/reactqanda/src/App.tsx",
	"owner": "typescript",
	"code": "7016",
	"severity": 8,
	"message": "Could not find a declaration file for module 'react/jsx-runtime'. 'd:/crmar2021/bootstrapexpert/ReactJSForStudents/reactqanda/node_modules/react/jsx-runtime.js' implicitly has an 'any' type.\n  If the 'react' package actually exposes this module, consider sending a pull request to amend 'https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react`",
	"source": "ts",
	"startLineNumber": 7,
	"startColumn": 5,
	"endLineNumber": 14,
	"endColumn": 21
}

{
	"resource": "/D:/crmar2021/bootstrapexpert/ReactJSForStudents/reactqanda/src/App.tsx",
	"owner": "typescript",
	"code": "2724",
	"severity": 8,
	"message": "'\"react-router-dom\"' has no exported member named 'Routes'. Did you mean 'Route'?",
	"source": "ts",
	"startLineNumber": 3,
	"startColumn": 25,
	"endLineNumber": 3,
	"endColumn": 31
}

people using the keyboard for navigation or screen readers will still be able to use this app.

import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Prompt
} from "react-router-dom";

// Sometimes you want to prevent the user from
// navigating away from a page. The most common
// use case is when they have entered some data
// into a form but haven't submitted it yet, and
// you don't want them to lose it.

export default function PreventingTransitionsExample() {
  return (
    <Router>
      <ul>
        <li>
          <Link to="/">Form</Link>
        </li>
        <li>
          <Link to="/one">One</Link>
        </li>
        <li>
          <Link to="/two">Two</Link>
        </li>
      </ul>

      <Switch>
        <Route path="/" exact children={<BlockingForm />} />
        <Route path="/one" children={<h3>One</h3>} />
        <Route path="/two" children={<h3>Two</h3>} />
      </Switch>
    </Router>
  );
}
//ReduxTextBox.js

import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import {
  changeText,
  selectText,
  fetchTextAsync,
  selectstatus,
  resetText
} from "./textSlice";

const ReduxTextBox = () => {
  const text = useSelector(selectText);
  const status = useSelector(selectstatus);
  const dispatch = useDispatch();
  const [textValue, setTextValue] = useState("");

  const stuff = (
    <div>
      <div className="container-fluid text-center">
        <p>This is the redux page. simple text box.</p>
        <div>
          <h1>Text</h1>
          <p>{text}</p>
          <input
            aria-label="text value"
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
          />
          <p>{status}</p>
          <br></br>
          <br></br>
          <Button
            variant="primary"
            onClick={() => dispatch(changeText(textValue))}
          >
            change the text
          </Button>
          <br></br>
          <br></br>
          {/* <Button variant="primary">Primary</Button> */}
          <Button onClick={() => dispatch(fetchTextAsync(textValue))}>
            change the text Async
          </Button>
          <br></br>
          <br></br>
          {/* <Button variant="primary">Primary</Button> */}
          <Button onClick={() => dispatch(resetText(""))}>
            reset the text
          </Button>
        </div>
      </div>
    </div>
  );

  return stuff;
};

export default ReduxTextBox;

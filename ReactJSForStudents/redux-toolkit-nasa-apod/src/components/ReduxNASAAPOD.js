//ReduxNASAAPOD.js

import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import {
  fetchNASAAPODAPIdataAsync,
  selectnasaObject,
  resetNasa
} from "./NASASlice";

const ReduxNASAAPOD = () => {
  const nasaObject = useSelector(selectnasaObject);
  const dispatch = useDispatch();

  const stuff = (
    <div>
      <div className="container-fluid text-center">
        <p>This is the redux page. consumes the NASA APOD API</p>
        <div>
          <Button onClick={() => dispatch(fetchNASAAPODAPIdataAsync())}>
            get NASA data
          </Button>
          <Button onClick={() => dispatch(resetNasa())}>
            reset the NASA data
          </Button>
          <p>{nasaObject.copyright}</p>
          <p>{nasaObject.msg}</p>
          <img
            src={nasaObject.url}
            className="img-fluid"
            alt="..."
          ></img>
          <p>{nasaObject.explanation}</p>
          <p>
            {nasaObject.date} {nasaObject.title}
          </p>
        </div>
      </div>
    </div>
  );

  return stuff;
};

export default ReduxNASAAPOD;

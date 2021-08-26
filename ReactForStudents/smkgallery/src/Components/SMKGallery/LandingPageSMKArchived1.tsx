//LandingPageSMK.tsx
import "../../css/RotatingImage.css";
import React from "react";
import { useState } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import NavbarPage from "../ThemeThings/NavbarPage";
import FooterPage from "../ThemeThings/FooterPage";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Image from "react-bootstrap/Image";
import Toast from "react-bootstrap/Toast";

//updating the file to work with redux store
import { useSelector, useDispatch } from "react-redux";
import { getSingleArtObject } from "../SMKGallery/SMKTypes";

import {
  gettingSingleArtObjectAction,
  gotSingleArtObjectAction,
  AppState,
} from "../../store";

const stringThings = require("../../OtherStuff/StringConstants.json");

const LandingPageSMK = () => {
  const [showA, setShowA] = useState(true);
  const toggleShowA = () => setShowA(!showA);

  const dispatch = useDispatch();

  const singleartobject = useSelector(
    (state: AppState) => state.artobject.artobjectviewing
  );

  const singleartobjectLoading = useSelector(
    (state: AppState) => state.artobject.loading
  );

  React.useEffect(() => {
    console.log("Landing Page SMK Rendered");

    //function to load the image data
    const GetTheArtObject = async () => {
      dispatch(gettingSingleArtObjectAction());
      const tempSingleArtObject = await getSingleArtObject();

      dispatch(gotSingleArtObjectAction(tempSingleArtObject));
    };

    //now, call the function and load the image data.
    GetTheArtObject();
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
        {singleartobjectLoading ? (
          <div>
            {/* <p>Loading...</p> */}
            <SkeletonTheme color="#12e451" highlightColor="#df1462">
              <p>
                <Skeleton count={stringThings.NumberOfLoadingLines} />
              </p>
            </SkeletonTheme>
            ;
          </div>
        ) : (
          <div>
            {/* <p>Image Information Loaded.</p> */}
            <p>Image ID - {singleartobject?.items[0].id}</p>
            <Image
              src={singleartobject?.items[0].image_thumbnail}
              alt={singleartobject?.items[0].titles?.toString()}
              height="500"
              fluid
            ></Image>
            {/* <p>Image Information Loaded.</p> */}
            <p>Image ID - {singleartobject?.items[1].id}</p>
            <Image
              src={singleartobject?.items[1].image_thumbnail}
              alt={singleartobject?.items[1].titles?.toString()}
              height="500"
              fluid
            ></Image>
            {/* <p>Image Information Loaded.</p> */}
            <p>Image ID - {singleartobject?.items[2].id}</p>
            <Image
              src={singleartobject?.items[2].image_thumbnail}
              alt={singleartobject?.items[2].titles?.toString()}
              height="500"
              fluid
            ></Image>
          </div>
        )}
      </Jumbotron>
      <FooterPage></FooterPage>
    </div>
  );
};

export default LandingPageSMK;

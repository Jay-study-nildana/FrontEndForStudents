//QuickConsumeAPISearchResults.tsx

import "../../css/RotatingImage.css";
import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/esm/Button";
import ListGroup from "react-bootstrap/esm/ListGroup";

//updating the file to work with redux store
import { useSelector, useDispatch } from "react-redux";

import {
  gettingSearchResultsAction,
  gotSearchResultsAction,
  AppState,
} from "../../store";
import { SearchResults } from "../../Interfaces/SearchResults";

const stringThings = require("../../OtherStuff/StringConstants.json");
const defaultImage = stringThings.DefaultImage1;

interface Props {
  data: SearchResults | null;
}

const SimpleList = ({ data }: Props) => {
  const searchResultsdata = data;
  const listItems = searchResultsdata?.items.map((x) => (
    <ListGroup.Item>
      <p>Art ID : {x.id}</p>
      {!x.has_image ? (
        <div>
          <p>Image Not Available. Showing Place Holder Image</p>
          <Image
            src={defaultImage}
            alt={"showing default image"}
            fluid
          ></Image>
        </div>
      ) : (
        <div>
          {/* <p>Image Available</p>
          <p>Image URL - {x.image_thumbnail}</p> */}
          <Image
            src={x?.image_thumbnail}
            alt={x.titles?.toString()}
            fluid
          ></Image>
        </div>
      )}
    </ListGroup.Item>
  ));
  return <ListGroup>{listItems}</ListGroup>;
};

const QuickConsumeAPISearchResults = () => {
  const dispatch = useDispatch();

  const searchResultsdata = useSelector(
    (state: AppState) => state.searchresults.searchResultsdata
  );

  const loadingSearchResults = useSelector(
    (state: AppState) => state.searchresults.loadingSearchResults
  );

  //function to call the function
  //which will in turn call the web api
  const GetTheArtObject = async () => {
    dispatch(gettingSearchResultsAction());
    const tempSearchResults = await getSearchResults();
    dispatch(gotSearchResultsAction(tempSearchResults));
  };

  React.useEffect(() => {
    console.log("Landing Page SMK Rendered");

    //now, call the function and load the image data.
    GetTheArtObject();

    //adding the below line about eslint-disable because eslint keeps expecting dependency for dispatch
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <Container>
        <Button onClick={GetTheArtObject}>Refresh Image</Button>
        {loadingSearchResults ? (
          <Container>
            {/* <p>Loading...</p> */}
            <SkeletonTheme color="#12e451" highlightColor="#df1462">
              <p>
                <Skeleton count={stringThings.NumberOfLoadingLines} />
              </p>
            </SkeletonTheme>
            ;
          </Container>
        ) : (
          <Container>
            {/* <p>Image Information Loaded.</p> */}
            <p>Number of Rows - {searchResultsdata?.rows}</p>
            <p>Found - {searchResultsdata?.found}</p>
            <SimpleList data={searchResultsdata} />
          </Container>
        )}
      </Container>
    </div>
  );
};

export default QuickConsumeAPISearchResults;

//example api call
//https://api.smk.dk/api/v1/art/search/?keys=history&facets=has_image&offset=0&rows=100&lang=en&randomHighlights=xyz

const getSearchResults = async (): Promise<SearchResults | null> => {
  //return object
  let responseObject: SearchResults;
  const baseURL = "https://api.smk.dk/api/v1";
  const endPoint = "/art/search/";
  const parameters =
    "keys=history&facets=has_image&offset=0&rows=100&lang=en&randomHighlights=xyz";
  const finalURLBuilt = baseURL + endPoint + "?" + parameters;
  const response = await fetch(finalURLBuilt);
  responseObject = await response.json();
  return responseObject.items?.length === 0 ? null : responseObject;
};

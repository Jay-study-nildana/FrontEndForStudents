import React, { Fragment } from "react";

import Hero from "../components/Hero";
import Content from "../components/Content";
import RandomQuoteList from './../randomstuffgenerator/RandomQuoteList';
import AccountClaims  from "../randomstuffgenerator/AccountClaims";
import RandomQuoteAddNew from "../randomstuffgenerator/RandomQuoteAddNew";

const AddQuotePal = () => (
  <Fragment>
    <hr />
    <RandomQuoteAddNew />
    {/* <Hero /> */}
    {/* <RandomQuoteList /> */}
    <hr />
    {/* <AccountClaims /> */}
    {/* <Content /> */}
  </Fragment>
);

export default AddQuotePal;

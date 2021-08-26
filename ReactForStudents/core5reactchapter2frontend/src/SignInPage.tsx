import React from 'react';
import { Page } from './Page';

// rendering null in the content of the Page component at the moment.
// This is a way of telling React to render nothing.
export const SignInPage = () => <Page title="Sign In">{null}</Page>;

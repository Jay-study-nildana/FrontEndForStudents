/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
//The useSearchParams hook from React Router is used to access query parameters.
import { useSearchParams } from 'react-router-dom';
import { QuestionList } from './QuestionList';
import { searchQuestions } from './QuestionsData';
import React from 'react';

import { Page } from './Page';

//for redux
import { useSelector, useDispatch } from 'react-redux';
import {
  AppState,
  searchingQuestionsAction,
  searchedQuestionsAction,
} from './Store';

//old code
// export const SearchPage = () => <Page title="Search Results">{null}</Page>;

export const SearchPage = () => {
  const dispatch = useDispatch();
  const questions = useSelector((state: AppState) => state.questions.searched);
  // The useSearchParams hook returns an array with two elements.
  // The first element is an object containing the search parameters,
  //and the second element is a function to update the query parameters.
  // We have only destructured the first element in our code because
  //we don't need to update query parameters in this component.
  const [searchParams] = useSearchParams();
  //state to hold the matched questions in the search:
  // const [questions, setQuestions] = React.useState<QuestionData[]>([]);
  //get the criteria query parameter value:
  //The searchParams object contains a get method that can be used to get the value of a query parameter.
  const search = searchParams.get('criteria') || '';

  //invoke the search when the component first renders and when the search variable changes using the useEffect hook
  React.useEffect(() => {
    const doSearch = async (criteria: string) => {
      dispatch(searchingQuestionsAction());
      const foundResults = await searchQuestions(criteria);
      dispatch(searchedQuestionsAction(foundResults));
      // setQuestions(foundResults);
    };
    doSearch(search);
    //adding the below line about eslint-disable because eslint keeps expecting dependency for dispatch
    // eslint-disable-next-line
  }, [search]);

  return (
    <Page title="Search Results">
      {search && (
        <p
          css={css`
            font-size: 16px;
            font-style: italic;
            margin-top: 0px;
          `}
        >
          for "{search}"
        </p>
      )}
      <QuestionList data={questions} />
    </Page>
  );
};

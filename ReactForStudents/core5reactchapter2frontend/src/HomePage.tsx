/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import React from 'react';

//let's get our question things.
import { QuestionList } from './QuestionList';
import { getUnansweredQuestions } from './QuestionsData';

//lets get our Page things
import { Page } from './Page';
import { PageTitle } from './PageTitle';

//lets get our custom button
import { PrimaryButton } from './Styles';

//navigation programmatically.
//This is a hook that returns a function that we can use to perform a navigation.
import { useNavigate } from 'react-router-dom';

//updating the file to work with redux store
import { useSelector, useDispatch } from 'react-redux';

import {
  gettingUnansweredQuestionsAction,
  gotUnansweredQuestionsAction,
  AppState,
} from './Store';

// export const HomePage = () => (
//   <div>
//     <div>
//       <h2>Unanswered Questions That Nobody Has Answered</h2>
//       <button>Ask a question To Become Wiser</button>
//     </div>
//     <QuestionList data={getUnansweredQuestions()} />
//   </div>
// );

//here is the HomePage after upgrading it to use the Page component
// export const HomePage = () => (
//   <Page>
//     <div>
//       <PageTitle>Unanswered Questions</PageTitle>
//       <button>Ask a question</button>
//     </div>
//     <QuestionList data={getUnansweredQuestions()} />
//   </Page>
// );

//home page after upgrading it to use the render function
// export const HomePage = () => (
//   <Page>
//     <div>
//       <PageTitle>Unanswered Questions</PageTitle>
//       <button>Ask a question</button>
//     </div>
//     {/* the below code block about QuestionList works fine if we use the non async version of the function
//     but the sync version has been removed to make way for an async version so it will work with
//     mock api calls
//     and actual api calls
//     ultimately that is the goal */}
//     {/* <QuestionList
//       data={getUnansweredQuestions()}
//     //   not using it right now
//     //   renderItem={(question) => <div>{question.title}</div>}
//     /> */}
//   </Page>
// );

// The HomePage component is what is called a container component,
// with QuestionList and Question being presentational components

//home page upgraded to work with async and useEffect
export const HomePage = () => {
  //for redux usage
  // The key parts of connecting a component to the store are 
  // using the useSelector hook to select the required state and 
  // using the useDispatch hook to dispatch actions.  
  const dispatch = useDispatch();

  const questions = useSelector(
    (state: AppState) => state.questions.unanswered,
  );
  const questionsLoading = useSelector(
    (state: AppState) => state.questions.loading,
  );

  //The useState function returns an array containing the state variable in the first element
  // and a function to set the state in the second element. The initial value of the
  //state variable is passed into the function as a parameter. The TypeScript type for the
  //state variable can be passed to the function as a generic type parameter.

  //this is related to the questions. initially they are an empty array
  //later they are updated by the setQuestions function
  // const [questions, setQuestions] = React.useState<QuestionData[]>([]);

  //this is to indicate that the questions are being loaded from their source
  // const [questionsLoading, setQuestionsLoading] = React.useState(true);

  //this is where we call all our async functions to get data

  React.useEffect(() => {
    console.log('first rendered');
    //we can't specify an asynchronous callback in the useEffect parameter.
    //so we wrap our async call in another function.
    //Later we call this function inside our useEffect
    const doGetUnansweredQuestions = async () => {
      dispatch(gettingUnansweredQuestionsAction());
      const unansweredQuestions = await getUnansweredQuestions();
      dispatch(gotUnansweredQuestionsAction(unansweredQuestions));      
      //now that we are getting a response, we can update the state of our questions related
      //props above to do what we want
      //first we want to update our questions data set
      // setQuestions(unansweredQuestions);
      //we also need to set our loading indicator
      // setQuestionsLoading(false);
    };
    doGetUnansweredQuestions();
    //adding the below line about eslint-disable because eslint keeps expecting dependency for dispatch
  // eslint-disable-next-line
  }, []);

  //use this to check how many times the component was rendered
  // console.log('rendered');

  const navigate = useNavigate();

  //function to react to the button
  const handleAskQuestionClick = () => {
    // console.log('TODO - move to the AskPage');
    navigate('ask');
  };

  return (
    <Page>
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
        `}
      >
        <PageTitle>Unanswered Questions</PageTitle>
        {/* <button onClick={handleAskQuestionClick}>Ask a question</button> */}
        <PrimaryButton onClick={handleAskQuestionClick}>
          Ask a question
        </PrimaryButton>
      </div>
      {/* the below code block about QuestionList works fine if we use the non async version of the function
      but the sync version has been removed to make way for an async version so it will work with 
      mock api calls
      and actual api calls
      ultimately that is the goal */}
      {/* <QuestionList
        data={getUnansweredQuestions()}
      //   not using it right now
      //   renderItem={(question) => <div>{question.title}</div>}
      /> */}
      {/* here is the actual questions being loaded from the async mock or real API */}
      {/* unfortunately this does not do anything with our loading stuff */}
      {/* <QuestionList data={questions} /> */}
      {/* here is the code that also does the loading thing */}
      {questionsLoading ? (
        <div>Loading…</div>
      ) : (
        <QuestionList data={questions || []} />
      )}
    </Page>
  );
};

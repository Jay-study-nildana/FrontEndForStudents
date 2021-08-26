/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import {
  gray3,
  gray6,
  Fieldset,
  FieldContainer,
  FieldLabel,
  FieldTextArea,
  FormButtonContainer,
  PrimaryButton,
  FieldError,
  SubmissionSuccess,
} from './Styles';
import React from 'react';
import { Page } from './Page';
// route parameter
//path we entered contains :questionId at the end.
// destructure the value of the questionId route parameter from the useParams hook:
import { useParams } from 'react-router-dom';

//import the function that gets a question, along with the question interface:
import { getQuestion, postAnswer } from './QuestionsData';

import { AnswerList } from './AnswerList';

import { useForm } from 'react-hook-form';

//for using redux
import { useSelector, useDispatch } from 'react-redux';
import { AppState, gettingQuestionAction, gotQuestionAction } from './Store';

type FormData = {
  content: string;
};

//original code
// export const QuestionPage = () => <Page>Question Page</Page>;

//old stuff
// export const QuestionPage = () => {
//   const { questionId } = useParams();
//   return <Page>Question Page {questionId}</Page>;
// };

export const QuestionPage = () => {
  const dispatch = useDispatch();
  const question = useSelector((state: AppState) => state.questions.viewing);
  // const [question, setQuestion] = React.useState<QuestionData | null>(null);
  const { questionId } = useParams();
  const [successfullySubmitted, setSuccessfullySubmitted] =
    React.useState(false);

  //We want to call the getQuestion function during the initial render
  //call it inside a call to the useEffect hook

  // when it is first rendered, the question component will fetch the question
  // and set it in the state that will cause a second render of the component
  React.useEffect(() => {
    const doGetQuestion = async (questionId: number) => {
      dispatch(gettingQuestionAction());
      const foundQuestion = await getQuestion(questionId);
      dispatch(gotQuestionAction(foundQuestion));
      // setQuestion(foundQuestion);
    };
    if (questionId) {
      //Number constructor to convert questionId from a string into a number
      doGetQuestion(Number(questionId));
    }
    //adding the below line about eslint-disable because eslint keeps expecting dependency for dispatch
    // eslint-disable-next-line
  }, [questionId]);

  //above
  //second parameter in the useEffect function has questionId in an array.
  // function that useEffect runs (the first parameter) is dependent on the
  //questionId value and should rerun if this value changes
  // If [questionId] wasn't provided, it would get into an infinite loop
  // because every time it called setQuestion, it causes a re-render,
  //which, without [questionId], would always rerun the method.

  const {
    register,
    formState: { errors },
    handleSubmit,
    formState,
  } = useForm<FormData>(
    //invokes the validation rules when the field elements lose focus (that is, the element's blur event):
    {
      mode: 'onBlur',
    },
  );

  const submitForm = async (data: FormData) => {
    const result = await postAnswer({
      //non-null assertion operator (!) tells the TypeScript compiler that the variable
      // before it cannot be null or undefined
      questionId: question!.questionId,
      content: data.content,
      userName: 'Fred',
      created: new Date(),
    });
    setSuccessfullySubmitted(result ? true : false);
  };

  return (
    <Page>
      <div
        css={css`
          background-color: white;
          padding: 15px 20px 20px 20px;
          border-radius: 4px;
          border: 1px solid ${gray6};
          box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.16);
        `}
      >
        <div
          css={css`
            font-size: 19px;
            font-weight: bold;
            margin: 10px 0px 5px;
          `}
        >
          {/* When using triple equals (===), we are checking for strict equality.  */}
          {/* When using a double equals (==), the type isn't checked */}
          {question === null ? '' : question.title}
        </div>
        {/* now we look at rendering the question content */}
        {/* In React, a component can only return a single element. 
        This rule applies to conditional rendering logic where there can be only
         a single parent React element being rendered. */}
        {/* React Fragment allows us to work around this rule 
         because we can nest multiple elements within it without creating a DOM node.  */}
        {question !== null && (
          <React.Fragment>
            <p
              css={css`
                margin-top: 0px;
                background-color: white;
              `}
            >
              {question.content}
            </p>
            <div
              css={css`
                font-size: 12px;
                font-style: italic;
                color: ${gray3};
              `}
            >
              {`Asked by ${question.userName} on
  ${question.created.toLocaleDateString()} 
  ${question.created.toLocaleTimeString()}`}
            </div>
            <AnswerList data={question.answers} />
            <form
              onSubmit={handleSubmit(submitForm)}
              css={css`
                margin-top: 20px;
              `}
            >
              <Fieldset
                disabled={formState.isSubmitting || successfullySubmitted}
              >
                <FieldContainer>
                  <FieldLabel htmlFor="content">Your Answer</FieldLabel>
                  {/* <FieldTextArea id="content" {...register('content')} /> */}
                  <FieldTextArea
                    id="content"
                    {...register('content', { required: true, minLength: 50 })}
                  />
                  {errors.content && errors.content.type === 'required' && (
                    <FieldError>You must enter the answer</FieldError>
                  )}
                  {errors.content && errors.content.type === 'minLength' && (
                    <FieldError>
                      The answer must be at least 50 characters
                    </FieldError>
                  )}
                </FieldContainer>
                <FormButtonContainer>
                  <PrimaryButton type="submit">
                    Submit Your Answer
                  </PrimaryButton>
                </FormButtonContainer>
                {successfullySubmitted && (
                  <SubmissionSuccess>
                    Your answer was successfully submitted
                  </SubmissionSuccess>
                )}
              </Fieldset>
            </form>
          </React.Fragment>
        )}
      </div>
    </Page>
  );
};

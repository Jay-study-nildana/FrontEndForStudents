/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { gray2, gray3 } from './Styles';
import React from 'react';
import { QuestionData } from './QuestionsData';
import { Link } from 'react-router-dom';

interface Props {
  data: QuestionData;
  //an additional property in the Props interface in Question.tsx to represent whether the question's content is shown
  //showContent prop optional by adding a question mark
  showContent?: boolean;
}

// export const Question = ({ data }: Props) => (
//   <div>
//     <div>{data.title}</div>
//     <div>
//       {`Asked by ${data.userName} on
//           ${data.created.toLocaleDateString()} ${data.created.toLocaleTimeString()}`}
//     </div>
//   </div>
// );

//next version
export const Question = ({ data, showContent }: Props) => (
  <div
    css={css`
      padding: 10px 0px;
    `}
  >
    <div
      css={css`
        padding: 10px 0px;
        font-size: 19px;
      `}
    >
      {/* we implement route parameters by defining variables in the route path with a colon in front
     and then picking the value up with the useParams hook. */}

      <Link
        css={css`
          text-decoration: none;
          color: ${gray2};
        `}
        to={`/questions/${data.questionId}`}
      >
        {data.title}
      </Link>
    </div>
    {/* we try show or hide based on the boolean */}
    {/* only renders the question's content if the showContent prop is true using the short-circuit operator, &&. */}
    {/* often used in JSX to conditionally render an element if the condition is true. */}
    {showContent && (
      <div
        css={css`
          padding-bottom: 10px;
          font-size: 15px;
          color: ${gray2};
        `}
      >
        {/* a JavaScript ternary operator to truncate the content if it is longer than 50 characters */}
        {/* also used template literals and interopolation  */}
        {data.content.length > 50
          ? `${data.content.substring(0, 50)}...`
          : data.content}
      </div>
    )}
    <div
      css={css`
        font-size: 12px;
        font-style: italic;
        color: ${gray3};
      `}
    >
      {`Asked by ${data.userName} on
          ${data.created.toLocaleDateString()} ${data.created.toLocaleTimeString()}`}
    </div>
  </div>
);

//here we have some default props
Question.defaultProps = {
  showContent: true,
};

//another way to put default props is
//export const Question = ({ data, showContent = true }: Props) => ( ... )

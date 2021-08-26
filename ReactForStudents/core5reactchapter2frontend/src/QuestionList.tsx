/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { accent2, gray5 } from './Styles';
import { QuestionData } from './QuestionsData';
import { Question } from './Question';

interface Props {
  data: QuestionData[];
  //renderItem is a function prop. contrast this with data, which is a data prop
  //it takes a questiondata as parameter and returns a JSX element
  //its also option so its not used every time
  renderItem?: (item: QuestionData) => JSX.Element;
}

//similar code

// export const QuestionList = (props: Props) => <ul></ul>;

// export const QuestionList = (props: Props) => (
//   <ul>
//     {props.data.map((question) => (
//       <li key={question.questionId}>
//       </li>
//     ))}
//   </ul>
// );

//final code

// export const QuestionList = ({ data }: Props) => (
//   <ul>
//     {data.map((question) => (
//       <li key={question.questionId}></li>
//     ))}
//   </ul>
// );

//final code with Question component

// export const QuestionList = ({ data }: Props) => (
//   <ul>
//     {data.map((question) => (
//       <li key={question.questionId}>
//         <Question data={question} />
//       </li>
//     ))}
//   </ul>
// );

//using the function prop now
//the old code before we used emotion
// export const QuestionList = ({ data, renderItem }: Props) => (
//   <ul>
//     {data.map((question) => (
//       <li key={question.questionId}>
//         {/* Conditions in if statements and ternaries will execute the second operand
//         if the condition evaluates to truthy, and the third operand
//         if the condition evaluates to falsy. true is only one of many truthy values.
//         In fact, false, 0, "", null, undefined, and NaN are falsy values and everything else is truthy.*/}
//         {/* renderItem will be truthy and will execute if it has been passed as a prop. */}
//         {renderItem ? renderItem(question) : <Question data={question} />}
//       </li>
//     ))}
//   </ul>
// );

//this uses the emotion js thing
export const QuestionList = ({ data, renderItem }: Props) => (
  <ul
    css={css`
      list-style: none;
      margin: 10px 0 0 0;
      padding: 0px 20px;
      background-color: #fff;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      border-top: 3px solid ${accent2};
      box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.16);
    `}
  >
    {data.map((question) => (
      <li
        key={question.questionId}
        css={css`
          border-top: 1px solid ${gray5};
          :first-of-type {
            border-top: none;
          }
        `}
      >
        {/* Conditions in if statements and ternaries will execute the second operand 
        if the condition evaluates to truthy, and the third operand 
        if the condition evaluates to falsy. true is only one of many truthy values.
        In fact, false, 0, "", null, undefined, and NaN are falsy values and everything else is truthy.*/}
        {/* renderItem will be truthy and will execute if it has been passed as a prop. */}
        {renderItem ? renderItem(question) : <Question data={question} />}
      </li>
    ))}
  </ul>
);

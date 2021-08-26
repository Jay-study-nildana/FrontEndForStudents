//An interface is a type that defines the structure for an object, including all its
//properties and methods. Interfaces don't exist in JavaScript, so they are purely
//used by the TypeScript compiler during the type checking process

//the types are all provided by TypeScript - number, string and Date

//All these interfaces will be used for data. Thing of them like classes we use in C #
//We can use them for
//mock data
//and also API data that will come when we consume API servers

export interface QuestionData {
  questionId: number;
  title: string;
  content: string;
  userName: string;
  created: Date;
  answers: AnswerData[];
}

//this is used in the above QuestionData interface
export interface AnswerData {
  answerId: number;
  content: string;
  userName: string;
  created: Date;
}

//some dummy data for mocking

const questions: QuestionData[] = [
  {
    questionId: 1,
    title: 'Why should I learn TypeScript?',
    content:
      'TypeScript seems to be getting popular so I wondered whether it is worth my time learningit? What benefits does it give over JavaScript?',
    userName: 'Bob',
    created: new Date(),
    answers: [
      {
        answerId: 1,
        content: 'To catch problems earlier speeding up your developments',
        userName: 'Jane',
        created: new Date(),
      },
      {
        answerId: 2,
        content:
          'So, that you can use the JavaScript features of tomorrow, today',
        userName: 'Fred',
        created: new Date(),
      },
    ],
  },
  {
    questionId: 2,
    title: 'Which state management tool should I use?',
    content:
      'There seem to be a fair few state management tools around for React - React, Unstated, ...Which one should I use?',
    userName: 'Bob',
    created: new Date(),
    answers: [],
  },
];

// a function that can be called

//returns unanswered questions:
//this is the sync version used earlier
// export const getUnansweredQuestions = (): QuestionData[] => {
//   return questions.filter((q) => q.answers.length === 0);
// };

//used to simulate waiting while the mock data gets the mock data from an API
const wait = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

//here is the async version
export const getUnansweredQuestions = async (): Promise<QuestionData[]> => {
  await wait(500);
  return questions.filter((q) => q.answers.length === 0);
};

// function that will simulate a web request to get a question:
//We have used the array filter method to get the question for the passed-in questionId.
//The type passed into the Promise generic type is Question | null, which is called a union type.
//the function is expected to asynchronously return an object of the QuestionData or null type.
export const getQuestion = async (
  questionId: number,
): Promise<QuestionData | null> => {
  await wait(500);
  const results = questions.filter((q) => q.questionId === questionId);
  return results.length === 0 ? null : results[0];
};

//a query parameter on the search page called criteria
//uses the array filter method and matches the criteria to any part of the question title or content
export const searchQuestions = async (
  criteria: string,
): Promise<QuestionData[]> => {
  await wait(500);
  return questions.filter(
    (q) =>
      q.title.toLowerCase().indexOf(criteria.toLowerCase()) >= 0 ||
      q.content.toLowerCase().indexOf(criteria.toLowerCase()) >= 0,
  );
};

//these are related to form submission

//this is about posting a new question

export interface PostQuestionData {
  title: string;
  content: string;
  userName: string;
  created: Date;
}
export const postQuestion = async (
  question: PostQuestionData,
): Promise<QuestionData | undefined> => {
  await wait(500);
  const questionId = Math.max(...questions.map((q) => q.questionId)) + 1;
  const newQuestion: QuestionData = {
    ...question,
    questionId,
    answers: [],
  };
  questions.push(newQuestion);
  return newQuestion;
};

//this is about posting an answer

export interface PostAnswerData {
  questionId: number;
  content: string;
  userName: string;
  created: Date;
}
export const postAnswer = async (
  answer: PostAnswerData,
): Promise<AnswerData | undefined> => {
  await wait(500);
  const question = questions.filter(
    (q) => q.questionId === answer.questionId,
  )[0];
  const answerInQuestion: AnswerData = {
    answerId: 99,
    ...answer,
  };
  question.answers.push(answerInQuestion);
  return answerInQuestion;
};

import { QuestionData } from './QuestionsData';
import { Store, createStore, combineReducers } from 'redux';

//Store is the top-level type representing the Redux store.
//createStore function to create the store
//combineReducers is a function we can use to put multiple reducers together into a format required by the createStore function

interface QuestionsState {
  readonly loading: boolean;
  readonly unanswered: QuestionData[];
  readonly viewing: QuestionData | null;
  readonly searched: QuestionData[];
}
export interface AppState {
  readonly questions: QuestionsState;
}

const initialQuestionState: QuestionsState = {
  loading: false,
  unanswered: [],
  viewing: null,
  searched: [],
};

//actions related to unanswered questions

export const GETTINGUNANSWEREDQUESTIONS = 'GettingUnansweredQuestions';

// A const assertion on an object will give it an immutable type.
// It also will result in string properties having a narrow string literal type rather than the wider string type.

export const gettingUnansweredQuestionsAction = () =>
  ({
    type: GETTINGUNANSWEREDQUESTIONS,
  } as const);

export const GOTUNANSWEREDQUESTIONS = 'GotUnansweredQuestions';

export const gotUnansweredQuestionsAction = (questions: QuestionData[]) =>
  ({
    type: GOTUNANSWEREDQUESTIONS,
    questions: questions,
  } as const);

//actions related to viewing a question

export const GETTINGQUESTION = 'GettingQuestion';
export const gettingQuestionAction = () =>
  ({
    type: GETTINGQUESTION,
  } as const);

export const GOTQUESTION = 'GotQuestion';
export const gotQuestionAction = (question: QuestionData | null) =>
  ({
    type: GOTQUESTION,
    question: question,
  } as const);

//actions related to searching a question

export const SEARCHINGQUESTIONS = 'SearchingQuestions';
export const searchingQuestionsAction = () =>
  ({
    type: SEARCHINGQUESTIONS,
  } as const);
export const SEARCHEDQUESTIONS = 'SearchedQuestions';
export const searchedQuestionsAction = (questions: QuestionData[]) =>
  ({
    type: SEARCHEDQUESTIONS,
    questions,
  } as const);

//reducer things

type QuestionsActions =
  | ReturnType<typeof gettingUnansweredQuestionsAction>
  | ReturnType<typeof gotUnansweredQuestionsAction>
  | ReturnType<typeof gettingQuestionAction>
  | ReturnType<typeof gotQuestionAction>
  | ReturnType<typeof searchingQuestionsAction>
  | ReturnType<typeof searchedQuestionsAction>;

// const questionsReducer = (
//   state = initialQuestionState,
//   action: QuestionsActions,
// ) => {
//   // TODO - Handle the different actions and return
//   // new state
//   return state;
// };

//improved version of questionsReducer

//...state,
//The spread syntax allows an object to expand
//into a place where key-value pairs are expected.
// The syntax consists of three dots followed by the object to be expanded.

const questionsReducer = (
  state = initialQuestionState,
  action: QuestionsActions,
) => {
  switch (action.type) {
    case GETTINGUNANSWEREDQUESTIONS: {
      return {
        ...state,
        loading: true,
      };
    }
    case GOTUNANSWEREDQUESTIONS: {
      return {
        ...state,
        unanswered: action.questions,
        loading: false,
      };
    }
    case GETTINGQUESTION: {
      return {
        ...state,
        viewing: null,
        loading: true,
      };
    }
    case GOTQUESTION: {
      return {
        ...state,
        viewing: action.question,
        loading: false,
      };
    }
    case SEARCHINGQUESTIONS: {
      return {
        ...state,
        searched: [],
        loading: true,
      };
    }
    case SEARCHEDQUESTIONS: {
      return {
        ...state,
        searched: action.questions,
        loading: false,
      };
    }
  }
  return state;
};

//we are now creating the store
const rootReducer = combineReducers<AppState>({
  questions: questionsReducer,
});

export function configureStore(): Store<AppState> {
  const store = createStore(rootReducer, undefined);
  return store;
}

# core5 react chapter2 frontend

Front end code from chapter 2 onwards till the end.

Default README available at [READMEDefault.md](READMEDefault.md).

# API Server consumption

As of now, the app ends having consumed the mock data. It does not actually talk to the API server. 

# URLs

These work locally and also over the network. Very useful to test on iPhone, iPad, computer in another room.

1. http://192.168.0.173:3000/
1. http://192.168.0.173:3000/search
1. http://192.168.0.173:3000/questions/1
1. http://192.168.0.173:3000/search?criteria=type

# Redux

Redux is a predictable state container that can be used in React apps

Principles

1. Single source of truth: This means that the whole application state is stored in a single object. In a real app, this object is likely to contain a complex tree of nested objects.
1. The state is read-only: This means that the state can't be changed directly. In Redux, the only way to change the state is to dispatch what's called an action.
1. Changes are made with pure functions: The functions that are responsible for changing the state are called reducers.

A pure function always returns the same result for a given set of parameters. So, these functions don't depend on any variables outside the scope of the function that isn't passed into the function. Pure functions also don't change any variables outside the scope of the function.

key points regarding reducers

1. Reducers take in two parameters for the current state and the action that is being performed.
1. A switch statement is used on the action type and creates a new state object appropriately for each action type in each of its branches.
1. To create the new state, we spread the current state into a new object and then overwrite it with properties that have changed.
1. The new state is returned from the reducer.

Special note

1. We accessed the Redux store state by using the useSelector hook from React Redux. We passed a function into this that retrieved the appropriate piece of state we needed in the React component.
1. To begin the process of a state change, we invoked an action using a function returned from the useDispatch hook from React Redux. We passed the relevant action object into this function, containing information to make the state change.

# TypeScript Behavior

1. Sometimes your code will be correct but typescript will not accept the syntax or a type definition is missing or something. In such cases, you can try and ignore that line or, ignore the entire file or find the type definition fixes by using github or stack overflow or something. This is something you will learn over time as you use TypeScript more.

# Code Source

1. https://github.com/PacktPublishing/ASP.NET-Core-5-and-React-Second-Edition

# additional links

1. https://github.com/emotion-js/emotion
1. jpoissonnier.vscode-styled-components
1. https://github.com/emotion-js/emotion/issues/1249 - for error TS2322: Type '{ children: Element; css: SerializedStyles; }' is not assignable to type
1. https://stackoverflow.com/questions/67791756/react-hook-form-error-type-useformregisterformdata-is-not-assignable-to-ty
1. https://github.com/PacktPublishing/ASP.NET-Core-5-and-React-Second-Edition/issues/11 - Error when using ref={register}
1. https://codesandbox.io/s/react-hook-form-get-started-ts-5ksmm?file=/src/index.tsx:696-740
1. https://react-hook-form.com/migrate-v6-to-v7/

# running

    npm install
    npm start

Note : TypeScript errors operate outside the hot reload feature. After fixing a TypeScript error, you must stop and restart the node server.

# URLs

Loads at http://localhost:3000/

Loads at http://192.168.0.173:3000 (for network, like testing from mobile, second computer)

# Linting

Linting with ESLint rules are applied in package.json => eslintConfig.

Note : normally, this would be put in a file called '.eslintrc.json'

# Prettier

Prettier settings are stored in the file called '.prettierrc'

eslint-config-prettier disables ESLint rules that conflict with Prettier.

eslint-plugin-prettier is an ESLint rule that formats code using Prettier

```
npm install prettier --save-dev
npm install eslint-config-prettier eslint-plugin-prettier --save-dev
```

ESLINT rules

    {
    "extends": ["react-app","plugin:prettier/recommended"],
    "rules": {
    "prettier/prettier": [
        "error",
        {
            "endOfLine": "auto"
        }
        ]
    }
    }

Enable Prettier under 'format' in Preferences > Settings as the default formatter.

Note : sometimes, you will suddenly get a error that 'react' is missing! If that happens...

    npm install

# Hire Me

I work as a full time freelance software developer and coding tutor. Hire me at [UpWork](https://www.upwork.com/fl/vijayasimhabr) or [Fiverr](https://www.fiverr.com/jay_codeguy).

# important note

This code is provided as is without any warranties. It's primarily meant for my own personal use, and to make it easy for me share code with my students. Feel free to use this code as it pleases you.

I can be reached through my website - [Jay's Developer Profile](https://jay-study-nildana.github.io/developerprofile)

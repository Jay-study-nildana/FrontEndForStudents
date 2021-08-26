# TypeScript related notes

The moment typescript is enabled to the project, there will be some errors reported.

# Ignore a specific line

Sometimes, you find a code that works fine but is unable to run because typescript wont let you. For such emergencies only, please use

// @ts-ignore

https://dev.to/evaldasburlingis/typescript-for-beginners-how-to-ignore-code-4han

# Issue 4

even more issues, this time with JSX.

Solution :

yarn add @types/react --dev

https://github.com/facebook/create-react-app/issues/10109

NOTE : SOMETIMES VISUAL STUDIO WILL KEEP TELLING YOU ABOUT THIS ERROR. DO 'DEVELOPER - RELOAD WINDOW' IN THE COMMAND PALETTE. WHAT A FISHING MESS.

# Issue 3

```
    import { BrowserRouter, Routes, Route } from 'react-router-dom';
    gives a typescript error
```

Solution :

npm i --save-dev @types/react-router-dom

# Issue 2

```
Could not find a declaration file for module 'react'. 'd:/crmar2021/bootstrapexpert/ReactJSForStudents/reactqanda/node_modules/react/index.js' implicitly has an 'any' type.
  If the 'react' package actually exposes this module, consider sending a pull request to amend 'https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react`
```

```
{
	"resource": "/D:/crmar2021/bootstrapexpert/ReactJSForStudents/reactqanda/src/index.tsx",
	"owner": "typescript",
	"code": "7016",
	"severity": 8,
	"message": "Could not find a declaration file for module 'react/jsx-runtime'. 'd:/crmar2021/bootstrapexpert/ReactJSForStudents/reactqanda/node_modules/react/jsx-runtime.js' implicitly has an 'any' type.\n  If the 'react' package actually exposes this module, consider sending a pull request to amend 'https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react`",
	"source": "ts",
	"startLineNumber": 8,
	"startColumn": 3,
	"endLineNumber": 10,
	"endColumn": 22
}
```

Solution :

npm install @types/react

# Issue 1

```
Parameter 'onPerfEntry' implicitly has an 'any' type.  TS7006

  > 1 | const reportWebVitals = onPerfEntry => {
      |                         ^
    2 |   if (onPerfEntry && onPerfEntry instanceof Function) {
    3 |     import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
    4 |       getCLS(onPerfEntry);
```

```
Expected 1 arguments, but got 0.  TS2554

    15 | // to log results (for example: reportWebVitals(console.log))
    16 | // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  > 17 | reportWebVitals();
       | ^
    18 |
```

Solution :

look at this

    (callback:any) => { }

https://stackoverflow.com/questions/47848778/parameter-implicitly-has-an-any-type

# Hire Me

I work as a full time freelance software developer and coding tutor. Hire me at [UpWork](https://www.upwork.com/fl/vijayasimhabr) or [Fiverr](https://www.fiverr.com/jay_codeguy).

# important note

This code is provided as is without any warranties. It's primarily meant for my own personal use, and to make it easy for me share code with my students. Feel free to use this code as it pleases you.

I can be reached through my website - [Jay's Developer Profile](https://jay-study-nildana.github.io/developerprofile)

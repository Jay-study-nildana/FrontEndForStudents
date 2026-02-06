# Jest + SuperTest Example Project

This project is a small, self-contained Express app that demonstrates how to write HTTP integration tests using Jest and SuperTest.

## How to run

EndPoints in this project. They all work, but the focus is on unit tests and integration tests. 

1. One about 'users'. 
1. Another about 'string operations'. 
1. Another about 'file upload'

```

npm install
npm run test (runs the entire test suite, all the tests)
npm test strUtils.test.js (only string operation related unit tests)
npm test users.test.js (only users endpoint related integration tests)
npm test stroperations.test.js (only string operations endpoint related integration tests)
npm test fileoperations.test.js (only file upload related integration tests)
npm test -- --coverage (open coverage folder to see the HTML output)

```

# gorest-api-tests-example

API tests for https://gorest.co.in/

This framework was developed with [NodeJS](https://nodejs.org/en/), [Jest](https://jestjs.io/), [AJV](https://ajv.js.org/) and [Axios](https://axios-http.com/).

## Working with project

[ESLint](https://eslint.org/) supports code quality and styling in the project. It helps identify errors in the early stage and maintain the code style. It is possible to run the linter with the following command:
```sh
  npm run lint
```
Additionally, the linter runs as a part of the pre-commit hook (configured using [Husky](https://typicode.github.io/husky/)).

## Quick Start
1. NodeJS is required for this project, you can find installation instructions [here](https://nodejs.org/en/). This project was developed using the NodeJS LTS Version (v20.12.2), so it is preferable to use this version.
2. Clone this repository:
 ```sh
  git clone https://github.com/mksmzpsv/gorest-api-tests-example.git
```
3. Go to the repository directory in the Terminal/Command line and run the following command to install dependencies:
```sh
  npm i
```

## Run Tests Locally
Before running tests, the `AUTH_TOKEN` environment variable should be provided.
You can obtain this `AUTH_TOKEN` using instruction on the Go REST [website](https://gorest.co.in/)
You can simply run tests locally by the following command:
```sh
  npm test
```
Also, you can configure API URL providing `BASE_URL` environment variable.

### Reports
After running with `npm test` reports will be generated in the `reports` directory:
-   `gorest-api-tests.xml`: JUnit report.
-   `gorest-api-tests-report.html`: HTML report.

module.exports = {
  testEnvironment: 'node',
  reporters: [
    'default',
    ['jest-junit',
      {
        suiteName: 'gorest-api-tests',
        outputDirectory: './reports',
        outputName: 'gorest-api-tests.xml',
        uniqueOutputName: 'false',
        classNameTemplate: '{filename}',
        titleTemplate: '{title}',
        suiteNameTemplate: '{filepath}',
      }],
    ['jest-html-reporters', {
      publicPath: './reports',
      filename: 'gorest-api-tests-report.html',
      pageTitle: 'API tests example for Go REST (https://gorest.co.in/)',
      openReport: false,
    }],
  ],
  verbose: true,
};

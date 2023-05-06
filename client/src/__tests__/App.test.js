/*
 So Jest was an absolute pain to setup - we were missing several configs & dependencies,
 which made it not as simple to install and run as the internet was making me believe.
 First, there is a significant difference between installing Jest and getting it to run on
 the server side/for regular functions vs getting it to work with the front end, but only because
 we're creating an app from scratch and not using Create React App. Apparently if you use that
 cheat code, which makes a bunch of React boilerplate code for you and installs all the latest
 dependencies, you don't need to have all these import statements below - you don't even need
 describe blocks, you can just say " test('test test') ", you don't need a __tests__ folder;
 almost everything is already at your fingertips, but we made this from scratch and we have
 to do it the hard way. To hopefully save you some headache in the future,
 here are the steps I took:

 Blank slate project, these are the dependencies you need to install (we were missing a couple):

     jest <-- Just Jest :)
     jest-environment-jsdom <--Uses node and Javascript to simulate a browser API
     @testing-library/jest-dom  <-- This library is for seeing if nodes are/are not on the dom
     @testing-library/react  <-- This library can track conditional renders, user interactions
     babel-jest <-- out of the box will use babel to translate most files but not jsx (needs config)

 Need to configure a babel.config.js

   By installing babel-jest, this will allow Jest to use all the presets that babel uses.
   Normally our babel.config looks like this:

module.exports = {
  presets: [
        ['@babel/preset-env'] <-- This just lets you use the latest JS without worrying about
                                  translation issues when everything gets bundled.
};

What we needed to add was:

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      { targets: { node: 'current' } }, <--describes the environment you'll use for your
                                          project. For Testing purposes since we're using
                                          Jest, and Jest uses the current node environment,
                                          you need to tell babel to also target this.
    ],
    ['@babel/preset-react'], <--has plugins to translate and transform jsx files
  ],
};

Next, we need to configure Jest. You can either do this in its own config file or within
the pacakge.json. We did it in our package.json and here is everything it ended up needing:

  "jest": {
    "verbose": true, <--Indicates whether each individual test should be reported during the run.
                        Prints all errors at the bottom after test file has been executed.
    "collectCoverage": true, <--This is all you need to see code coverage. When you run npm test,
                                it will display a chart that shows which files exist, as well as
                                the % of statements, funcs, lines that have been covered.
    "rootDir": "./", <--Usually this will default to whatever root your jest config file is in
                        and it will use that directory to scan for tests. However by putting
                        Jest config within package.json we have to specify that we want it to
                        look for tests in our project's root directory. This will now search for
                        tests in the FEC directory as a whole.
    "testEnvironment": "jsdom", <--specify which environment will simulate your tests
    "setupFilesAfterEnv": [
      "<rootDir>/client/src/__tests__/App.test.js" <--paths to modules that will set up the testing
                                                      framework (after the jsdom environment setup)
                                                      that will run before the actual test files. It
                                                      will make things like "expect" available
    ],
    "transform": {
      "^.+\\.(js|jsx)$": "babel-jest" <--despite configuring babel, you also need to configure jest
                                         to handle jsx files. This has to do with importing jsx obj
                                         in your test files on the front end and not for bundling
                                         files for export like babel does.
    }
  },
*/

import React from 'react';
// The React Testing library has a variety of element-related tester functions
// that jest doesn't have out of the box. Some super useful ones look like:
// render, screen, and fireEvent
import { render, screen } from '@testing-library/react';
// jest also has some dom manipulation but it appears to be more specific to
// DOM node presence and not necessarily any user interactions. This library has functions
// like "toBeInDocument()", "toBeEmpty()", and "toBeVisible()"
import '@testing-library/jest-dom';
// Within the __tests__ folder, we can create 4 test files (one for each widget).
// (Also after we start making actual tests, we can ignore this App.test.js file or comment it out)
// In your test file, import all the files related to your widget. You can keep every test
// related to your widget including all its components and subcomponents in the same testing
// file. You can then use describe blocks to separate out subcomponents and test only one block
// at a time using describe.only(). When you make a pull request, include your test files.

// Here are some examples
import App from '../App';

// Example Jest Test:
// Helpful article for writing Jests: https://www.valentinog.com/blog/jest/
describe('Pretend we imported the function from a file', () => {
  test('Should correctly multiply 2 and 3', () => {
    const multiply = (num1, num2) => (num1 * num2);
    expect(multiply(2, 3)).toBe(6);
  });
});

// Example RTL w/Jest DOM test
describe('App component', () => {
  test('App should be on the page', () => {
    render(<App />); // render and screen are from RTL
    const appElement = screen.getByTestId('app'); // notice how there is a testid in App.jsx
    expect(appElement).toBeInTheDocument(); // getByTestId and toBeInTheDocument are from jsdom
  });
  test('App should render "Hello world"', () => {
    render(<App />); // Every test you'll need to start over with rendering (as an aside,
    // don't rely on scope or closures for your variables. Rename them as you go down test chains)
    const appElement2 = screen.getByTestId('app');
    expect(appElement2).toHaveTextContent('Hello world!');
  });
});

// /** @type {import('jest').Config} */
const config = {
  verbose: true,
  collectCoverage: true,
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    "<rootDir>/client/src/__tests__/App.test.js",
    // "@testing-library/react/cleanup-after-each"
  ],
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest"
  },
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  },
};

module.exports = config;

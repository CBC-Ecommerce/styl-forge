// require path for join, require HTML plugin
const path = require('path');

module.exports = {
  // set mode for bundle
  mode: 'development',
  // define entry point
  entry: path.join(__dirname, '/client/src/index.html'),
  // define output location and file name
  output: {
    path: path.join(__dirname, '/client/dist'),
    filename: 'bundle.js',
  },
  // define rules for webpack to use with babel
  module: {
    rules: [
      {
        // transpile files that end in '.js'
        test: /\.?js$/,
        // exclude node_modules from transpile
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};

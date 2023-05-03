// require path for join, require HTML plugin
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // define entry point
  entry: path.join(__dirname, '/client/src/index.js'),
  // define output location
  output: path.join(__dirname, '/client/dist'),
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
          // transpile to browser recognizable versions of code
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
  // use the following plugins
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
    }),
  ],
};

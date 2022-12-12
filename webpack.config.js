const Dotenv = require('dotenv-webpack');

module.exports = {
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-react"],
        },
      },
      {
        test: /\.png/,
        type: "asset/resource",
      },
      { test: /\.css$/, use: 'css-loader' },
    ],
  },
  plugins: [
    new Dotenv()
  ]
};
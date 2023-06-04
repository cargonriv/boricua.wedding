const path = require("path");
const Dotenv = require("dotenv-webpack");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: "./public_html/js/script.js",
  target: "node",
  externals: [nodeExternals()],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public_html/dist"),
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  mode: "development",
  plugins: [new Dotenv()],
};

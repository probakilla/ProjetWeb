const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CleanWebPackPlugin = require("clean-webpack-plugin");

const outputDirectory = "dist";

module.exports = {
  entry: ["babel-polyfill", "./src/index.js"],
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: "bundle.js"
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  devServer: {
    port: 4444,
    open: true,
    proxy: {
      "/api": "https://collab-lab.herokuapp.com/"
    }
  },
  plugins: [
    new CleanWebPackPlugin([outputDirectory]),
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
      filename: "./index.html"
    }),
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, "./src/public", "connection.html"),
      filename: "connection.html"
    }),
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, 'src/public', 'register.html'),
      filename: "register.html"
    })
  ]
};

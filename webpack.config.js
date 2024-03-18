const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/domFunction.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
};

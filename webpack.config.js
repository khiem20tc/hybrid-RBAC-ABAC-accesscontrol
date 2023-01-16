// const path = require("path");
// const nodeExternals = require("webpack-node-externals");

// const dev = require("./webpack.development.config");
// const prod = require("./webpack.production.config");

// let config = {
//   externals: [nodeExternals()],
//   target: "node",
//   entry: {
//     app: ["./index.js"],
//   },
//   module: {
//     rules: [
//       {
//         test: /\.js?$/,
//         exclude: /node_modules/,
//         use: {
//           loader: "babel-loader",
//           // options: {
//           //   presets: ["@babel/preset-env"],
//           // },
//         },
//       },
//     ],
//   },
//   output: {
//     path: path.resolve(__dirname, "dist"),
//     filename: "app.bundle.js",
//   },
// };

// module.exports = (env, argv) => {
//   if (argv.mode === "development") {
//     config = { ...config, ...dev };
//   } else if (argv.mode === "production") {
//     config = { ...config, ...prod };
//   }
//   return config;
// };

const path = require("path");
const nodeExternals = require("webpack-node-externals");
// const webpack = require("webpack");
const dev = require("./webpack.development.config");
const prod = require("./webpack.production.config");
require("dotenv").config();

let config = {
  externals: [nodeExternals()],
  target: "node",
  entry: {
    app: ["./app/index.ts"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    modules: [path.resolve(__dirname, "node_modules")],
  },
  // output: {
  //   filename: "app.js",
  //   path: path.resolve(__dirname, "build"),
  // },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "app.bundle.js",
  },
};

module.exports = () => {
  console.log("Build for", process.env.NODE_ENV);
  if (process.env.NODE_ENV!=="production") {
    config = { ...config, ...dev };
  } else {
    config = { ...config, ...prod };
  }
  return config;
};
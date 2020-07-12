const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = () => {
  return {
    entry: "./src/client/Index.js",
    output: {
      path: path.resolve(__dirname, "public"),
      publicPath: "/",
      filename: "bundle.js",
    },
    devServer: {
      contentBase: "./",
      publicPath: "/dist/",
      historyApiFallback: true,
      hot: true,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx", ".json", ".wasm", ".mjs", "*"],
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: "./src/index.html",
        filename: "./index.html",
      }),
    ],
  };
};

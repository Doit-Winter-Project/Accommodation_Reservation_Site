const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"), // 결과물 경로
    filename: "bundle.js", // 결과물 파일명
  },
  devServer: {
    port: 3000,
    hot: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: "/node_modules/",
        //resolve: { fullySpecified: false },
        //type: "javascript/auto",
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        // use: ['style-loader', 'css-loader'],
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(jpeg|jpg)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
        },
      },
    ],
  },
  externals: {
    react: "React",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new MiniCssExtractPlugin({ filename: "app.css" }),
  ],
};

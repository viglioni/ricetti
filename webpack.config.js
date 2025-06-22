const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const fs = require("fs")
const path = require("path")

const htmlFiles = fs.readdirSync(__dirname).filter(file => file.endsWith(".html"))
const htmlPlugins = htmlFiles.map(
  htmlFile =>
    new HtmlWebpackPlugin({
      template: htmlFile,
      filename: htmlFile,
      chunks: ["main"],
    }),
)
const copyPlugin = new CopyWebpackPlugin({
  patterns: [{ from: "static", to: "static" }],
})

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production"

  return {
    entry: "./src/index.ts",
    mode: isProduction ? "production" : "development",
    devtool: isProduction ? "source-map" : "eval-source-map",
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: [["env", { modules: false }]],
              },
            },
            "ts-loader",
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.s[ac]ss$/i,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    output: {
      filename: isProduction ? "[name].[contenthash].js" : "bundle.js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
    },
    devServer: {
      static: {
        directory: path.join(__dirname, "dist"),
      },
      compress: true,
      port: 4544,
      hot: true,
    },
    plugins: [...htmlPlugins, copyPlugin],
    optimization: {
      minimize: isProduction,
    },
  }
}

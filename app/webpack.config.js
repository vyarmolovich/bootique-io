const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const autoprefixer = require("autoprefixer")({
  browsers: ["> 1%", "last 2 versions", "Firefox ESR"],
  remove: false
});

module.exports = function (options = {}) {
  // Settings
  // --env.NODE_ENV root --env.SOURCE_MAP source-map ...
  const NODE_ENV = options.NODE_ENV || "development"; // "production"
  const SOURCE_MAP = options.SOURCE_MAP || "eval-source-map"; // "source-map"

  console.log(`
Build started with following configuration:
===========================================
→ NODE_ENV: ${NODE_ENV}
→ SOURCE_MAP: ${SOURCE_MAP}
`);

  const publicPath = "/assets/";
  const limit = 1024;

  return {
    entry: {
      app: [
        path.resolve(__dirname, "scripts", "app.ts")
      ]
    },
    output: {
      path: path.resolve(__dirname, "..", "themes", "bootique-theme", "static", "assets"),
      filename: "[name].js?[hash]",
      publicPath
    },
    resolve: {
      extensions: [".ts", ".js"]
    },
    bail: false,
    devtool: SOURCE_MAP,
    module: {
      rules: [{
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: "ts-loader"
      }, {
        test: /\.s[ac]ss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [{
            loader: "css-loader"
          }, {
            loader: "postcss-loader",
            options: {
              plugins: function () {
                return [
                  autoprefixer
                ];
              }
            }
          }, {
            loader: "sass-loader"
          }]
        })
      }, {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [{
            loader: "css-loader"
          }, {
            loader: "postcss-loader",
            options: {
              plugins: function () {
                return [
                  autoprefixer
                ];
              }
            }
          }]
        })
      }, {
        test: /\.(png|jpg|gif)$/,
        loader: "url-loader",
        options: {
          limit,
          publicPath,
          name: "/images/[name].[ext]?[hash]"
        }
      }, {
        test: /\.svg$/,
        loader: "url-loader",
        options: {
          limit,
          mimetype: "image/svg+xml",
          publicPath,
          name: "fonts/[name].[ext]?[hash]"
        }
      }, {
        test: /\.woff$/,
        loader: "url-loader",
        options: {
          limit,
          mimetype: "application/font-woff",
          publicPath,
          name: "fonts/[name].[ext]?[hash]"
        }
      }, {
        test: /\.woff2$/,
        loader: "url-loader",
        options: {
          limit,
          mimetype: "application/font-woff2",
          publicPath,
          name: "fonts/[name].[ext]?[hash]"
        }
      }, {
        test: /\.[ot]tf$/,
        loader: "url-loader",
        options: {
          limit,
          mimetype: "application/octet-stream",
          publicPath,
          name: "fonts/[name].[ext]?[hash]"
        }
      }, {
        test: /\.eot$/,
        loader: "url-loader",
        options: {
          limit,
          mimetype: "application/vnd.ms-fontobject",
          publicPath,
          name: "fonts/[name].[ext]?[hash]"
        }
      }]
    },
    plugins: createListOfPlugins({NODE_ENV})
  }
};

function createListOfPlugins({NODE_ENV}) {
  return [
    new ExtractTextPlugin("app.css?[hash]"),
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify(NODE_ENV)
      }
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    new HtmlWebpackPlugin({
      filename: "../../layouts/partials/assets.html",
      template: "assets.ejs",
      inject: false
    })
  ];
}

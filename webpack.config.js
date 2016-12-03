var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');

module.exports = {
  context: __dirname,
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./public/javascripts/app-webpack.js",
  output: {
    path: __dirname + "/public/javascripts/",
    filename: "scripts.min.js"
  },
  module:{
    loaders: [
    // SASS one omitted
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query:
        {
          "presets": ["es2016"]
        },
      }
    ]
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
};

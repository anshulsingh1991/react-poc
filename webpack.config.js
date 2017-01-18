var webpack = require('webpack');

var config = {
  entry: './src/index.js',
  output: {
    path: './src/public/',
    filename: 'bundle.js'
  },
  devServer: {
     inline: true,
     port: 8080
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        exclude: /node_modules/,
        loader : 'babel'
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }
    ]
  }
};

module.exports = config;

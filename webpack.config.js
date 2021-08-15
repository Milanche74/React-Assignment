const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    hot: true,
  },
  entry: './src/index.js',
  output: {
    filename: 'main.[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  devtool: false,
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
    }),
    new HtmlWebpackPlugin({
      title: 'Collabras react learning project',
    }),
  ],
};

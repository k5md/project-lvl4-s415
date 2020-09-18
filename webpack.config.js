// @ts-check

const webpack = require('webpack');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = !isProduction;
console.log('env', process.env);

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: [
    `${__dirname}/src/index.js`,
  ],
  externals: {
    gon: 'gon',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    path: `${__dirname}/dist/public`,
    publicPath: '/assets/',
  },
  plugins: [
    // new MiniCssExtractPlugin(),
    new webpack.DefinePlugin({
      'process.env.ROLLBAR_ACCESS_TOKEN': JSON.stringify(process.env.ROLLBAR_ACCESS_TOKEN),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' },
        ],
      },
    ],
  },
  devtool: isDevelopment && 'source-map',
};

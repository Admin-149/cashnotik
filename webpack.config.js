const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/client/index.tsx',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',

  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },

  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
    ],
  },

  plugins: [new HtmlWebpackPlugin({ template: './src/client/index.html' })],

  devServer: {
    hot: true, // enable HMR on the server
    historyApiFallback: true,
    contentBase: path.join(__dirname, 'public'),
    publicPath: '/',
    compress: true,
    port: 9000,
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
};

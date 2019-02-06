const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: {
    main: path.resolve(__dirname, 'src/index.tsx')
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin()
  ],
  output: {
    filename: 'flow-viz.dev.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  }
};
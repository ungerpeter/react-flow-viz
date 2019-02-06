const path = require('path');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  entry: {
    main: path.resolve(__dirname, 'lib/FlowViz.tsx')
  },
  output: {
    filename: 'flow-viz.min.js',
    sourceMapFilename: 'flow-viz.min.js.map',
    library: 'ReactFlowViz',
    libraryTarget: 'umd'
  },
  plugins: [
    new CleanWebpackPlugin(['dist'])
  ],
  externals: {
    'react': {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
      root: 'React'
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom',
      root: 'ReactDOM'
    }
  }
});
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',
  optimization: { //For SplitChunksPlugin
    minimizer: [
      new TerserJSPlugin({}), //https://webpack.js.org/configuration/optimization/#optimizationminimize
      new OptimizeCSSAssetsPlugin({}), //https://webpack.js.org/plugins/mini-css-extract-plugin/#minimizing-for-production
    ],
    //Extracting all CSS in a single file, https://webpack.js.org/plugins/mini-css-extract-plugin/#extracting-all-css-in-a-single-file
    // splitChunks: {
    //   cacheGroups: {
    //     styles: {
    //       name: 'styles',
    //       test: /\.css$/,
    //       chunks: 'all',
    //       enforce: true
    //     }
    //   }
    // }
  },
});
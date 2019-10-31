const path = require('path')
const pkg = require('./package.json')
const camelcase = require('camelcase')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = (env, options) => {
  return {
    devtool: options.mode === 'production' ? false : 'inline-source-map',
    entry: { main: './src/index.js' },
    output: {
      path: path.join(__dirname),
      filename: pkg.name + '.js',
      library: camelcase(pkg.name),
      libraryTarget: 'umd'
    },
    module: {
      rules: [
        { test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' }
      ]
    },
    externals: {
      'lodash.memoize': {
        commonjs: 'lodash.memoize',
        commonjs2: 'lodash.memoize',
        amd: 'lodash.memoize',
        root: ['_', 'memoize']
      },
      'lodash.throttle': {
        commonjs: 'lodash.throttle',
        commonjs2: 'lodash.throttle',
        amd: 'lodash.throttle',
        root: ['_', 'throttle']
      }
    },
    optimization: {
      minimizer: [
        // we specify a custom UglifyJsPlugin here to get source maps in production
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          uglifyOptions: {
            compress: false,
            ecma: 6,
            mangle: true
          },
          sourceMap: true
        })
      ]
    }
  }
}

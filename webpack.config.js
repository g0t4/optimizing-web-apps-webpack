const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const StatsGraphPlugin = require('./StatsGraphPlugin');
const babelConfig = require('./configs/babel');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const codeGenConfig = require('./configs/codegen');
const ignoreCodeGenConfig = require('./configs/ignore-codegen');

module.exports = function (env) {

  const isDevelopment = env === 'development';
  console.log(`This is a ${isDevelopment ? "development" : "production"} build`);

  const baseConfig = {
    entry: './app/app.js',
    output: {
      path: path.resolve(__dirname, 'app/dist'),
      filename: 'app.bundle.js',
      publicPath: '/dist/',
    },
    plugins: [
      new CleanWebpackPlugin(['app/dist']),
      new webpack.DefinePlugin({
        ENV_IS_DEVELOPMENT: isDevelopment,
        ENV_IS: JSON.stringify(env),
      }),
      new StatsGraphPlugin()
    ]
  };

  if (isDevelopment) {

    const devServerConfig = {
      devServer: {
        contentBase: path.resolve(__dirname, 'app'),
        publicPath: '/dist/',
        watchContentBase: false,
        hotOnly: true,
        overlay: true,
      },
      plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
      ]
    };

    return merge(
      baseConfig,
      codeGenConfig,
      devServerConfig
    );
  } else {
    return merge(
      baseConfig,
      ignoreCodeGenConfig,
      babelConfig
    );
  }
};

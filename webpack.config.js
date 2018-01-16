const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const StatsGraphPlugin = require('./StatsGraphPlugin');
const babelLoader = require('./babelLoader');
const CleanWebpackPlugin = require('clean-webpack-plugin')


module.exports = function (env) {

  const isDevelopment = env === 'development';
  console.log(`This is a ${isDevelopment ? "development" : "production"} build`);

  const baseConfig = {
    entry: './app/app.js',
    devtool: 'source-map',
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
      new StatsGraphPlugin(),
    ]
  };

  if (isDevelopment) {
    return merge(baseConfig, babelLoader, {
      devServer: {
        contentBase: path.resolve(__dirname, 'app'),
        publicPath: '/dist/',
        watchContentBase: false,
        hotOnly: true,
        overlay: true,
      },
      plugins: [
        //new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
      ]
    });
  }
  else {
    return merge(
      baseConfig,
      babelLoader
    );
  }
};

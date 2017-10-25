const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const baseConfig = {
  entry: './app/app.js',
  output: {
    path: path.resolve(__dirname, 'app/dist'),
    filename: 'app.bundle.js',
    publicPath: '/dist/',
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'app'),
    publicPath: '/dist/',
    watchContentBase: false,
    hotOnly: true
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
  ]
};


module.exports = function (env) {

  const isDevelopment = env === 'development';
  console.log(`This is a ${isDevelopment ? "development" : "production"} build`);

  if (isDevelopment) {
    return merge(baseConfig, {
      plugins: [
        new webpack.HotModuleReplacementPlugin()
      ]
    });
    /*baseConfig.plugins.push(
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin()
    );*/
  }

  return baseConfig;
};

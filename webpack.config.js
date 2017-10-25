const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');


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
    devServer: {
      contentBase: path.resolve(__dirname, 'app'),
      publicPath: '/dist/',
      watchContentBase: false,
      hotOnly: true
    },
    plugins: [
      new webpack.DefinePlugin({
        ENV_IS_DEVELOPMENT: isDevelopment,
        ENV_IS: JSON.stringify(env),
      })
    ]
  };

  if (isDevelopment) {
    return merge(baseConfig, {
      plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
      ]
    });
  }

  return baseConfig;
};

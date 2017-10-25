const path = require('path');
const webpack = require('webpack');


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
  plugins: []
};


module.exports = function (env) {

  const isDevelopment = env === 'development';
  console.log(`This is a ${isDevelopment ? "development" : "production"} build`);

  if (isDevelopment) {
    baseConfig.plugins.push(
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin()
    );
  }

  return baseConfig;
};

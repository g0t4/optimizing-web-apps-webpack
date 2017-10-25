const path = require('path');
const webpack = require('webpack');

const isDevelopment = process.env.NODE_ENV === "development";
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
  ]
};

if (isDevelopment) {
  baseConfig.plugins.push(
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  );
}

module.exports = baseConfig;

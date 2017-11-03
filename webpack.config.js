const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const StatsGraphPlugin = require('./StatsGraphPlugin');

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
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {
                  debug: true,
                  modules: false,
                  targets: {
                    browsers: ['> 1%', 'not IE < 12']
                  }
                }]
              ]
            }
          }
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        ENV_IS_DEVELOPMENT: isDevelopment,
        ENV_IS: JSON.stringify(env),
      }),
      new StatsGraphPlugin(),
    ]
  };

  if (isDevelopment) {
    return merge(baseConfig, {
      devServer: {
        contentBase: path.resolve(__dirname, 'app'),
        publicPath: '/dist/',
        watchContentBase: false,
        hotOnly: true
      },
      plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
      ]
    });
  }

  return baseConfig;
};

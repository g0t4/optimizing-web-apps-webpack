const path = require('path');

module.exports = {

  module: {
    rules: [
      {
        test: /\.gen\.js$/,
        loader: 'codegen-loader'
      }
    ]
  },

  resolveLoader: {
    alias: {
      'codegen-loader': path.resolve(__dirname, '../codegen-loader.js')
    }
  }

};

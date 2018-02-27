module.exports = {

  module: {
    rules: [
      {
        test: /\.gen\.js$/,
        // don't run codegen, imports an empty module
        loader: 'null-loader'
      }
    ]
  },

};

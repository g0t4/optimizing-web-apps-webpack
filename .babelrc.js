module.exports = {
  presets: [
    ['@babel/preset-env', {
      debug: false,
      modules: false,
      targets: {
        browsers: ['> 1%']
      },
      useBuiltIns: 'usage'
    }]
  ]
};

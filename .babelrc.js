module.exports = {
  presets: [
    ['@babel/preset-env', {
      debug: true,
      modules: false,
      targets: {
        browsers: ['> 1%']
      },
      useBuiltIns: 'usage'
    }]
  ]
};

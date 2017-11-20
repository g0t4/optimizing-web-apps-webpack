module.exports = {
  presets: [
    ['@babel/preset-env', {
      debug: true,
      modules: false,
      targets: {
        browsers: ['> 1%', 'not IE < 12']
      },
      useBuiltIns: 'entry'
    }]
  ]
};

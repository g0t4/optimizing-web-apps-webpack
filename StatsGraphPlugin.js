const fs = require('fs');
const {exec} = require('child_process');

class StatsGraphPlugin {

  constructor(options) {

    const defaultOptions = {
      // set verbose to true to always get output about webpack-stats-graph
      verbose: false,
    };

    this.options = options || defaultOptions;

  }

  // todo when the new hook syntax arrives (TBD) this plugin will need migrated
  apply(compiler) {
    compiler.plugin('done', stats => {
      writeStatsJson(stats, compiler);
      runWebpackStatsGraph(this.options);
    });
  }

}

function writeStatsJson(stats, compiler) {
  const toJson = stats.toJson(compiler.options.output);
  const statsJson = JSON.stringify(toJson, null, 2);
  fs.writeFileSync('stats.json', statsJson);
}

function runWebpackStatsGraph(options) {
  // this plugin expects to find webpack-stats-graph command globally:
  // npm install -g webpack-stats-graph
  exec('webpack-stats-graph', (error, stdout, stderr) => {

    const messagePrefix = '[StatsGraphPlugin]: webpack-stats-graph';

    if (error)
      console.error(`${messagePrefix} failed:\n${error}`);

    if (error || (stdout && options.verbose))
      console.log(`${messagePrefix} stdout:\n${stdout}`);

    if (stderr)
      console.log(`${messagePrefix} stderr:\n${stderr}`);

  });
}

module.exports = StatsGraphPlugin;

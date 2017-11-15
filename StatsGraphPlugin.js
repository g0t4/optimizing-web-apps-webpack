const fs = require('fs');
const {exec} = require('child_process');

const messagePrefix = '[StatsGraphPlugin]';

class StatsGraphPlugin {

  constructor(options) {

    const defaultOptions = {
      // set verbose to true to always get output about webpack-stats-graph
      verbose: false,
      // arguments to pass to webpack-stats-graph
      args: [
        '--show-size',
        '--show-sources',
        '--color-by-size',
      ]
    };

    this.options = options || defaultOptions;

  }

  // todo when the new hook syntax arrives (TBD) this plugin will need migrated
  apply(compiler) {
    compiler.plugin('done', stats => {
      this.writeStatsJson(stats, compiler);
      this.runWebpackStatsGraph();
    });
  }

  writeStatsJson(stats, compiler) {
    this.info(`writing stats.json`);
    const toJson = stats.toJson(compiler.options.output);
    const statsJson = JSON.stringify(toJson, null, 2);
    fs.writeFileSync('stats.json', statsJson);
  }

  runWebpackStatsGraph() {
    // this plugin expects to find webpack-stats-graph command globally:
    // npm install -g webpack-stats-graph
    this.info(`executing webpack-stats-graph`);

    const commandAndArgs = ['webpack-stats-graph'].concat(this.options.args).join(' ');
    exec(commandAndArgs, (error, stdout, stderr) => {

      if (error) {
        console.group(`${messagePrefix} webpack-stats-graph failed`);
        console.error(error);
      }
      else {
        console.group(`${messagePrefix} webpack-stats-graph done`);
      }

      if (error || (stdout && this.options.verbose)) {
        console.group('stdout:');
        console.log(stdout);
        console.groupEnd();
      }

      if (stderr) {
        console.group('stderr:');
        console.error(stderr);
        console.groupEnd();
      }

      console.groupEnd();

    });
  }

  info(message) {
    if (this.options.verbose)
      console.log(`${messagePrefix} ${message}`);
  }

}

module.exports = StatsGraphPlugin;

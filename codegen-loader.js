// note: see val-loader for a robust implementation of code gen

module.exports = async function (compileTimeModule) {

  const loaderContext = this;

  const codeGenerator = loadModule(compileTimeModule, loaderContext);
  const codeGeneration = codeGenerator();

  const generatedRuntimeModule = await codeGeneration;

  return generatedRuntimeModule.code;
};


// the following code is adapted from:
// https://github.com/webpack/webpack.js.org/issues/1268#issuecomment-313513988
const Module = require("module");

function loadModule(code, loaderContext) {
  const filename = loaderContext.resource;
  const module = new Module(filename, loaderContext);
  module.paths = Module._nodeModulePaths(loaderContext.context);
  module.filename = filename;
  module._compile(code, filename);
  return module.exports;
}

// alternative to loadModule (however exec is a deprecated loader API)
// this.exec(source, this.resource);
// where this = loaderApi






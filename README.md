
## Course Details

- [Initial code](https://github.com/g0t4/optimizing-web-apps-webpack/tree/webpack-javascript-start)
- [Final code](https://github.com/g0t4/optimizing-web-apps-webpack/tree/webpack-javascript-end)

**Tentative** webpack course series:
1. (publishing soon) Webpack: Transpiling and Bundling JavaScript
2. **(tentative)** *Webpack: Beyond JavaScript*
3. **(tentative)** *Webpack: Bundle Optimization*

**Tentative means not set in stone.**

- Course #1 uses webpack v3. Tentatively there will be a guide about upgrading from webpack v3 to v4 in Course #2.
- Course #2 and #3 will be created after webpack v4 RTM.
- Course #1 is bundling and transpiling JavaScript.
- Course #2 is bundling and transpiling/compiling everything else in a front end app: styles, layouts, images, webassembly, etc.
- Course #3 is then about optimizing the bundles!

## Errata / Updates

**Check here for notes about updates to webpack that are related to materials covered in the course series**

- webpack v4 ([based on latest alpha.5](https://github.com/webpack/webpack/releases/tag/v4.0.0-alpha.5))
    - **Nothing has fundamentally changed in webpack v4 that obviates what was covered in Course #1.**
    - CLI extracted to new `webpack-cli` package
        - Just **`npm install webpack-cli` instead of `npm install webpack`**
        - `webpack` package will only provide the API
        - See redirection in webpack package's [`bin\webpack.js`](https://github.com/webpack/webpack/blob/next/bin/webpack.js#L15)
    - [`entry` defaults to `./src`](https://github.com/webpack/webpack/blob/next/lib/WebpackOptionsDefaulter.js#L20)
    - [`output.path` defaults to absolute path to `./dist`](https://github.com/webpack/webpack/blob/next/lib/WebpackOptionsDefaulter.js#L117)
    - New, required `mode` config adds common optimization plugins
        - **This is simply a new configuration style!**
        - Matching `--mode` CLI argument
        - Intended to be `production` or `development` to optimize accordingly
        - Coarse `mode` maps to new, granular `optimization.*` settings. Most of these are flags to enable/disable a plugin.
            - See `mode` => `optimization.*` mapping in [`WebpackOptionsDefaulter.js`](https://github.com/webpack/webpack/blob/next/lib/WebpackOptionsDefaulter.js#L158-L200) (search for `mode`)
            - See `optimization.*` => plugins mapping in [`WebpackOptionsApply.js`](https://github.com/webpack/webpack/blob/next/lib/WebpackOptionsApply.js#L273-L310) (search for `optimization`)
        - **To use webpack v4 with Course #1 set `mode: "none"`** to disable this new configuration style.
            - All you're doing is turning off some webpack features, notably bundle optimization. Doing this is helpful to learn what is going on under the hood. You can incrementally add back optimizations and look at the bundle impact one at a time.
            - This is likely how I will teach going forward even with v4.
        - **Most of the optimization plugins won't be covered until Course #3 so this is largely irrelevant.** The following new flags relate to topics covered in Course #1 `if mode == 'development'`:
            - [`optimization.namedModules` adds NamedModulesPlugin](https://github.com/webpack/webpack/blob/next/lib/WebpackOptionsDefaulter.js#L185)
            - [`devtool` defaults to `eval`](https://github.com/webpack/webpack/blob/next/lib/WebpackOptionsDefaulter.js#L22)
            - [`output.pathinfo` defaults to `true`](https://github.com/webpack/webpack/blob/next/lib/WebpackOptionsDefaulter.js#L118)
        - This new `mode` compliments techniques shown in Course #1's `Dev Isn't Prod` module.


 
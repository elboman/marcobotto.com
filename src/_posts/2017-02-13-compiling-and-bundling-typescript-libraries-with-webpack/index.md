---
title: Compiling and bundling TypeScript libraries with Webpack
slug: compiling-and-bundling-typescript-libraries-with-webpack
date: 2017-02-13T00:00:00Z
published: true
---

Since I started working on [UI-Router React](https://github.com/ui-router/react) I've been enjoying writing TypeScript.
There are both [advantages and disadvantages](http://www.ics.uci.edu/~lopes/teaching/inf212W12/readings/rdl04meijer.pdf) working with a typed and compiled language, and yet [many differences](http://michalzalecki.com/typescript-vs-flow/) compared to a static type checker such as Flow.

At the end of the day I think it comes down to a very subjective opinion, and that's what really fascinates me about the web development industry: [background](https://news.ycombinator.com/item?id=8112099) [diversity](http://lea.verou.me/2012/05/how-i-got-into-web-development-the-long-version/).
I've met and talked with many people with whom I share the interest of the web and yet have followed such a different path to get there.

What convinced _me_ about TypeScript is the familiarity with C#, the great [tooling support](https://en.wikipedia.org/wiki/TypeScript#Development_tools) and that it looked like a good investment not being tightly coupled with a specific framework (as opposed to Flow which is pretty much only used in the React community).

## TypeScript libraries in JavaScript applications

I found that writing library and application code are two pretty different experiences. They serve different purposes and targets: Application code targets the users of the application, that (usually) do not interact with the underling code, whereas **Library code targets other developers** and as such, it needs to **strive for reusability** and a good developer experience.

This differences, apart from influencing our code style and architecture (which should/will be a separate topic in the future), have a direct impact on our tools. It's important to keep in mind a few practices when developing a library in TypeScript in order to provide the best support for other developers and to spare them unnecessary struggles.

At the end of the day, any code written for the front end (the browsers) **must be compatible with the status quo**, and that is (even in 2017) good old ES5/javascript.

TypeScript comes with the `tsc` (TS compiler) that takes care of that: it compiles your code to ES5 and creates the `*.d.ts` files that contain your type declarations, in order to preserve TypeScript support.

> **What about the users that do not rely on a module bundler (such as Webpack and Rollup)?**
>
> **When using a bundler, what about tree shaking?**

We can achieve compatibility for all these different setups with a small yet effective pipeline, and that's what we have been using with UI-Router.

## Webpack + tsc + npm script = ♥️

We are aiming at creating _three different outputs_:

1. The `tsc` compiled source + `*.d.ts` types declarations + source maps (very handy for debugging the TS source code). Module syntax will be CommonJS for supporting the majority of bundlers/tools.
2. Same as above, with ES6 module syntax, in order to enable the latest tools (Webpack 2/Rollup) to perform tree shaking for reducing bundle sizes.
3. A `UMD` bundle, compiled to standard ES5, that works in browsers and expose a global variable

Normally we wouldn't need to provide both the UMD _and_ the compiled source, since UMD _by definition_ should be universal. The problem comes with the fact that **type declarations files aren't valid JavaScript files** (hence the `.ts` extension) and that causes problems in the bundle when used in browsers and non TS environments.

This way we can retain full support for TS applications as well as common module bundlers, while falling back to the UMD when needed.

We achieve all the above with a combination `tsc` for the first two solution and `webpack` for the third. We than wrap this into a npm script with the help of [`shx`](https://github.com/shelljs/shx).

## The result

Image a library folder structure such as this:

```bash
node_modules/
src/
package.json
README.md
tsconfig.json
yarn.lock
```

What we want to publish on `npm` is the three compiled sources we talked about, and a couple of other files:

```bash
_bundles/		// UMD bundles
lib/			// ES5(commonjs) + source + .d.ts
lib-esm/		// ES5(esmodule) + source + .d.ts
package.json
README.md
```

In order to exclude the rest of the files `npm` accepts a `.npmignore` that works the same as `.gitignore`.
If we don't provide this, `npm` will ignore the stuff inside `.gitignore`, and that's not something we want.

You can find the code in this [repository](https://github.com/elboman/typescript-lib-example) as it may be useful for following along the rest of the post.

## TypeScript configuration

TS simply requires a `tsconfig.json` file for [configuring the compiler options](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) and to indicate that the folder is a TS project.

There are many config options that may differ based on the library needs. The options we need to focus on are these:

```bash
"module": "commonjs",
"target": "es5",
"lib": [ "es2015", "dom" ],
"outDir": "lib",
...
"sourceMap": true,
"declaration": true,
```

#### `"module": "commonjs"`

We tell the compiler that by default we want our module declaration to be in `commonjs` syntax. This will compile every `import` and `export` into `require()` and `module.exports` declarations, the default syntax in a Node environment.

#### `"target": "es5"`

The target source will be in ES5 since, as we previously explained, we need to provide code that can be run without further compilation/transformation.

#### `"lib": [ "es2015", "dom" ]`

The `lib` is a special declaration file included by TS. It contains ambient declarations for common JS constructs that are present in runtimes and the DOM.

Based on the `target`, TS automatically includes typings for the dom and the ES5 syntax. That's why we need to specify ourselves we want typings for `es2015` and the `dom`.

This way we have all the `es6` typings while targeting `es5`.

#### `"outDir": "lib"`

The compiled source is going to be saved into the `lib` folder as previously mentioned.

#### `"sourceMap": true` & `"declaration": true`

We want both the source maps and the declaration files from our source code.

---

With this configuration if we run the `tsc` command the compiler will create the first of the three outputs we need.

We could create a second `tsconfig` file just for the second item, but since the configuration is almost identical, we are going to use the cli flags to override these options:

```bash
tsc -m es6 --outDir lib-esm
```

The compiler will use es6 modules instead of commonjs (`-m es6`) and place it in its own folder (`--outDir lib-esm`).

We can combine the two commands by doing `tsc && tsc -m es6 --outDir lib-esm`.

## Webpack configuration

The last piece of the puzzle is Webpack, that will do the bundling for us. Since _webpack doesn't understand TypeScript_ we need to use a loader, just like we would use the `babel-loader` to instruct Webpack to compile the source via Babel.

There are a couple of TS loaders and we eventually settled on `awesome-typescript-loader` for a couple of reasons: it's faster, by forking the type-checking and the emitter into separate processes, and has a great integration with Babel, in case you need to further compile your code with some handy Babel plugin (which we will not discuss in this post).

Webpack configuration files are different from project to project since it's such a powerful tool and developers use it to do all sort of things. But for a (simple) library, all we need to do is to bundle the ES5 output code (the same from `tsconfig` above) into two single files (one is the minified version).

The Webpack and the loader will also create source maps of our files that will contain the original TS code, which is extremely handy for debugging.

I assume you are already familiar with Webpack or at least you have tried it before. If you have any doubt you can take a look at the shiny new website for version 2, that explain in depth the [concepts](https://webpack.js.org/concepts/) behind the tool as well as [examples](https://webpack.js.org/guides/) and [documentation](https://webpack.js.org/configuration/).

A basic configuration would be something like this:

```js
{
  entry: {
    'my-lib': './src/index.ts',
    'my-lib.min': './src/index.ts'
  },
  output: {
    path: path.resolve(__dirname, '_bundles'),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'MyLib',
    umdNamedDefine: true
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      sourceMap: true,
      include: /\.min\.js$/,
    })
  ],
  module: {
    loaders: [{
      test: /\.tsx?$/,
      loader: 'awesome-typescript-loader',
      exclude: /node_modules/,
      query: {
        declaration: false,
      }
    }]
  }
}
```

It's a standard Webpack configuration, but there are a couple of things to keep in mind:

#### `output`

We tell Webpack we are bundling a library by setting the `library` attribute. The value is the name of the library. `libraryTarget` and `umdNamedDefine` tell Webpack to create a UMD module and to name it with the name of the lib we just set.

#### `extensions`

Webpack usually looks for `.js` as modules, so we need to tell it to to also look for `.ts` and `.tsx` files (in case you are using React+JSX).

#### `module`

Finally we use the `awesome-typescript-loader` to parse the source. It's important here to use the `query` param for customizing `atl` and turn off the type declaration output. The loader will use the `tsconfig.json` file to instruct the compiler, but everything we define here will override the config file.

> Tip: the RegEx `/\.tsx?$/` matches both `.ts` and `.tsx` files, so I forget about it if I later decide to use React and JSX syntax

#### `devtool` & `plugins`

The `source-map` produces a [production ready source map](https://webpack.js.org/configuration/devtool/#devtool), with original code quality. The minified version will be created by the `UglifyJSPlugin` so we have to specify we want source map for that too since the plugin default value is `false`.

---

Once the config file is set up if we run `webpack` in the terminal it should create the `_bundles` folder with our 4 files inside:

```bash
my-lib.js
my-lib.js.map
my-lib.min.js
my-lib.min.js.map
```

## Wrapping everything up

Now that we have everything set up, we can create a couple of npm scripts to automate the process and clean up the folders each time we compile.

I like to use `shx` since it's cross platform so I don't have to worry about which OS I'm working on.

A `clean` script can take care of deleting the folders (if present) for a new build:

```bash
shx rm -rf _bundles lib lib-esm
```

A `build` script then takes care of putting everything together:

```bash
npm run clean && tsc && tsc -m es6 --outDir lib-esm && webpack
```

In order: it will delete any of the three folders if present and than build the three versions.

And that's basically it!

#### `.gitignore` & `.npmignore`

In order to deal with the repository and publishing to the npm registry, we must remember to add a couple of things inside the ignore files:

_`.gitignore`_:

```bash
node_modules
lib
lib-esm
_bundles
```

Everything that is a module or a build should not stay in the repository, since we can build it locally whenever we need.

_`.npmignore`_:

```bash
.*
**/tsconfig.json
**/webpack.config.js
node_modules
src
```

The final user will use the compiled files (whichever version needed) so we can remove the entire source code, the dependencies, and TS/Webpack configuration.

These files will not create any problem, but it's nice to minimize the files number since every time someone uses the library it will be downloaded, and that would just be a waste of bandwidth and storage.

## Conclusions

I'm sure there are many other setups that works just as well, but we landed on this as it works for us and it's easily configurable for more complex needs.

The ideal would be to just have two outputs: `commonjs` and `es` modules. The UMD file would serve our needs as `commonjs` if only there currently isn't a way to create typing definition in a single bundled file (that mirrors the bundled UMD module).

Also since TypeScript 1.8 the compiler has and option (`—outFile`) to emit a single bundled file after traversing the imports. I prefer to use Webpack because it gives me more control on the code transformation pipeline (and simply because I'm used to Webpack).

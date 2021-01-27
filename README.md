# CSS Terser - a Gulp plugin for tersing/minifying css selectors' names, written in Typescript.

# This project is based on [gulp-selectors](https://github.com/cazzer/gulp-selectors/)

I am no longer maintaining this repository and would be happy to transfer it to someone who still actively uses it. Respond to the [maintainer issue](https://github.com/cazzer/gulp-selectors/issues/26) if you are interested in taking ownership. In case you are interested, I use [css-modules](https://github.com/css-modules/css-modules) now instead.

# gulp-selectors

[![Build Status][travis-image]][travis-url] [![Code Climate][cc-image]][cc-url] [![Test Coverage][coverage-image]][coverage-url] [![NPM Version][npm-image]][npm-url]

> Minify those pesky selector names down to nothing with this fancy gulp plugin. Minified selectors will be applied consistently across all files piped into it.

| Input                                 | Output                       |
| ------------------------------------- | ---------------------------- |
| `.class-name { ... }`                 | `.a { ... }`                 |
| `.another-class { ... }`              | `.b { ... }`                 |
| `#an-id { ... }`                      | `#a { ... }`                 |
| `<div class="class-name"> ... </div>` | `<div class="a"> ... </div>` |

_You're like: `.some-super-descriptive-selector-name {...}`, and it's like: `.a {...}`_

## Usage

First and foremost:
`npm install gulp-selectors`

```js
var gulp = require("gulp");
var gs = require("gulp-selectors");

gulp
  .src(["src/**/*.css", "src/**/*.html"])
  .pipe(gs.run())
  .pipe(gulp.dest("dist"));
```

You can also pass some options into run:

`gs.run(processors, ignores)`

CSS and HTML files are processed well by default, just pass in your glob of files and all classes and IDs will be reduced to a minified form. Of course you can use it for some more specific functions if you like. See the included [sample gulpfile](https://github.com/calebthebrewer/gulp-selectors/blob/master/test/example/gulpfile.js) for a full example of how to effectively use gulp-selectors in your gulp workflow.

### Defaults

All arguments are optional. If omitted, processors will default to `css` and `html` and ignores
will be empty:

```js
gs.run(
  {
    css: ["css"],
    html: ["html"],
  },
  {}
);
```

### Advanced Usage

```js
var processors = {
        'css':  ['scss', 'css'],        // run the css processor on .scss and .css files
        'html': ['haml'],               // run the html processor on .haml files
        'js-strings':   ['js']          // run the js-strings plugin on js files
    },
    ignores = {
        classes: ['hidden', 'active']   // ignore these class selectors,
        ids: '*'                        // ignore all IDs
    };

gs.run(processors, ignores);
```

Two processors are built in for your convenience: `css` and `html` are stable but `js-strings` and `remove-unused` are beta and may be moved to their own repositories.

- css: matches .selectors and #selectors
- html: matches id="selector"s, class="selector"s, and for="selector"s
- js: matches exact strings by looping through the library, which is dangerous if you use common words as selectors
- remove-unused: should be run last, and only on stylesheets - it removes all declarations present in the library which haven't been used

If a processor is listed which isn't built in, gulp-selectors will attempt to `require` it.

## How gulp-selectors works

Calling `gs.run()` builds a library which persists for all processors used in the call. Processors are run on all associated files and all selectors, besides those that have been ignored, will be minified.

### Processors

```js
{
    'css': ['css', 'scss'],
    'html': ['html', 'tpl.js'],
    'js-strings': ['js', '!tpl.js'],
    'your-custom-processor': ['.ext']
}
```

`css` and `html` are built in. Additional processors referenced will be injected where needed so it is important to ensure all are installed. Processors are used like this:

```js
processor(file, classLibrary, idLibrary);
```

`File` is the string containing the file contents. Each of the two libraries exposes the following API:

- set(selectorName): returns a minified selector name
- has(selectorName): tests if the name exists
- get(selectorName, [dontCount]): ...

```js
libraries;
```

### Ignores

```js
{
    ids: ['content', 'target'],
    classes: ['hidden', 'active']
}
```

[travis-url]: https://travis-ci.org/calebthebrewer/gulp-selectors
[travis-image]: https://travis-ci.org/calebthebrewer/gulp-selectors.svg?branch=master
[cc-image]: https://codeclimate.com/github/calebthebrewer/gulp-selectors/badges/gpa.svg
[cc-url]: https://codeclimate.com/github/calebthebrewer/gulp-selectors
[coverage-image]: https://codeclimate.com/github/calebthebrewer/gulp-selectors/badges/coverage.svg
[coverage-url]: https://codeclimate.com/github/calebthebrewer/gulp-selectors
[npm-image]: https://badge.fury.io/js/gulp-selectors.svg
[npm-url]: http://badge.fury.io/js/gulp-selectors

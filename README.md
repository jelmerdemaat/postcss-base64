postcss-base64, a [PostCSS](https://github.com/postcss/postcss/) plugin, replaces values inside `url()` functions with their base64 encoded strings.

[GitHub](https://github.com/jelmerdemaat/postcss-base64) | [NPM](https://www.npmjs.com/package/postcss-base64) | [@jelmerdemaat](https://twitter.com/jelmerdemaat)

[![Build Status](https://travis-ci.org/jelmerdemaat/postcss-base64.svg?branch=master)](https://travis-ci.org/jelmerdemaat/postcss-base64)
[![bitHound Code](https://www.bithound.io/github/jelmerdemaat/postcss-base64/badges/code.svg)](https://www.bithound.io/github/jelmerdemaat/postcss-base64)
[![bitHound Dependencies](https://www.bithound.io/github/jelmerdemaat/postcss-base64/badges/dependencies.svg)](https://www.bithound.io/github/jelmerdemaat/postcss-base64/master/dependencies/npm)

## Use

Load this plugin as a PostCSS module and give _either or both_ of these options:

| Option | Lol whut? |
| ------ | --------- |
| extensions | An array of extensions of files that have to be encoded, including the leading dot. Example: `['.svg']` |
| pattern | A valid regex pattern to match against the string inside `url()` definitions to encode. Example: `/<svg.*<\/svg>/i` |

Only strings inside `url(...)` functions are replaced.

Partially replacing strings with the `pattern` option is possible.

### NodeJS

```js
var opts = {
    extensions: ['.png', '.svg'],
    pattern: /<svg.*<\/svg>/i
};

output = postcss().use(base64(opts)).process(src).css;
```

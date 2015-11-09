var fs = require('fs'),
    path = require('path'),
    postcss = require('postcss'),
    base64 = require('../');

var opts = {
    debug: false
};

var src = fs.readFileSync(path.join(__dirname, 'test.css'));

console.info('Input: \n', src.toString());

var output = postcss().use(base64(opts)).process(src).css;

console.info('Output: \n', output);

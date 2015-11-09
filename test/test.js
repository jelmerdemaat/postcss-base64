var fs = require('fs'),
    path = require('path'),
    postcss = require('postcss'),
    base64 = require('../');

var opts = {
    debug: true
};

var src = fs.readFileSync(path.join(__dirname, 'test.css')),
    dest = './out.css';

var output = postcss().use(base64()).process(src, { from: 'test.css', to: dest }).css;

console.info('Output: ', output);

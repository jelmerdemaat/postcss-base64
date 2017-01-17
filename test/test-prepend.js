var fs = require('fs'),
    path = require('path'),
    postcss = require('postcss'),
    test = require('ava'),
    base64 = require('../');

var opts = {
    extensions: ['.svg'],
    pattern: /<svg.*<\/svg>/i,
    prepend: 'data:image/svg+xml;base64,'
};

var src = fs.readFileSync(path.join(__dirname, 'prepend.css')),
    expectedFile = fs.readFileSync(path.join(__dirname, 'prepend-expected.css')).toString(),
    output = postcss().use(base64(opts)).process(src).css,
    outputFile = fs.writeFileSync(path.join(__dirname, 'prepend-output.css'), output),
    outputFileContents = fs.readFileSync(path.join(__dirname, 'prepend-output.css')).toString();

test('Output with `prepend` option is as expected', t => {
    t.is(expectedFile, outputFileContents, 'Expected code and output code are not the same.');
});

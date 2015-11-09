var postcss = require('postcss');

module.exports = postcss.plugin('postcss-base64', function (opts) {
    return function (css, result) {
        opts = opts || { debug: false };
        var output;

        css.replaceValues(/<svg.*<\/svg>/, { fast: '<svg' }, function (string) {
            output = 'data:image/svg+xml;base64,' + new Buffer(string).toString('base64');
            if(opts.debug) {
                console.info('In: ', string);
                console.info('Out: ', output);
            }
            return output;
        });
    };
});

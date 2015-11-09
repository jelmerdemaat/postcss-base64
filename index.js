var postcss = require('postcss');

module.exports = postcss.plugin('postcss-base64', function (opts) {
    return function (css, result) {
        opts = opts || {
            debug: false,
            pattern: '<svg.*<\/svg>'
        };

        var output, search;

        if(!opts.pattern) throw new Error('No search pattern given.');

        search = new RegExp(opts.pattern);

        css.replaceValues(search, function (string) {
            output = 'data:image/svg+xml;base64,' + new Buffer(string).toString('base64');
            if(opts.debug) {
                console.info('In: ', string);
                console.info('Out: ', output);
            }
            return output;
        });
    };
});

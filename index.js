var fs = require('fs'),
    postcss = require('postcss');

module.exports = postcss.plugin('postcss-base64', function (opts) {
    return function (css, result) {
        opts = opts || {
            debug: false,
            extensions: ['.png', '.svg']
        };

        console.info(opts);

        var exts, ext, search, file, image, output;

        if(opts.extensions) {
            exts = opts.extensions.join('|\\');
            search = new RegExp('url\((\'|\")?.*(\\' + exts + ')(\'|\")?(\))', 'i');

            console.info(exts, search);

            css.replaceValues(search, function (string) {
                file = string.replace(/(\'|\"|url\()/gi, '');
                ext = file.split('.')[1];

                if(ext === 'svg') ext = ext + '+xml';

                image = fs.readFileSync(file);

                console.info(file, image, ext);

                output = 'data:image/' + ext + ';base64,' + image.toString('base64');

                if(opts.debug) {
                    console.info('In: ', string);
                    console.info('Out: ', output);
                }

                return 'url(\'' + output + '\'';
            });
        }

        if(opts.pattern) {
            if(!opts.pattern instanceof RegExp) {
                throw new Error('Given search pattern is not a (valid) regular expression.');
            }

            search = opts.pattern;

            css.replaceValues(search, function (string) {
                output = 'data:image/svg+xml;base64,' + new Buffer(string).toString('base64');
                if(opts.debug) {
                    console.info('In: ', string);
                    console.info('Out: ', output);
                }
                return output;
            });
        }
    };
});
